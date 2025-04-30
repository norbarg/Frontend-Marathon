const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;

function renderPage(formData = null) {
    let result = '';

    if (formData) {
        result += `<pre>POST\n\nArray\n{\n`;
        for (let key in formData) {
            result += `  [${key}] => ${formData[key]}\n`;
        }
        result += `}</pre>`;
    } else {
        result = `<p>form is empty</p>`;
    }

    const template = fs.readFileSync('index.html', 'utf-8');
    return template.replace('Form is empty', result);
}

function parseMultipart(body, boundary) {
    const result = {};
    const parts = body.split('--' + boundary);

    for (let part of parts) {
        if (part.includes('Content-Disposition')) {
            const nameMatch = part.match(/name="([^"]+)"/);
            const filenameMatch = part.match(/filename="([^"]+)"/);
            const value = part.split('\r\n\r\n')[1]?.split('\r\n')[0];

            if (nameMatch) {
                const name = nameMatch[1];
                if (filenameMatch) {
                    // Якщо файл — беремо лише ім’я
                    result[name] = filenameMatch[1];
                } else {
                    result[name] = value;
                }
            }
        }
    }

    return result;
}

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading HTML file');
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if (req.method === 'GET' && req.url === '/style.css') {
        fs.readFile('style.css', (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading CSS file');
            }
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(data);
        });
    } else if (req.method === 'POST' && req.url === '/') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const contentType = req.headers['content-type'];
            const boundaryMatch = contentType.match(/boundary=(.+)$/);

            if (!boundaryMatch) {
                res.writeHead(400);
                res.end('Invalid multipart form data');
                return;
            }

            const boundary = boundaryMatch[1];
            const formData = parseMultipart(body, boundary);
            const html = renderPage(formData);

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(html);
        });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
