const calcStats = require('./calcStats');
const loadData = require('./loadData');

async function calcStatsFromAPI() {
    const catsInfo = await loadData();
    return calcStats(catsInfo);
}

module.exports = calcStatsFromAPI;