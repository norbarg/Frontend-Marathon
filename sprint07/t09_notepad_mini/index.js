const http = require('http');
const fs = require('fs');
const path = require('path');

const notesFile = path.join(__dirname, 'notes.json');

const PORT = 3000;

const server = http.createServer((req, res) => {
    console.log(`Request: ${req.method} ${req.url}`);

    if (req.method === 'GET') {
        let filePath = '.' + (req.url === '/' ? '/index.html' : req.url);
        const extname = path.extname(filePath);
        let contentType = 'text/html';

        switch (extname) {
            case '.js':
                contentType = 'text/javascript';
                break;
            case '.json':
                contentType = 'application/json';
                break;
        }

        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(404);
                res.end('404 Not Found');
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content);
            }
        });
    } else if (req.method === 'POST') {
        if (req.url === '/add') {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const note = JSON.parse(body);
                let notes = [];

                if (fs.existsSync(notesFile)) {
                    notes = JSON.parse(fs.readFileSync(notesFile));
                }
                notes.push(note);
                fs.writeFileSync(notesFile, JSON.stringify(notes, null, 2));
                res.writeHead(200);
                res.end('Note added');
            });
        } else if (req.url.startsWith('/delete')) {
            const url = new URL(req.url, `http://${req.headers.host}`);
            const timestamp = url.searchParams.get('timestamp');

            if (fs.existsSync(notesFile)) {
                let notes = JSON.parse(fs.readFileSync(notesFile));
                notes = notes.filter((note) => note.timestamp !== timestamp);
                fs.writeFileSync(notesFile, JSON.stringify(notes, null, 2));
            }
            res.writeHead(200);
            res.end('Note deleted');
        }
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
