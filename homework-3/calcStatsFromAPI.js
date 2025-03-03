const { loadData } = require('./loadData');
const { calcStats } = require('./calcStats');

async function calcStatsFromAPI() {
    try {
        const catsInfo = await loadData();
        return calcStats(catsInfo);
    } catch (error) {
        console.error('Error fetching or processing data:', error);
        throw error;
    }
}

module.exports = { calcStatsFromAPI };