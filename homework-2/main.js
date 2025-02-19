// Подключаем модуль
const orderBy = require('./orderBy');

// Исходный массив объектов
const data = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 },
    { name: 'Alice', age: 22 },
    { name: 'Charlie', age: 35 }
];

// Ключи для сортировки
const keys = ['name', 'age'];

try {
    // Вызываем функцию orderBy
    const sortedData = orderBy(data, keys);

    console.log('Отсортированный массив:');
    console.log(sortedData);
} catch (error) {
    console.error('Ошибка:', error.message);
}