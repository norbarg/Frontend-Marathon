const http = require('http');
const url = require('url');
const os = require('os');

function getServerIP() {
    const interfaces = os.networkInterfaces();
    for (let name in interfaces) {
        for (let iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return '127.0.0.1';
}
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    console.log('1. Script filename:', __filename);
    console.log('2. Script arguments:', process.argv.slice(2));
    console.log('3. Server IP address:', getServerIP());
    console.log('4. Host name:', req.headers.host);
    console.log('5. Protocol version:', `HTTP/${req.httpVersion}`);
    console.log('6. Query method:', req.method);
    console.log('7. User-Agent:', req.headers['user-agent']);
    console.log('8. Client IP address:', req.socket.remoteAddress);
    console.log('9. URL parameters:', parsedUrl.query);

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Information logged to console.\n');
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
