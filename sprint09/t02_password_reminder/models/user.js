const db = require('../db');

module.exports.findByEmail = async (email) => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [
        email,
    ]);
    return rows[0];
};
