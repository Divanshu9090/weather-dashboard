import React from "react";

const WeatherCard = ({ weatherData }) => {
  return (
    <div className="border rounded-xl p-4 m-auto mt-4 mb-0 w-4/5">
      <h2 className="text-xl font-bold">{weatherData.city}</h2>
      <p>Current Temperature: {weatherData.current.temperature} °C</p>
      <p>Condition: {weatherData.current.weather}</p>
      <img
        src={`http://openweathermap.org/img/wn/${weatherData.current.icon}.png`}
        alt="weather icon"
      />
      <p>Humidity: {weatherData.current.humidity}%</p>
      <p>Wind Speed: {weatherData.current.windSpeed} m/s</p>
      <h3 className="mt-4">5-Day Forecast</h3>
      <ul>
        {weatherData.forecast.map((item, index) => (
          <li key={index} className="flex justify-between">
            <span>{item.date}</span>
            <span>
              {item.temperature} °C - {item.weather}
            </span>
            <img
              src={`http://openweathermap.org/img/wn/${item.icon}.png`}
              alt="weather icon"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeatherCard;
