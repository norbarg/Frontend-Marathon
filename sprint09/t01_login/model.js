const db = require('./db');

async function findUserByLogin(login) {
    const [rows] = await db.query('SELECT * FROM users WHERE login = ?', [
        login,
    ]);
    return rows[0];
}

async function validateUser(login, password) {
    const user = await findUserByLogin(login);
    if (!user) return null;
    const match = user.password === password;
    return match ? user : null;
}

module.exports = {
    findUserByLogin,
    validateUser,
};
