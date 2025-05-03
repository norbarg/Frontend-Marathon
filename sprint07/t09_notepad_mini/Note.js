class Note {
    constructor(name, importance, text) {
        this.timestamp = new Date()
            .toISOString()
            .slice(0, 19)
            .replace('T', ' ');
        this.name = name;
        this.importance = importance;
        this.text = text;
    }
}

if (typeof module !== 'undefined') {
    module.exports = Note;
}
