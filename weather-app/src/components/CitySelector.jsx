import React, { useState } from 'react';
import { getWeatherData } from '../services/weatherService';

const CitySelector = ({ onCitySelected }) => {
    const [city, setCity] = useState('');

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    const handleCitySubmit = async () => {
        try {
            const weatherData = await getWeatherData(city);
            onCitySelected(weatherData);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    return (
        <div>
            <input type="text" value={city} onChange={handleCityChange} />
            <button onClick={handleCitySubmit}>Get Weather</button>
        </div>
    );
};

export default CitySelector;