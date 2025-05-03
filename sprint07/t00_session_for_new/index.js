const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

let lastHero = null;

const renderPage = (hero) => {
    const form = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');

    const heroData = hero
        ? `
    <hr>
    <h1>Session for new</h1>
    <p>name: ${hero.name}</p>
    <p>alias: ${hero.alias}</p>
    <p>age: ${hero.age}</p>
    <p>description: ${hero.description}</p>
    <p>photo: ${hero.photo}</p>
    <p>experience: ${hero.powers.length}</p>
    <p>level: ${hero.level}</p>
    <p>purpose: ${hero.publicity}</p>
    <fieldset>
    <form method="POST" action="/forget">
      <button type="submit">FORGET</button>
    </form>
    </fieldset>
  `
        : '';

    return form + heroData;
};

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
                    result[name] = filenameMatch[1];
                } else {
                    if (result[name]) {
                        if (Array.isArray(result[name])) {
                            result[name].push(value);
                        } else {
                            result[name] = [result[name], value];
                        }
                    } else {
                        result[name] = value;
                    }
                }
            }
        }
    }

    return result;
}

http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(renderPage(lastHero));
    } else if (req.method === 'POST' && req.url === '/') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const contentType = req.headers['content-type'];
            if (contentType.startsWith('multipart/form-data')) {
                const boundaryMatch = contentType.match(/boundary=(.+)$/);
                const boundary = boundaryMatch && boundaryMatch[1];
                const data = parseMultipart(body, boundary);

                lastHero = {
                    name: data.name,
                    alias: data.alias,
                    age: data.age,
                    description: data.description,
                    photo: data.photo,
                    powers: Array.isArray(data.powers)
                        ? data.powers
                        : [data.powers].filter(Boolean),
                    level: data.level,
                    publicity: data.publicity,
                };
            }

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(renderPage(lastHero));
        });
    } else if (req.method === 'POST' && req.url === '/forget') {
        lastHero = null;
        res.writeHead(302, { Location: '/' });
        res.end();
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
}).listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
