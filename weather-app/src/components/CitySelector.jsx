import React, { useState } from 'react';
import "./CitySelector.css";

const CitySelector = ({ onCitySelected }) => {
    const [city, setCity] = useState('');

    // Обработчик изменения значения ввода
    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    // Обработчик отправки формы
    const handleCitySubmit = async () => {
        if (city.trim() === '') {
            alert('Пожалуйста, введите название города.');
            return;
        }

        try {
            onCitySelected(city);
        } catch (error) {
            console.error('Ошибка при выборе города:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={city}
                onChange={handleCityChange}
                placeholder="Введите название города"
                className="inputStyle"
            />
            <button onClick={handleCitySubmit} className="buttonStyle">
                Get Weather
            </button>
        </div>
    );
};

export default CitySelector;