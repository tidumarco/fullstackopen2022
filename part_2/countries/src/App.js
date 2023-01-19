import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Countries from "./components/Countries";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState("");
  const [filter, setFilter] = useState({ query: "", list: [] });
  const apiKey = process.env.REACT_APP_API_KEY;
  const city = filter.list.map((country) => country.capital);
  const cityString = city.toString();

  useEffect(() => {
    const loc = cityString;
    const eventHandler = (response) => {
      setCountries(response.data);
    };
    const weatherHandler = (response) => {
      const icon = response.data.weather.map((weather) => weather.icon);
      setWeather({
        descp: response.data.weather[0].description,
        city: response.data.name,
        temp: response.data.main.temp,
        icon: icon,
      });
    };
    const promise = axios.get("https://restcountries.com/v3.1/all");
    const promise2 = axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${apiKey}`
    );
    promise.then(eventHandler);
    promise2.then(weatherHandler);
  }, [apiKey, cityString]);

  const handleChange = async (e) => {
    const results = countries.filter((country) => {
      if (e.target.value === "") return countries;
      return country.name.common
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setFilter({ query: e.target.value, list: results });

    const loc = cityString;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${apiKey}`;
    const req = axios.get(url);
    const res = await req;
    const icon = res.data.weather.map((weather) => weather.icon);

    setWeather({
      descr: res.data.weather[0].description,
      city: res.data.name,
      temp: res.data.main.temp,
      icon: icon,
    });
  };

  let k = weather.temp;
  let C = k - 273.15;

  return (
    <div>
      <h2>Countries</h2>
      <h3>Search for a country:</h3>

      <Filter filter={filter} handleChange={handleChange} />

      <Countries filter={filter} countries={countries} />

      {filter.query === "" ? (
        ""
      ) : filter.list.length === 1 ? (
        <>
          <h1>Weather in {weather.city}</h1>
          <ul>
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt="loading..."
            />
            <li>{weather.descr}</li>
            <li>temperature {C.toFixed(2)} ° Celsius</li>
          </ul>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default App;
