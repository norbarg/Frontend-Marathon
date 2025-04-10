document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const addBtn = document.getElementById('addBtn');
    const clearBtn = document.getElementById('clearBtn');
    const archive = document.getElementById('archive');

    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        const expires = 'expires=' + date.toUTCString();
        document.cookie = name + '=' + value + ';' + expires + ';path=/';
    }

    function getCookie(name) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    }

    function loadNotes() {
        const notes = getCookie('notes');
        if (notes) {
            const notesArray = JSON.parse(notes);
            if (notesArray.length > 0) {
                const formattedNotes = notesArray
                    .map((note) => `--> ${note}`)
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
        const existingNotes = getCookie('notes');
        if (existingNotes) {
            notesArray = JSON.parse(existingNotes);
        }
        notesArray.push(text);
        setCookie('notes', JSON.stringify(notesArray), 30);
        loadNotes();
        textInput.value = '';
    });

    clearBtn.addEventListener('click', () => {
        const confirmed = confirm('Are you sure?');
        if (confirmed) {
            setCookie('notes', '', -1);
            archive.textContent = '[empty]';
        }
    });
});
