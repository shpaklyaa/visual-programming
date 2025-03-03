import fetch from 'node-fetch';
global.fetch = fetch;

async function loadData() {
    const allCats = [];
    let page = 1;
    let hasMoreData = true;

    while (hasMoreData) {
        const response = await fetch(`https://catfact.ninja/breeds?page=${page}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status}`);
        }
        const data = await response.json();
        allCats.push(...data.data);
        if (data.data.length === 0 || !data.next) {
            hasMoreData = false;
        }
        page++;
    }

    return allCats;
}

module.exports = { loadData };