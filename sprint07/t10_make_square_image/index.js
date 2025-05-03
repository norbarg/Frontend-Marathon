const express = require('express');
const https = require('https');
const http = require('http');
const { URL } = require('url');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname)));

app.get('/image-proxy', (req, res) => {
    const imageUrl = req.query.url;
    if (!imageUrl) {
        return res.status(400).send('No URL provided');
    }

    try {
        const urlObj = new URL(imageUrl);
        const client = urlObj.protocol === 'https:' ? https : http;

        client
            .get(imageUrl, (imageRes) => {
                if (imageRes.statusCode !== 200) {
                    return res.status(400).send('Failed to fetch image');
                }

                res.setHeader('Content-Type', imageRes.headers['content-type']);
                imageRes.pipe(res);
            })
            .on('error', (err) => {
                console.error(err);
                res.status(500).send('Error fetching image');
            });
    } catch (err) {
        console.error(err);
        res.status(500).send('Invalid URL');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
