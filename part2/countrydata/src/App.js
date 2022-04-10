import { useState, useEffect } from 'react';
import axios from 'axios';

const Filter = ({ newChar, handleFilter }) => {
  return (
    <div>
      find countries <input value={newChar} onChange={handleFilter} />
    </div>
  );
};

const Country = ({ name, capital, area, languages, flags }) => {
  return (
    <div>
      <h2>{name.common}</h2>
      capital {capital} <br />
      area {area}
      <h3>languages</h3>
      <ul>
        <LanguageList languages={languages} />
      </ul>
      {/* <div style={{ fontSize: '200px' }}> {flag} </div> */}
      <img
        style={{ width: '150px', height: '150px' }}
        src={flags.png}
        alt='country flag'
      />
    </div>
  );
};

const Show = ({ countries }) => {
  return (
    <div>
      {countries.map((country) => (
        <div key={country.population}>{country.name.common}</div>
      ))}
    </div>
  );
};

const LanguageList = ({ languages }) => {
  return Object.keys(languages).map((lng) => (
    <div key={lng}>{languages[lng]}</div>
  ));
};

const Display = ({ countries }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (countries.length === 1) {
    return countries.map((country) => (
      <Country key={country.population} {...country} />
    ));
  } else return <Show countries={countries} />;
};

const App = () => {
  const [newChar, setNewChar] = useState('');
  const [countries, setCountries] = useState([]);

  const results = countries.filter((country) =>
    country.name.common.toLowerCase().includes(newChar.toLowerCase())
  );

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilter = (event) => {
    setNewChar(event.target.value);
  };

  return (
    <div>
      <Filter newChar={newChar} handleFilter={handleFilter} />
      <Display countries={results} />
    </div>
  );
};

export default App;
