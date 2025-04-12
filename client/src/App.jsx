import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import axios from "axios";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(history);
  }, []);

  const fetchWeather = async (city) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/weather?city=${city}`
      );
      setWeatherData({ ...response.data, city });
      updateSearchHistory(city);
    } catch (error) {
      console.error("Error fetching weather data", error);
    }
  };

  const updateSearchHistory = (city) => {
    const updatedHistory = [...new Set([city, ...searchHistory])];
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`container min-h-screen min-w-screen flex-col justify-center text-center ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-3xl text-center pt-4">Real-Time Weather Dashboard</h1>
      <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 p-2 bg-gray-300 rounded"
      >
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <SearchBar onSearch={fetchWeather} />
      {weatherData && <WeatherCard weatherData={weatherData} />}
      <div className="mt-4">
        <h2 className="text-xl">Search History</h2>
        <ul>
          {searchHistory.map((city, index) => (
            <li key={index} className="p-1">
              {city}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
