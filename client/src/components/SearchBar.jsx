import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");

  const fetchCities = async (query) => {
    if (query) {
      const response = await axios.get(
        `https://geodb.io/api/v1/geo/cities?limit=5&offset=0&namePrefix=${query}&sort=-population`
      );
      setSuggestions(response.data.data);
    } else {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    fetchCities(city);
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) {
      setError("Please enter a city");
      return;
    }
    setError(""); // Clear error if input is valid
    onSearch(city);
    setCity("");
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex justify-center mt-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border rounded p-2"
          placeholder="Enter city name"
        />
        <button
          type="submit"
          className="ml-2 bg-blue-500 text-white rounded p-2"
        >
          Search
        </button>
      </form>
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border rounded mt-1 w-full">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              onClick={() => {
                setCity(suggestion.name);
                setSuggestions([]);
              }}
              className="p-2 hover:bg-gray-200 cursor-pointer"
            >
              {suggestion.name}, {suggestion.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
