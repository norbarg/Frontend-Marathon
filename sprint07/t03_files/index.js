const http = require('http');
const fs = require('fs');
const path = require('path');
const File = require('./File');
const FileList = require('./FileList');

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        if (req.url === '/' || req.url === '/index.html') {
            serveFile('index.html', 'text/html', res);
        } else if (req.url.startsWith('/select-file')) {
            const urlParams = new URLSearchParams(req.url.split('?')[1]);
            const filename = urlParams.get('file');

            if (filename) {
                const file = new File(filename);
                if (fs.existsSync(file.getPath())) {
                    const content = file.read();
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ filename, content }));
                } else {
                    res.writeHead(404);
                    res.end('File not found');
                }
            } else {
                res.writeHead(400);
                res.end('Bad Request');
            }
        } else if (req.url === '/files') {
            const fileList = new FileList();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(fileList.getList()));
        } else if (req.url.endsWith('.js')) {
            serveFile(req.url, 'application/javascript', res);
        } else {
            res.writeHead(404);
            res.end('Not found');
        }
    } else if (req.method === 'POST') {
        if (req.url === '/create-file') {
            let body = '';
            req.on('data', (chunk) => (body += chunk));
            req.on('end', () => {
                const { filename, content } = JSON.parse(body);
                const file = new File(filename);
                file.write(content);
                res.writeHead(200);
                res.end('File created/updated');
            });
        } else if (req.url === '/delete-file') {
            let body = '';
            req.on('data', (chunk) => (body += chunk));
            req.on('end', () => {
                const { filename } = JSON.parse(body);
                const file = new File(filename);
                file.delete();
                res.writeHead(200);
                res.end('File deleted');
            });
        } else {
            res.writeHead(404);
            res.end('Not found');
        }
    } else {
        res.writeHead(405);
        res.end('Method not allowed');
    }
});

function serveFile(urlPath, contentType, res) {
    const filePath = urlPath.replace('/', '');
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500);
            res.end('Server error');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
}

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
