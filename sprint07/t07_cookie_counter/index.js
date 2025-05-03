const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const COOKIE_NAME = 'pageLoads';

app.get('/counter', (req, res) => {
    let pageLoads = [];

    if (req.cookies[COOKIE_NAME]) {
        try {
            pageLoads = JSON.parse(req.cookies[COOKIE_NAME]);
        } catch (e) {
            pageLoads = [];
        }
    }

    const now = Date.now();
    pageLoads = pageLoads.filter((timestamp) => now - timestamp <= 60000);

    pageLoads.push(now);

    res.cookie(COOKIE_NAME, JSON.stringify(pageLoads), {
        maxAge: 60000,
        httpOnly: true,
    });

    res.json({ count: pageLoads.length });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
