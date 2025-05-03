function loadNotes() {
    fetch('/notes.json')
        .then((res) => res.json())
        .then(renderNotes)
        .catch(() => {});
}

function renderNotes(notes) {
    const list = document.getElementById('noteList');
    list.innerHTML = '';

    notes.forEach((note) => {
        const li = document.createElement('li');

        const link = document.createElement('a');
        link.href = '#';
        link.textContent = `${note.timestamp} > ${note.name}`;
        link.addEventListener('click', () => showDetail(note));

        const del = document.createElement('a');
        del.href = '#';
        del.textContent = ' DELETE';
        del.addEventListener('click', () => deleteNote(note.timestamp));

        li.appendChild(link);
        li.appendChild(del);
        list.appendChild(li);
    });
}

function showDetail(note) {
    document.getElementById(
        'detailTitle'
    ).textContent = `Detail of "${note.name}"`;

    const detail = document.getElementById('noteDetail');
    detail.innerHTML = `
      <li>date: <b>${note.timestamp}</b></li>
      <li>name: <b>${note.name}</b></li>
      <li>importance: <b>${note.importance}</b></li>
      <li>text: <b>${note.text}</b></li>
    `;
}

function deleteNote(timestamp) {
    fetch(`/delete?timestamp=${encodeURIComponent(timestamp)}`, {
        method: 'POST',
    }).then(() => {
        loadNotes();
        document.getElementById('detailTitle').textContent = '';
        document.getElementById('noteDetail').innerHTML = '';
    });
}

document.getElementById('createBtn').addEventListener('click', () => {
    const name = document.getElementById('noteName').value.trim();
    const importance = document.getElementById('importance').value;
    const text = document.getElementById('noteText').value.trim();

    if (!name || !text) {
        alert('Please fill all fields.');
        return;
    }

    const note = {
        timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
        name,
        importance,
        text,
    };

    fetch('/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note),
    }).then(() => {
        loadNotes();
        document.getElementById('noteName').value = '';
        document.getElementById('noteText').value = '';
    });
});

loadNotes();
