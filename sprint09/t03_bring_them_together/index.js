const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const authController = require('./authController');
const mainController = require('./mainController');
const model = require('./model');

const PORT = 3000;

http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if (pathname.startsWith('/public/')) {
        const filePath = path.join(__dirname, pathname);
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('Not found');
            } else {
                res.writeHead(200);
                res.end(data);
            }
        });
        return;
    }

    req.cookies = Object.fromEntries(
        (req.headers.cookie || '').split('; ').map((c) => c.split('='))
    );

    if (pathname === '/' && req.method === 'GET') {
        return mainController.handleMain(req, res);
    } else if (pathname === '/login' && req.method === 'POST') {
        return authController.handleLogin(req, res);
    } else if (pathname === '/register' && req.method === 'POST') {
        return authController.handleRegister(req, res);
    } else if (pathname === '/remind' && req.method === 'POST') {
        return authController.handleReminder(req, res);
    } else if (pathname === '/logout' && req.method === 'POST') {
        res.setHeader('Set-Cookie', 'user=; Max-Age=0');
        res.writeHead(302, { Location: '/login' });
        res.end();
        return;
    } else if (pathname === '/me' && req.method === 'GET') {
        const login = req.cookies.user;
        const user = login ? await model.getUserByLogin(login) : null;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user || {}));
        return;
    }

    const pages = ['login', 'register', 'reminder'];
    if (pages.includes(pathname.slice(1))) {
        return model.renderView(pathname.slice(1), res);
    }

    model.renderView('404', res);
}).listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);
