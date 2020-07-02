import React, { useState, useEffect } from "react";
import axios from "axios";

import { baseURL } from "./sources/wheater";

const App = () => {
  const [countriesList, setCountriesList] = useState([]);
  const [filter, setFilter] = useState("");
  const [wheater, setWheater] = useState("");

  const API_KEY = process.env.REACT_APP_WHEATER_API_KEY;

  useEffect(() => {
    axios
      .get(
        "https://restcountries.eu/rest/v2/all?fields=name;capital;population;languages;flag"
      )
      .then((response) => setCountriesList(response.data));
  }, []);

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  const filterList = (name) => {
    const list = countriesList.filter((country) => {
      if (country.name.toLowerCase().includes(name.toLowerCase())) {
        return country;
      }
      return null;
    });

    return list;
  };

  const renderList = (filteredList) => {
    if (filteredList.length > 10) {
      return <div>Too many matches, specify another filter</div>;
    } else if (filteredList.length === 1) {
      axios
        .get(
          `${baseURL}/current?access_key=${API_KEY}&query=${filteredList[0].capital}`
        )
        .then((response) => setWheater(response.data.current));
      return (
        <div>
          <h1>{filteredList[0].name}</h1>
          <div>Capital {filteredList[0].capital}</div>
          <div>population {filteredList[0].population}</div>
          <h3>languages</h3>
          <ul>
            {filteredList[0].languages.map((language) => (
              <li key={language.iso639_1}>{language.name}</li>
            ))}
          </ul>
          <img
            src={filteredList[0].flag}
            alt="flag"
            style={{ width: 200, height: "auto" }}
          />
          <h3>Weather in {filteredList[0].capital}</h3>
          <p>
            <span style={{ fontWeight: "bold" }}>temperature</span>{" "}
            {wheater.temperature} celsius
          </p>
          <img alt="icon" src={wheater.weather_icons} />
          <p>
            <span style={{ fontWeight: "bold" }}>wind</span>{" "}
            {wheater.wind_speed} mph direction {wheater.wind_dir}
          </p>
        </div>
      );
    }

    const handleClick = (name) => {
      setFilter(name);
    };

    return filteredList.map((country) => {
      return (
        <p key={country.name}>
          {country.name}
          <button onClick={() => handleClick(country.name)}>show</button>
        </p>
      );
    });
  };
  return (
    <div>
      <div>
        find countries <input value={filter} onChange={handleChange} />
      </div>
      {renderList(filterList(filter))}
    </div>
  );
};

export default App;
