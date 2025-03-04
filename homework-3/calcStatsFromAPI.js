const loadData = require('./loadData.js')
const calcStats = require('./calcStats.js')

async function calcStatsFromAPI(){
    const breeds = await loadData.loadData();
    const stats = calcStats(breeds);
    return stats;
}

module.exports.calcStatsFromAPI = calcStatsFromAPI;