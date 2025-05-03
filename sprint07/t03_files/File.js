const fs = require('fs');
const path = require('path');

class File {
    constructor(name) {
        this.name = name;
        this.dir = path.join(__dirname, 'tmp');
        if (!fs.existsSync(this.dir)) {
            fs.mkdirSync(this.dir);
        }
    }

    getPath() {
        return path.join(this.dir, this.name);
    }

    write(content) {
        const filePath = this.getPath();
        fs.appendFileSync(filePath, content);
    }

    read() {
        const filePath = this.getPath();
        return fs.readFileSync(filePath, 'utf8');
    }

    delete() {
        const filePath = this.getPath();
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
}

module.exports = File;
