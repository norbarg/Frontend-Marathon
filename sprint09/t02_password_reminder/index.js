const http = require('http');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const { sendPasswordReminder } = require('./model');

const serveFile = (res, filePath, type) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500);
            return res.end('Server error');
        }
        res.writeHead(200, { 'Content-Type': type });
        res.end(data);
    });
};

const server = http.createServer(async (req, res) => {
    if (req.method === 'GET') {
        if (req.url === '/') {
            return serveFile(res, './views/index.html', 'text/html');
        }
        if (req.url.endsWith('.css')) {
            return serveFile(res, path.join('public', req.url), 'text/css');
        }
        return res.end();
    }

    if (req.method === 'POST' && req.url === '/remind') {
        let body = '';
        req.on('data', (chunk) => (body += chunk.toString()));
        req.on('end', async () => {
            const { email } = qs.parse(body);
            const success = await sendPasswordReminder(email);
            res.writeHead(success ? 200 : 404);
            res.end(
                success ? 'Password sent to your email.' : 'Email not found.'
            );
        });
        return;
    }

    res.writeHead(404);
    res.end('Not found');
});

server.listen(3000, () =>
    console.log('Server running on http://localhost:3000')
);
