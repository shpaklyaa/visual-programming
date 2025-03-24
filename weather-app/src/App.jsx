import React, { useState } from 'react';
import CitySelector from './components/CitySelector';
import WeatherCard from './components/WeatherCard';
import { getWeatherData } from './services/weatherService';

const App = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    const handleCitySelected = async (city) => {
        try {
            const data = await getWeatherData(city);
            if (!data || !data.list || data.list.length === 0) {
                throw new Error('Данные о погоде недоступны');
            }
            setWeatherData(data);
            setError(null);
        } catch (error) {
            console.error('Ошибка получения данных о погоде:', error);
            setError('Не удалось получить данные о погоде. Проверьте название города.');
            setWeatherData(null);
        }
    };

    return (
        <div style={appStyle}>
            <h1>Приложение прогноза погоды</h1>
            <CitySelector onCitySelected={handleCitySelected} />
            {error && <p style={errorStyle}>{error}</p>}
            {weatherData && <WeatherCard weatherData={weatherData} />}
        </div>
    );
};

// Стили
const appStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
};

const errorStyle = {
    color: 'red',
    marginTop: '10px',
};

export default App;