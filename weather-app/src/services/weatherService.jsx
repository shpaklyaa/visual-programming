const API_KEY = '74b6e6cf68a1338e92a33ac150c55635';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export const getWeatherData = async (city) => {
    try {
        const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
            throw new Error('Не удалось получить данные о погоде');
        }
        const massiv = await response.json();
        console.error('Удалось получить данные');
        return massiv;
    } catch (error) {
        console.error('Ошибка при получении данных о погоде:', error);
        throw error;
    }
}; 