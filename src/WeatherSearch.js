import React, { useState } from "react";

import axios from "axios";
export default function WeatherSearch() {
  let [city, setCity] = useState(" ");
  let [WeatherData, setWeatherData] = useState({});

  let [loaded, setLoaded] = useState(false);
  let form = (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Enter a city..."
        onChange={handleSearch}
      />
      <input type="submit" value="Search" />
    </form>
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
      <div>
        {form}
        <ul>
          <li>Temperature: {Math.round(WeatherData.temperature)}°C</li>
          <li>Description: {WeatherData.description}</li>
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
