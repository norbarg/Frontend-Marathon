let rawData = [];
let headers = [];

document.getElementById('uploadBtn').addEventListener('click', () => {
    const file = document.getElementById('fileInput').files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const text = e.target.result;
        parseCSV(text);
        buildFilters();
        renderTable();
    };
    reader.readAsText(file);
});

function parseCSV(text) {
    const lines = text
        .trim()
        .split('\n')
        .map((line) => line.split(','));
    headers = lines[0];
    rawData = lines.slice(1).map((row) => {
        const obj = {};
        headers.forEach((header, index) => {
            obj[header.trim()] = row[index]?.trim();
        });
        return obj;
    });
}

function buildFilters() {
    const filtersDiv = document.getElementById('filters');
    filtersDiv.innerHTML = '';

    headers.forEach((header) => {
        const select = document.createElement('select');
        select.id = `filter-${header}`;
        const option = document.createElement('option');
        option.value = '';
        option.textContent = `Filter by ${header}`;
        select.appendChild(option);

        const uniqueValues = [
            ...new Set(
                rawData.map((row) => row[header]).filter((v) => v !== '')
            ),
        ];
        uniqueValues.sort();
        uniqueValues.forEach((value) => {
            const opt = document.createElement('option');
            opt.value = value;
            opt.textContent = value;
            select.appendChild(opt);
        });

        select.addEventListener('change', renderTable);
        filtersDiv.appendChild(select);
    });
}

function renderTable() {
    const tableHead = document.getElementById('tableHead');
    const tableBody = document.getElementById('tableBody');
    tableHead.innerHTML = '';
    tableBody.innerHTML = '';

    const headerRow = document.createElement('tr');
    headers.forEach((header) => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    tableHead.appendChild(headerRow);

    let filteredData = [...rawData];
    headers.forEach((header) => {
        const selected = document.getElementById(`filter-${header}`).value;
        if (selected) {
            filteredData = filteredData.filter(
                (row) => row[header] === selected
            );
        }
    });

    filteredData.forEach((row) => {
        const tr = document.createElement('tr');
        headers.forEach((header) => {
            const td = document.createElement('td');
            td.textContent = row[header];
            tr.appendChild(td);
        });
        tableBody.appendChild(tr);
    });
}
