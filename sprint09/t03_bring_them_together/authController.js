const userModel = require('./models/user');
const { parse } = require('querystring');
const config = require('./config.json');
const nodemailer = require('nodemailer');

exports.handleLogin = async (req, res) => {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', async () => {
        const { login, password } = parse(body);
        const user = await userModel.findByLoginAndPassword(login, password);
        if (user) {
            res.setHeader('Set-Cookie', `user=${user.login}; Path=/`);
            res.writeHead(302, { Location: '/' });
            return res.end();
        }
        res.writeHead(401, { 'Content-Type': 'text/plain' });
        res.end('Invalid login or password');
    });
};

exports.handleRegister = async (req, res) => {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', async () => {
        const { login, password, confirm, fullname, email } = parse(body);

        if (password !== confirm) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            return res.end('Passwords do not match');
        }

        try {
            await userModel.register({ login, password, fullname, email });
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Registration successful');
        } catch (err) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });

            if (err.message.includes('login')) {
                res.end('Login already exists');
            } else if (err.message.includes('email')) {
                res.end('Email already exists');
            } else {
                res.end('Registration failed');
            }

            console.error('Registration error:', err.message);
        }
    });
};

exports.handleReminder = async (req, res) => {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', async () => {
        const { email } = parse(body);
        const user = await userModel.findByEmail(email);
        if (!user) {
            res.writeHead(400);
            return res.end('Email not found');
        }

        const transporter = nodemailer.createTransport(config.email);
        await transporter.sendMail({
            from: `S.W.O.R.D. <${config.email.auth.user}>`,
            to: user.email,
            subject: 'Your Password Reminder',
            text: `Hello agent ${user.login}, your password is: ${user.password}`,
        });

        res.writeHead(200);
        res.end('Password sent to your email');
    });
};
