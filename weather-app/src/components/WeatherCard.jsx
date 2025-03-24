import React from 'react';
import "./WeatherCard.css";

const WeatherCard = ({ weatherData }) => {
    if (!weatherData || !weatherData.list || weatherData.list.length === 0) {
        return <div>Данные о погоде недоступны</div>;
    }

    // Формируем URL для иконки погоды
    const getIconUrl = (iconCode) => `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    return (
        <div className="weather-card" class="cardStyle">
            <h2>Прогноз погоды на все сутки</h2>
            <ul class="forecastListStyle">
                {weatherData.list.map((item, index) => (
                    <li key={index} class="forecastItemStyle">
                        <strong>{new Date(item.dt_txt).toLocaleString()}</strong>
                        <img
                            src={getIconUrl(item.weather[0].icon)}
                            alt={item.weather[0].description}
                            class="iconStyle"
                        />
                        <p>Температура: {item.main.temp}°C</p>
                        <p>Описание: {item.weather[0].description}</p>
                        <p>Влажность: {item.main.humidity}%</p>
                        <p>Скорость ветра: {item.wind.speed} м/с</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WeatherCard;