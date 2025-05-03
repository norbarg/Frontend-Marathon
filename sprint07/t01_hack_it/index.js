const http = require('http');
const fs = require('fs');
const crypto = require('crypto');
const querystring = require('querystring');

const PORT = 3000;
let sessionData = {};

function renderForm(
    res,
    message = '',
    status = '',
    hash = '',
    hasPassword = false
) {
    const html = `
    <html>
    <head>
      <meta charset="UTF-8" />
      <title>Password</title>
      <style>
        body { font-family: sans-serif; margin: 20px; }
        h1 { font-size: 2em; }
        .green { color: green; }
        .red { color: red; }
      </style>
    </head>
    <body>
      <h1>Password</h1>
      ${message ? `<p class="${status}">${message}</p>` : ''}
      ${
          hasPassword
              ? `
        <p>Password saved at session.<br/>Hash is ${hash}</p>
        <form method="POST" action="/check">
          Try to guess: <input name="guess" type="password" />
          <button>Check password</button>
        </form>
        <form method="POST" action="/clear"><button>Clear</button></form>
      `
              : `
        <p>Password not saved at session.</p>
        <form method="POST" action="/save">
          Password for saving to session:
          <input name="password" type="password" placeholder="Password to session" /><br/>
          Salt for saving to session:
          <input name="salt" placeholder="Salt to session" /><br/>
          <button>Save</button>
        </form>
      `
      }
    </body>
    </html>
  `;

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
}

function parseCookies(cookieHeader) {
    const cookies = {};
    if (!cookieHeader) return cookies;
    cookieHeader.split(';').forEach((cookie) => {
        const [name, value] = cookie.trim().split('=');
        cookies[name] = value;
    });
    return cookies;
}

http.createServer((req, res) => {
    const cookies = parseCookies(req.headers.cookie);
    let sid = cookies.sid;

    if (!sid || !sessionData[sid]) {
        sid = crypto.randomBytes(8).toString('hex');
        sessionData[sid] = {};
        res.setHeader('Set-Cookie', `sid=${sid}`);
    }

    if (req.method === 'GET') {
        const session = sessionData[sid];
        if (session.hash && session.salt) {
            renderForm(res, '', '', session.hash, true);
        } else {
            renderForm(res);
        }
    } else if (req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => (body += chunk));
        req.on('end', () => {
            const postData = querystring.parse(body);

            if (req.url === '/save') {
                const { password, salt } = postData;
                if (!password || !salt)
                    return renderForm(res, 'Missing password or salt.', 'red');

                const hash = crypto
                    .createHash('sha256')
                    .update(password + salt)
                    .digest('hex');

                sessionData[sid] = { hash, salt };
                renderForm(res, '', '', hash, true);
            } else if (req.url === '/check') {
                const { guess } = postData;
                const session = sessionData[sid];
                if (!session || !session.hash) {
                    return renderForm(
                        res,
                        'Session expired. Please save password again.',
                        'red'
                    );
                }

                const hashAttempt = crypto
                    .createHash('sha256')
                    .update(guess + session.salt)
                    .digest('hex');

                if (hashAttempt === session.hash) {
                    delete sessionData[sid];
                    renderForm(res, 'Hacked!', 'green');
                } else {
                    renderForm(
                        res,
                        'Access denied!',
                        'red',
                        session.hash,
                        true
                    );
                }
            } else if (req.url === '/clear') {
                delete sessionData[sid];
                renderForm(res);
            }
        });
    } else {
        res.writeHead(404);
        res.end('Not found');
    }
}).listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
