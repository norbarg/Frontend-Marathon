class NotePad {
    constructor() {
        this.notes = [];
    }

    add(note) {
        this.notes.push(note);
    }

    delete(timestamp) {
        this.notes = this.notes.filter((note) => note.timestamp !== timestamp);
    }

    get(timestamp) {
        return this.notes.find((note) => note.timestamp === timestamp);
    }
}

if (typeof module !== 'undefined') {
    module.exports = NotePad;
}
