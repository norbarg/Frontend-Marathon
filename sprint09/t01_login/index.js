const http = require('http');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const { validateUser } = require('./model');

let currentUser = null;

const serveFile = (res, filePath, contentType) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500);
            return res.end('Server error');
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
};

const server = http.createServer(async (req, res) => {
    if (req.method === 'GET') {
        if (req.url === '/') {
            return serveFile(res, './public/index.html', 'text/html');
        }
        if (req.url.endsWith('.css')) {
            return serveFile(res, path.join('public', req.url), 'text/css');
        }
        if (req.url.endsWith('.js')) {
            return serveFile(
                res,
                path.join('public', req.url),
                'application/javascript'
            );
        }
        if (req.url === '/me') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify(currentUser || {}));
        }
    }

    if (req.method === 'POST' && req.url === '/login') {
        let body = '';
        req.on('data', (chunk) => (body += chunk.toString()));
        req.on('end', async () => {
            const { login, password } = qs.parse(body);
            try {
                const user = await validateUser(login, password);
                if (!user) {
                    res.writeHead(401);
                    return res.end('Invalid login or password');
                }
                currentUser = {
                    login: user.login,
                    status: user.status || 'user',
                };
                res.writeHead(200);
                res.end('Login successful');
            } catch {
                res.writeHead(500);
                res.end('Server error');
            }
        });
        return;
    }

    if (req.method === 'POST' && req.url === '/logout') {
        currentUser = null;
        res.writeHead(200);
        res.end('Logged out');
        return;
    }

    res.writeHead(404);
    res.end('Not Found');
});

server.listen(3000, () =>
    console.log('Server running at http://localhost:3000')
);
