const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = 3000;

const MARVEL_PUBLIC_KEY = '340889abfa68cb6a5185659ce2e644f3';
const MARVEL_PRIVATE_KEY = 'f3c33b5123ad8b96358c6eda57b3f3e850b04eb9';

const server = http.createServer((req, res) => {
    const parsedUrl = req.url;

    if (parsedUrl === '/' || parsedUrl === '/index.html') {
        sendFile('index.html', 'text/html', res);
    } else if (parsedUrl === '/style.css') {
        sendFile('style.css', 'text/css', res);
    } else if (parsedUrl === '/script.js') {
        sendFile('script.js', 'application/javascript', res);
    } else if (parsedUrl === '/fetch-marvel-data') {
        fetchMarvelData(res);
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

function sendFile(fileName, contentType, res) {
    const filePath = path.join(__dirname, fileName);
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500);
            res.end('Error loading file');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
}

function fetchMarvelData(res) {
    console.log('Fetching data from Marvel API...');
    const timestamp = new Date().getTime().toString();
    const hash = crypto
        .createHash('md5')
        .update(timestamp + MARVEL_PRIVATE_KEY + MARVEL_PUBLIC_KEY)
        .digest('hex');
    const marvelUrl = ` https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${MARVEL_PUBLIC_KEY}&hash=${hash}`;

    https
        .get(marvelUrl, (apiRes) => {
            let data = '';

            apiRes.on('data', (chunk) => {
                data += chunk;
            });

            apiRes.on('end', () => {
                if (apiRes.statusCode === 200) {
                    try {
                        const json = JSON.parse(data);
                        const results = json.data.results;
                        res.writeHead(200, {
                            'Content-Type': 'application/json',
                        });
                        res.end(JSON.stringify(results));
                    } catch (e) {
                        res.writeHead(500);
                        res.end('Error parsing Marvel API response');
                    }
                } else {
                    res.writeHead(500);
                    res.end('Error fetching Marvel API: ' + data);
                }
            });
        })
        .on('error', (err) => {
            console.error('Marvel API request error:', err);
            res.writeHead(500);
            res.end('Error fetching Marvel API');
        });
}
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
