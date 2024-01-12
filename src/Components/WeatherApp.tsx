import "../App.css";
import React, { useEffect, useState } from "react";

const WeatherApp: React.FC = () => {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const [tempData, setTempData] = useState(Number);
  const [cityName, setCityName] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [submited, setSubmited] = useState(false);
  const [feelsLike, setFeelsLike] = useState("");
  const [text, setText] = useState("");
  const [selectedCities, setSelectedCities] = useState<Array<string[]>>();

  const fetchCity = async () => {
    try {
      const response = await fetch(`city.json`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      let cityArray: Array<string[]> = [];
      data.cities.map((city: any) => {
        if (city.name.toLowerCase().startsWith(`${cityName.toLowerCase()}`)) {
          const cityCountry: Array<string> = [city.name, city.country];
          return cityArray.push(cityCountry);
        }
      });
      setSelectedCities(cityArray);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (cityName !== "") {
      fetchCity();
    }
  }, [cityName]);

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
    <div className="weather-app">
      <form onSubmit={handleSubmit}>
        <input
          list="cities"
          type="text"
          name="city"
          placeholder="City Name"
          value={cityName}
          onChange={handleChange}
        />
        <datalist id="cities">
          {cityName.length > 0
            ? selectedCities?.map((item) => {
                return (
                  <option value={item[0]}>
                    {item[0]}, {item[1]}
                  </option>
                );
              })
            : null}
        </datalist>
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
