import "../App.css";
import React, { useState } from "react";

const WeatherApp: React.FC = () => {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const [tempData, setTempData] = useState(Number);
  const [cityName, setCityName] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [submited, setSubmited] = useState(false);
  const [feelsLike, setFeelsLike] = useState("");
  const [text, setText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=no`
    )
      .then((response) => response.json())
      .then((data) => {
        setTempData(data.current.temp_c);
        setWeatherIcon(data.current.condition.icon);
        setFeelsLike(data.current.feelslike_c);
        setText(data.current.condition.text);
        setSubmited(true);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="city"
          placeholder="City Name"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      {submited ? (
        <div className="temp-icon">
          <img src={`https:${weatherIcon}`} alt="Weather Icon" />
          <div className="temp-text">
            <p>{text}</p>
            <p>Current: {tempData} °C</p>
            <p>Feels Like: {feelsLike} °C</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default WeatherApp;
