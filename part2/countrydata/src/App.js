import { useState, useEffect } from 'react';
import axios from 'axios';

const Filter = ({ newChar, handleFilter }) => {
  return (
    <div>
      find countries <input value={newChar} onChange={handleFilter} />
    </div>
  );
};

const Details = ({ name, capital, area, languages, flags }) => {
  const [main, setMain] = useState({});
  const [wind, setWind] = useState({});
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`
      )
      .then((response) => {
        setMain(response.data.main);
        setWind(response.data.wind);
        setWeather(response.data.weather[0]);
      });
  }, [capital]);

  return (
    <div>
      <h2>{name.common}</h2>
      capital {capital} <br />
      area {area}
      <h3>languages</h3>
      <ul>
        <LanguageList languages={languages} />
      </ul>
      <img
        style={{ width: '150px', height: '150px' }}
        src={flags.png}
        alt='country flag'
      />
      <h3>Weather in {name.common}</h3>
      <p>temperature {(main.temp - 273.15).toFixed(2)} Celcius</p>
      <img
        src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
        alt='Weather Icon'
      />
      <p>wind {wind.speed} m/s</p>
    </div>
  );
};

const CountryList = ({ name, handleClick, cca2 }) => {
  return (
    <div>
      {name.common}
      <button onClick={() => handleClick(cca2)}>show</button>
    </div>
  );
};

const LanguageList = ({ languages }) => {
  return Object.keys(languages).map((lng) => (
    <div key={lng}>{languages[lng]}</div>
  ));
};

const Display = ({ results, handleClick, countryDetails }) => {
  if (results.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (results.length === 1) {
    return <Details {...results[0]} />;
  } else if (countryDetails.length === 1) {
    return <Details {...countryDetails[0]} />;
  } else
    return results.map((country) => (
      <CountryList
        key={country.cca2}
        {...country}
        handleClick={handleClick}
        countryDetails={countryDetails}
      />
    ));
};

const App = () => {
  const [newChar, setNewChar] = useState('');
  const [countries, setCountries] = useState([]);
  const [countryDetails, setCountryDetails] = useState([]);

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
    setCountryDetails([]);
  };

  const handleClick = (cca2) => {
    let showCountry = results.filter((country) => country.cca2 === cca2);
    setCountryDetails(showCountry);
  };

  return (
    <div>
      <Filter newChar={newChar} handleFilter={handleFilter} />
      <Display
        results={results}
        countryDetails={countryDetails}
        handleClick={handleClick}
      />
    </div>
  );
};

export default App;
