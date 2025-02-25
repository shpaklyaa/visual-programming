const orderBy = require('./orderBy');

const massive = [
    { name: 'I', age: 24 },
    { name: 'Mishka', age: 20 },
    { name: 'Monastir', age: 10 },
    { name: 'lublu', age: 80 },
    { name: 'spat', age: 57 },
    { name: 'est', age: 78 },
    { name: 'delat', age: 90 },
    { name: 'labi', age: 21 }
];

try {
    const sortedmassive = orderBy(massive, ['name', 'age']);

    console.log('Массив отсортирован:');
    console.log(sortedmassive);
} catch (error) {
    console.error('Ошибка:', error.message);
}