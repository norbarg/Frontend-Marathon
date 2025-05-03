async function loadFiles() {
    const res = await fetch('/files');
    const files = await res.json();
    const fileList = document.getElementById('file-list');
    fileList.innerHTML = '';
    files.forEach((file) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = file;
        a.addEventListener('click', () => selectFile(file));
        li.appendChild(a);
        fileList.appendChild(li);
    });
}

async function selectFile(filename) {
    const res = await fetch(`/select-file?file=${filename}`);
    if (res.ok) {
        const data = await res.json();
        document.getElementById('current-file').style.display = 'block';
        document.getElementById('current-name').textContent = data.filename;
        document.getElementById('current-content').textContent = data.content;
    }
}

document.getElementById('create-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const filename = document.getElementById('filename').value;
    const content = document.getElementById('content').value;
    await fetch('/create-file', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename, content }),
    });
    document.getElementById('create-form').reset();
    loadFiles();
});

document.getElementById('delete-btn').addEventListener('click', async () => {
    const filename = document.getElementById('current-name').textContent;
    await fetch('/delete-file', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename }),
    });
    document.getElementById('current-file').style.display = 'none';
    loadFiles();
});

loadFiles();
