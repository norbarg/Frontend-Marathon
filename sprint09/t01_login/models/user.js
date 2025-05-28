const db = require('../db');

class User {
    constructor({ login, password, fullname, email, status = 'user' }) {
        this.login = login;
        this.password = password;
        this.fullname = fullname;
        this.email = email;
        this.status = status;
    }

    async save() {
        const sql =
            'INSERT INTO users (login, password, fullname, email, status) VALUES (?, ?, ?, ?, ?)';
        const params = [
            this.login,
            this.password,
            this.fullname,
            this.email,
            this.status,
        ];
        await db.query(sql, params);
    }
}

module.exports = User;
