import React from 'react';

const WeatherCard = ({ weatherData }) => {
    // Извлекаем нужные данные из объекта weatherData
    //const { dt_txt, main, weather, wind } = weatherData;
    const dt_txt = weatherData.dt_txt;
    const main = weatherData.main;



    console.log(main);
    const temperature = main.temp; // Температура
    const description = weather[0].description; // Описание погоды
    const iconCode = weather[0].icon; // Код иконки погоды
    const humidity = main.humidity; // Влажность
    const windSpeed = wind.speed; // Скорость ветра

    // Формируем URL для иконки погоды
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    return (
        <div className="weather-card" style={cardStyle}>
            <h3>{new Date(dt_txt).toLocaleString()}</h3>
            <img src={iconUrl} alt={description} style={iconStyle} />
            <p><strong>Температура:</strong> {temperature}°C</p>
            <p><strong>Описание:</strong> {description}</p>
            <p><strong>Влажность:</strong> {humidity}%</p>
            <p><strong>Скорость ветра:</strong> {windSpeed} м/с</p>
        </div>
    );
};

// Стили для карточки
const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const iconStyle = {
    width: '64px',
    height: '64px',
};

export default WeatherCard;