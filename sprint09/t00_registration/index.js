const http = require('http');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const User = require('./models/user');
const db = require('./db');

const serveFile = (res, filePath, contentType) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500);
            res.end('Error loading file');
            return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
};

const server = http.createServer(async (req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        return serveFile(res, './public/index.html', 'text/html');
    }

    if (req.method === 'GET' && req.url.endsWith('.css')) {
        const filePath = path.join(__dirname, 'public', req.url);
        return serveFile(res, filePath, 'text/css');
    }

    if (req.method === 'POST' && req.url === '/register') {
        let body = '';
        req.on('data', (chunk) => (body += chunk.toString()));
        req.on('end', async () => {
            const { login, password, confirm, fullname, email } =
                qs.parse(body);

            if (password !== confirm) {
                res.writeHead(400);
                return res.end('Passwords do not match');
            }

            try {
                const [loginCheck] = await db.query(
                    'SELECT id FROM users WHERE login = ?',
                    [login]
                );
                const [emailCheck] = await db.query(
                    'SELECT id FROM users WHERE email = ?',
                    [email]
                );

                if (loginCheck.length) {
                    res.writeHead(400);
                    return res.end('Login already exists');
                }
                if (emailCheck.length) {
                    res.writeHead(400);
                    return res.end('Email already exists');
                }

                const user = new User({
                    login,
                    password,
                    fullname,
                    email,
                });
                await user.save();

                res.writeHead(200);
                res.end('User registered successfully');
            } catch (e) {
                res.writeHead(500);
                res.end('Server error');
            }
        });
        return;
    }

    res.writeHead(404);
    res.end('Not Found');
});

server.listen(3000, () =>
    console.log('Server running on http://localhost:3000')
);
