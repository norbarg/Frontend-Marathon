const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = 3000;

const server = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);

    if (parsedUrl.pathname === '/') {
        const filePath = path.join(__dirname, 'index.html');
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading page');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (parsedUrl.pathname === '/script.js') {
        const filePath = path.join(__dirname, 'script.js');
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading page');
            } else {
                res.writeHead(200, {
                    'Content-Type': 'application/javascript',
                });
                res.end(data);
            }
        });
    } else if (parsedUrl.pathname === '/fetch') {
        const targetUrl = parsedUrl.searchParams.get('url');
        if (!targetUrl) {
            res.writeHead(400);
            res.end('No URL provided');
            return;
        }

        const client = targetUrl.startsWith('https') ? https : http;
        client
            .get(targetUrl, (fetchRes) => {
                let data = '';

                fetchRes.on('data', (chunk) => (data += chunk));
                fetchRes.on('end', () => {
                    const bodyContent = extractBody(data);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ body: bodyContent }));
                });
            })
            .on('error', (e) => {
                res.writeHead(500);
                res.end('Error fetching URL');
            });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

function extractBody(html) {
    const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    return match ? match[1].replace(/\s+$/, '') : '';
}

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
