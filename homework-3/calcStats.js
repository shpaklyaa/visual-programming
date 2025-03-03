function calcStats(catsInfo) {
    let stats = {};
    for(let cat of catsInfo) {
        if(stats[cat.country]) {
            stats[cat.country]++;
        } else {
            stats[cat.country] = 1;
        }
    }
    return stats;
}

module.exports = calcStats;