async function loadData() {
    const allData = [];
    let PageUrl = 'https://catfact.ninja/breeds';

        while (PageUrl) {
            const response = await fetch(PageUrl);
            const data = await response.json();

            allData.push(...data.data);
            PageUrl = data.next_page_url;

            if (!PageUrl) {
                break;
            }
        }
        return allData;
}

module.exports.loadData = loadData;