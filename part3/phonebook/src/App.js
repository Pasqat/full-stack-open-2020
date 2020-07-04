import React, { useState, useEffect } from "react";
import { getAll, create, update, remove } from "./services/api";
import "./App.css";

import Filter from "./components/Filter";
import AddNewPerson from "./components/AddNewPerson";
import PersonsList from "./components/PersonsList";

const App = () => {
  const [persons, setPersons] = useState([
    // {
    //   id: 1,
    //   name: "Arto Hellas",
    //   number: "040-123456",
    // },
    // {
    //   id: 2,
    //   name: "Ada Lovelance",
    //   number: "39-44-52342342",
    // },
    // {
    //   id: 3,
    //   name: "Dan Abramov",
    //   number: "12-43-1234543",
    // },
    // {
    //   id: 4,
    //   name: "Mary Poppins",
    //   number: "39-32-987654",
    // },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const personExist = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    const personObject = {
      name: newName,
      number: newNumber,
    };

    if (personExist) {
      if (
        window.confirm(
          `${personExist.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        update(personExist.id, personObject)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.name !== personExist.name ? person : returnedPerson
              )
            );
            setNotification({
              error: false,
              message: `The old number of ${returnedPerson.name} successfully update`,
            });
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          })
          .catch((err) => {
            if (
              err.response.data.includes("Cannot read property 'ownerDocument'")
            ) {
              setNotification({
                error: true,
                message: `${personExist.name} already deleted from our server`,
              });
              setPersons(
                persons.filter((person) => person.id !== personExist.id)
              );
            } else {
              setNotification({
                error: true,
                message: err.response.data,
              });
            }

            setTimeout(() => {
              setNotification(null);
            }, 5000);
          });
      }

      setNewName("");
      setNewNumber("");
      return;
    }

    create(personObject)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        setNotification({
          error: false,
          message: `${returnedPerson.name} successfully added to phonebook`,
        });
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      })
      .catch((error) => {
        setNotification({
          error: true,
          message: error.response.data,
        });
        setTimeout(() => {
          setNotification(null);
        }, 5000);
        console.log("FE log", error, error.name, error.response.data);
      });
  };

  const removeButton = (id) => {
    remove(id);
    setPersons(persons.filter((person) => person.id !== id));
  };

  const handleChangeName = (e) => {
    const name = e.target.value;
    setNewName(name);
  };

  const handleChangeNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const filterPhoneBook = (e) => {
    setFilter(e.target.value);
  };

  const Notification = ({ message }) => {
    if (message === null) {
      return null;
    }

    return (
      <div className={message.error ? "error" : "success"}>
        {message.message}
      </div>
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification} />

      <Filter text={filter} filterPhoneBook={filterPhoneBook} />

      <h2>Add new</h2>

      <AddNewPerson
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
      />

      <h2>Numbers</h2>

      <PersonsList
        persons={persons}
        filter={filter}
        removeButton={removeButton}
      />
    </div>
  );
};

export default App;
