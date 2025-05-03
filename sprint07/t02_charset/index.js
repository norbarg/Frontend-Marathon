const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        let filePath = '';
        if (req.url === '/' || req.url === '/index.html') {
            filePath = path.join(__dirname, 'index.html');
            res.writeHead(200, { 'Content-Type': 'text/html' });
        } else if (req.url === '/script.js') {
            filePath = path.join(__dirname, 'script.js');
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
        } else {
            res.writeHead(404);
            res.end('Not found');
            return;
        }

        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Server error');
            } else {
                res.end(content);
            }
        });
    } else if (req.method === 'POST' && req.url === '/convert') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            const { input, charsets } = JSON.parse(body);
            const result = { input };

            if (charsets.includes('utf-8')) {
                result['utf-8'] = input;
            }
            if (charsets.includes('iso-8859-1')) {
                result['iso-8859-1'] = input.replace('€', 'EUR');
            }
            if (charsets.includes('windows-1252')) {
                result['windows-1252'] = input.replace('€', '�');
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result));
        });
    } else {
        res.writeHead(404);
        res.end('Not found');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
