const fs = require('fs');
const path = require('path');
const userModel = require('./models/user');

async function getUserByLogin(login) {
    return await userModel.findByLogin(login);
}

function renderView(viewName, res) {
    const filePath = path.join(__dirname, 'views', `${viewName}.html`);
    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>');
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Server error');
            }
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
}

module.exports = {
    renderView,
    getUserByLogin,
};
