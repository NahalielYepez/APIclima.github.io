import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

const API_KEY = "2956c0a092af46d08fa23449233005";

const Card = ({
  city,
  temperature,
  windSpeed,
  humidity,
  precipitation,
  onRemove
}) => (
  <div className="card">
    <h3>{`${city}`}</h3>
    <p>Temperature: {temperature}°C</p>
    <p>Wind Speed: {windSpeed} km/h</p>
    <p>Humidity: {humidity}%</p>
    <p>Precipitation: {precipitation} mm</p>
    <button className="remove-button" onClick={onRemove}>
      Eliminar
    </button>
  </div>
);

const App = () => {
  const [cards, setCards] = useState([]);
  const [cityInput, setCityInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchData = async () => {
    try {
      const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityInput}`;
      const response = await axios.get(url);
      const {
        temp_c: temperature,
        wind_kph: windSpeed,
        humidity,
        precip_mm: precipitation
      } = response.data.current;
      const newCard = {
        city: cityInput,
        temperature,
        windSpeed,
        humidity,
        precipitation
      };
      setCards([...cards, newCard]);
      setCityInput("");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Ciudad no encontrada");
    }
  };

  const removeCard = (index) => {
    const updatedCards = [...cards];
    updatedCards.splice(index, 1);
    setCards(updatedCards);
  };

  return (
    <div className="app">
      <div className="input-container">
        <input
          type="text"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          placeholder="Nombre de la ciudad"
        />
        <button onClick={fetchData}>Consultar</button>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </div>
      <div className="card-container">
        {cards.map((data, index) => (
          <Card key={index} {...data} onRemove={() => removeCard(index)} />
        ))}
      </div>
    </div>
  );
};

export default App;
