import axios from "axios";
import { useEffect, useState } from "react";

const CountryData = ({ country }) => {
  const lang = Object.values(country.languages);
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        const info = response.data;
        setWeather({
          temp: (info.main.temp - 273.15).toFixed(2),
          image: `http://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`,
          wind: info.wind.speed,
        });
      });
  }, []);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <li>capital : {country.capital}</li>
      <li>area : {country.area}</li>
      <p>
        <b>languages :</b>
      </p>
      <ul>
        {lang.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <img width="200px" src={country.flags.svg} alt={country.name.common} />
      <h1>Weather in {country.capital}</h1>
      <p>temperature {weather.temp} Celcius</p>
      <img src={weather.image} alt="null" />
      <p>wind {weather.wind} m/s</p>
    </div>
  );
};

export default CountryData;
