// Проверка, является ли значение объектом (не массивом)
function isPlainObject(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

// Основная функция orderBy
function orderBy(array, keys) {
    // Проверяем, что первый аргумент является массивом
    if (!Array.isArray(array)) {
        throw new TypeError('Первый аргумент должен быть массивом');
    }

    // Проверяем, что второй аргумент является массивом строк
    if (!Array.isArray(keys) || !keys.every(key => typeof key === 'string')) {
        throw new TypeError('Второй аргумент должен быть массивом строк');
    }

    // Создаем копию массива, чтобы не изменять исходный
    const result = [...array];

    // Сортируем массив
    result.sort((a, b) => {
        // Проверяем, что каждый элемент является объектом
        if (!isPlainObject(a) || !isPlainObject(b)) {
            throw new TypeError('Каждый элемент массива должен быть объектом');
        }

        // Проходим по каждому ключу для сравнения
        for (const key of keys) {
            // Проверяем наличие свойства в обоих объектах
            if (!(key in a)) {
                throw new Error(`Отсутствует свойство "${key}" в первом объекте`);
            }
            if (!(key in b)) {
                throw new Error(`Отсутствует свойство "${key}" во втором объекте`);
            }

            // Сравниваем значения свойств
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
        }

        // Если все ключи равны, считаем объекты равными
        return 0;
    });

    return result;
}

// Экспортируем функцию
module.exports = orderBy;