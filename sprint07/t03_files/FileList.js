const fs = require('fs');
const path = require('path');

class FileList {
    constructor() {
        this.dir = path.join(__dirname, 'tmp');
        if (!fs.existsSync(this.dir)) {
            fs.mkdirSync(this.dir);
        }
    }

    getList() {
        return fs.readdirSync(this.dir);
    }

    hasFiles() {
        return this.getList().length > 0;
    }

    getHTMLList() {
        const files = this.getList();
        return (
            `<ul>` +
            files
                .map(
                    (file) =>
                        `<li><a href="/select-file?file=${file}">${file}</a></li>`
                )
                .join('') +
            `</ul>`
        );
    }
}

module.exports = FileList;
