document.addEventListener('DOMContentLoaded', function () {
    const data = [
        ['Black Panther', 66, 53],
        ['Captain America', 79, 137],
        ['Captain Marvel', 97, 26],
        ['Hulk', 80, 49],
        ['Iron Man', 88, 48],
        ['Spider-Man', 78, 16],
        ['Thanos', 99, 1000],
        ['Thor', 95, 1000],
        ['Yon-Rogg', 73, 52],
    ];

    const columns = ['Name', 'Strength', 'Age'];
    let sortOrder = { column: null, asc: true };

    function generateTable() {
        let table = '<table><thead><tr>';
        columns.forEach((col, index) => {
            table += `<th data-index="${index}">${col}</th>`;
        });
        table += '</tr></thead><tbody>';

        data.forEach((row) => {
            table += '<tr>';
            row.forEach((cell) => {
                table += `<td>${cell}</td>`;
            });
            table += '</tr>';
        });

        table += '</tbody></table>';
        document.getElementById('placeholder').innerHTML = table;
        addSortingEvents();
    }

    function addSortingEvents() {
        document.querySelectorAll('th').forEach((th) => {
            th.addEventListener('click', function () {
                const columnIndex = parseInt(this.getAttribute('data-index'));
                if (sortOrder.column === columnIndex) {
                    sortOrder.asc = !sortOrder.asc;
                } else {
                    sortOrder.column = columnIndex;
                    sortOrder.asc = true;
                }

                sortTable(columnIndex, sortOrder.asc);
                updateNotification(columnIndex);
            });
        });
    }

    function sortTable(index, ascending) {
        data.sort((a, b) => {
            if (typeof a[index] === 'string') {
                return ascending
                    ? a[index].localeCompare(b[index])
                    : b[index].localeCompare(a[index]);
            } else {
                return ascending ? a[index] - b[index] : b[index] - a[index];
            }
        });

        generateTable();
    }

    function updateNotification(columnIndex) {
        const orderText = sortOrder.asc ? 'ASC' : 'DESC';
        document.getElementById(
            'notification'
        ).textContent = `Sorting by ${columns[columnIndex]}, order: ${orderText}`;
    }

    generateTable();
});
