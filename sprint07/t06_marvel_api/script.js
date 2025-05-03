async function loadMarvelData() {
    const res = await fetch('/fetch-marvel-data');
    const data = await res.json();

    const output = document.getElementById('output');
    output.innerHTML = '';

    for (const character of data) {
        const div = document.createElement('div');
        div.className = 'character';

        const img = document.createElement('img');
        img.src = `${character.thumbnail.path}.${character.thumbnail.extension}`;
        img.alt = character.name;

        const name = document.createElement('h2');
        name.textContent = character.name;

        div.appendChild(img);
        div.appendChild(name);
        output.appendChild(div);
    }
}

loadMarvelData();
