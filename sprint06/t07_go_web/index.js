const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const calculateNormalTime = require('./normal-router');
const calculateQuantumTime = require('./quantum-router');

const PORT = 3000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if (req.method === 'GET' && pathname === '/normal') {
        const time = calculateNormalTime();
        fs.readFile(
            path.join(__dirname, 'views', 'normal.ejs'),
            'utf-8',
            (err, data) => {
                if (err) {
                    res.writeHead(500);
                    return res.end('Error loading EJS file');
                }
                let rendered = data
                    .replace(/<%= years %>/g, time.years)
                    .replace(/<%= months %>/g, time.months)
                    .replace(/<%= days %>/g, time.days);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(rendered);
            }
        );
    } else if (req.method === 'GET' && pathname === '/quantum') {
        const time = calculateQuantumTime();
        fs.readFile(
            path.join(__dirname, 'views', 'quantum.ejs'),
            'utf-8',
            (err, data) => {
                if (err) {
                    res.writeHead(500);
                    return res.end('Error loading EJS file');
                }
                let rendered = data
                    .replace(/<%= years %>/g, time.years)
                    .replace(/<%= months %>/g, time.months)
                    .replace(/<%= days %>/g, time.days);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(rendered);
            }
        );
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <h1>Welcome to Time Portal</h1>
            <ul>
                <li><a href="/normal">Normal Time</a></li>
                <li><a href="/quantum">Quantum Time</a></li>
            </ul>
        `);
    }
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
