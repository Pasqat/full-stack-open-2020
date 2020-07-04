import React, { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./components/Filter";
import AddNewPerson from "./components/AddNewPerson";
import PersonsList from "./components/PersonsList";

const App = () => {
  const [persons, setPersons] = useState([
    // { name: "Arto Hellas", number: "040-123456" },
    // { name: "Ada Lovelace", number: "39-44-5323523" },
    // { name: "Dan Abramov", number: "12-43-234345" },
    // { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    console.log("rendered");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfulled");
      setPersons(response.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const personExist = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (personExist) {
      return alert(`${newName} is already added to phonebook`);
    }

    setPersons(persons.concat({ name: newName, number: newNumber }));
    setNewName("");
    setNewNumber("");
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

  return (
    <div>
      <h2>Phonebook</h2>

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

      <PersonsList persons={persons} filter={filter} />
    </div>
  );
};

export default App;
