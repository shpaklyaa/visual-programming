async function loadData() {
    let url = 'https://catfact.ninja/breeds';
    let allData = [];
    while(url) {
        const response = await fetch(url);
        const data = await response.json();
        allData = allData.concat(data.data);
        url = data.next_page_url;
    }
    return allData;
}

module.exports = loadData;