const express = require("express");
const axios = require("axios");
const router = express.Router();

// GET /weather endpoint
router.get("/", async (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({ error: "City is required" });

  try {
    // Fetch current weather data
    const currentWeatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
    );
    const currentWeatherData = currentWeatherResponse.data;

    // Fetch 5-day forecast data
    const forecastResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
    );
    const forecastData = forecastResponse.data.list.map((item) => ({
      date: item.dt_txt,
      temperature: item.main.temp,
      weather: item.weather[0].description,
      icon: item.weather[0].icon,
    }));

    // Respond with current weather and forecast
    res.json({
      current: {
        temperature: currentWeatherData.main.temp,
        weather: currentWeatherData.weather[0].description,
        icon: currentWeatherData.weather[0].icon,
        humidity: currentWeatherData.main.humidity,
        windSpeed: currentWeatherData.wind.speed,
      },
      forecast: forecastData,
    });
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Error fetching weather data" });
  }
});

module.exports = router;