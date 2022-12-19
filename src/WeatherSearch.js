import React, { useState } from "react";
import "./WeatherSearch.css";

import axios from "axios";
export default function WeatherSearch() {
  let [city, setCity] = useState(" ");
  let [WeatherData, setWeatherData] = useState({});

  let [loaded, setLoaded] = useState(false);
  let form = (
  <div>
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Enter a city..."
        onChange={handleSearch}
        className="input input-city form-control"
      />
      <input type="submit" value="Search"className="btn btn-primary btn-search"/>
    </form>
    <ul class="nav nav-pills mb-4">
    <li className="nav-item">
      <a className="nav-link" aria-current="page" href="/">Kharkiv</a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="/">Lviv</a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="/">Odesa</a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="/">Dnipro</a>
    </li>
  </ul>
  </div>
  );

  function handleSearch(event) {
    setCity(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "428a806b1ea72671015f9a8da5f82916";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(handleResponse);
  }

  function handleResponse(response) {
    setLoaded(true);
    setWeatherData({
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    });
  }

  if (loaded) {
    return (
      <div className="app-weather">
        {form}
        <ul>
          <li className="city">{city}</li>
          <li> <span className="temp">{Math.round(WeatherData.temperature)}</span>°C</li>
          <li> <span className="description">{WeatherData.description}</span></li>
          <li>Humidity: {WeatherData.humidity}%</li>
          <li>Wind: {WeatherData.wind} m/sec</li>
          <li>
            <img src={WeatherData.icon} alt="weather icon"></img>
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
