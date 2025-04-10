document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const addBtn = document.getElementById('addBtn');
    const clearBtn = document.getElementById('clearBtn');
    const archive = document.getElementById('archive');

    function getTimestamp() {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = String(now.getFullYear()).slice(-2);
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `[${day}.${month}.${year}, ${hours}:${minutes}:${seconds}]`;
    }

    function loadNotes() {
        const notes = localStorage.getItem('notes');
        if (notes) {
            const notesArray = JSON.parse(notes);
            if (notesArray.length > 0) {
                const formattedNotes = notesArray
                    .map((note) => `--> ${note.text} ${note.timestamp}`)
                    .join('\n');
                archive.textContent = formattedNotes;
            } else {
                archive.textContent = '[empty]';
            }
        } else {
            archive.textContent = '[empty]';
        }
    }

    loadNotes();

    addBtn.addEventListener('click', () => {
        const text = textInput.value.trim();
        if (text === '') {
            alert("It's empty. Try to input something in 'text input'");
            return;
        }

        let notesArray = [];
        const existingNotes = localStorage.getItem('notes');
        if (existingNotes) {
            notesArray = JSON.parse(existingNotes);
        }

        const newNote = {
            text: text,
            timestamp: getTimestamp(),
        };
        notesArray.push(newNote);

        localStorage.setItem('notes', JSON.stringify(notesArray));
        loadNotes();
        textInput.value = '';
    });

    clearBtn.addEventListener('click', () => {
        const confirmed = confirm('Are you sure?');
        if (confirmed) {
            localStorage.removeItem('notes');
            archive.textContent = '[empty]';
        }
    });
});
