import React from "react";

const PersonsList = ({ persons, filter, removeButton }) => {
  return (
    <div>
      {persons.map((person) => {
        if (person.name.toLowerCase().includes(filter.toLowerCase())) {
          return (
            <p key={person.name}>
              {person.name} {person.number}
              <button onClick={() => removeButton(person.id)}>❌</button>
            </p>
          );
        }
        return null;
      })}
    </div>
  );
};

export default PersonsList;

