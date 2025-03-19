import React, { useEffect, useState } from 'react';
import CitySelector from './components/CitySelector';
import WeatherCard from './components/WeatherCard';

const App = () => {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const intervalId = setInterval(() => {
            // Fetch and update weather data here
        }, 3 * 60 * 60 * 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleCitySelected = (data) => {
        setWeatherData(data);
    };

    return (
        <div>
            <CitySelector onCitySelected={handleCitySelected} />
            {weatherData && <WeatherCard weatherData={weatherData} />}
        </div>
    );
};

export default App;