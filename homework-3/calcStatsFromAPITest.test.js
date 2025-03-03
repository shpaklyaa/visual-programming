import fetch from 'node-fetch';
global.fetch = fetch;

const { calcStatsFromAPI } = require('./calcStatsFromAPI');

test('calcStatsFromAPI should call loadData once and return correct stats', async () => {
    // Mock данные для подмены функции loadData
    const mockData = [
        {
            breed: 'Turkish Van',
            country: 'developed in the United Kingdom (founding stock from Turkey)',
            origin: 'Natural',
            coat: 'Semi-long',
            pattern: 'Van'
        },
        {
            breed: 'York Chocolate',
            country: 'United States (New York)',
            origin: 'Natural',
            coat: 'Long',
            pattern: 'Solid'
        },
        {
            breed: 'Siberian',
            country: 'Russia',
            origin: 'Natural',
            coat: 'Long',
            pattern: 'Tabby'
        },
        {
            breed: 'Persian',
            country: 'Iran (formerly Persia)',
            origin: 'Natural',
            coat: 'Long',
            pattern: 'Solid'
        }
    ];

    // Создаем spy на функцию loadData
    const loadDataMock = jest.spyOn(loadData, 'loadData').mockResolvedValue(mockData);

    // Вызываем тестируемую функцию
    const result = await calcStatsFromAPI();

    // Проверяем, что loadData была вызвана один раз
    expect(loadDataMock).toHaveBeenCalledTimes(1);

    // Проверяем результат
    const expectedStats = {
        'developed in the United Kingdom (founding stock from Turkey)': 1,
        'United States (New York)': 1,
        'Russia': 1,
        'Iran (formerly Persia)': 1
    };

    expect(result).toEqual(expectedStats);

    // Восстанавливаем оригинальную функцию loadData
    loadDataMock.mockRestore();
});