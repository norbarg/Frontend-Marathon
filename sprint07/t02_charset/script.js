const inputChange = document.getElementById('input-change');
const charsetSelect = document.getElementById('charset-select');
const changeBtn = document.getElementById('change-btn');
const clearBtn = document.getElementById('clear-btn');
const outputSection = document.getElementById('output-section');

changeBtn.addEventListener('click', async () => {
    const input = inputChange.value;
    const selectedCharsets = Array.from(charsetSelect.selectedOptions).map(
        (opt) => opt.value
    );

    if (!input || selectedCharsets.length === 0) {
        alert('Please enter text and select at least one charset!');
        return;
    }

    const response = await fetch('/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input, charsets: selectedCharsets }),
    });

    const data = await response.json();

    outputSection.style.display = 'block';
    outputSection.innerHTML = '';

    outputSection.innerHTML += `
        <div>
            <label>Input string:</label>
            <textarea readonly>${data.input || ''}</textarea>
        </div>
    `;

    if (selectedCharsets.includes('utf-8')) {
        outputSection.innerHTML += `
            <div>
                <label>UTF-8</label>
                <textarea readonly>${data['utf-8'] || ''}</textarea>
            </div>
        `;
    }
    if (selectedCharsets.includes('iso-8859-1')) {
        outputSection.innerHTML += `
            <div>
                <label>ISO-8859-1</label>
                <textarea readonly>${data['iso-8859-1'] || ''}</textarea>
            </div>
        `;
    }
    if (selectedCharsets.includes('windows-1252')) {
        outputSection.innerHTML += `
            <div>
                <label>Windows-1252</label>
                <textarea readonly>${data['windows-1252'] || ''}</textarea>
            </div>
        `;
    }
});

clearBtn.addEventListener('click', () => {
    inputChange.value = '';
    charsetSelect.selectedIndex = -1;
    outputSection.style.display = 'none';
    outputSection.innerHTML = '';
});
