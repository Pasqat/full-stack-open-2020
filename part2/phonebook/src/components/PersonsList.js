import React from "react";

const PersonsList = ({ persons, filter }) => {
  return (
    <div>
      {persons.map((person) => {
        if (person.name.toLowerCase().includes(filter.toLowerCase())) {
          return (
            <p key={person.name}>
              {person.name} {person.number}
            </p>
          );
        }
        return null;
      })}
    </div>
  );
};

export default PersonsList;
