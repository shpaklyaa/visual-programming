function calcStats(catsInfo) {
    const stats = {};

    catsInfo.forEach(cat => {
        const country = cat.country || 'Unknown';
        stats[country] = (stats[country] || 0) + 1;
    });

    return stats;
}

module.exports = { calcStats };