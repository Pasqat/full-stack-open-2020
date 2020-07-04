import React from "react";

const Filter = ({filterPhoneBook, text}) => {
  return (
    <div>
      filter show with: <input value={text} onChange={filterPhoneBook} />
    </div>
  );
};

export default Filter;
