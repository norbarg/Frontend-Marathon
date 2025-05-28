const db = require('../db');

const User = {
    async create({ login, password, fullname, email }) {
        const [result] = await db.query(
            'INSERT INTO users (login, password, fullname, email) VALUES (?, ?, ?, ?)',
            [login, password, fullname, email]
        );
        return result.insertId;
    },

    async findByLogin(login) {
        const [rows] = await db.query('SELECT * FROM users WHERE login = ?', [
            login,
        ]);
        return rows[0];
    },

    async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [
            email,
        ]);
        return rows[0];
    },

    async findByLoginAndPassword(login, password) {
        const [rows] = await db.query(
            'SELECT * FROM users WHERE login = ? AND password = ?',
            [login, password]
        );
        return rows[0];
    },

    async register({ login, password, fullname, email }) {
        const existingLogin = await this.findByLogin(login);
        if (existingLogin) {
            throw new Error('login already exists');
        }

        const existingEmail = await this.findByEmail(email);
        if (existingEmail) {
            throw new Error('email already exists');
        }

        return this.create({ login, password, fullname, email });
    },
};

module.exports = User;
