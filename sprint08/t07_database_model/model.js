const db = require('./db');

class Model {
    constructor(attrs = {}) {
        Object.assign(this, attrs);
    }

    static table() {
        throw new Error('Table name not defined');
    }

    static async find(id) {
        const [rows] = await db.query(
            `SELECT * FROM ${this.table()} WHERE id = ?`,
            [id]
        );
        if (rows.length === 0) return null;
        return new this(rows[0]);
    }

    async delete() {
        if (!this.id) throw new Error('ID is required to delete');
        await db.query(`DELETE FROM ${this.constructor.table()} WHERE id = ?`, [
            this.id,
        ]);
    }

    async save() {
        const keys = Object.keys(this).filter((k) => k !== 'id');
        const values = keys.map((k) => this[k]);

        if (this.id) {
            const setClause = keys.map((k) => `${k} = ?`).join(', ');
            await db.query(
                `UPDATE ${this.constructor.table()} SET ${setClause} WHERE id = ?`,
                [...values, this.id]
            );
        } else {
            const placeholders = keys.map(() => '?').join(', ');
            const [result] = await db.query(
                `INSERT INTO ${this.constructor.table()} (${keys.join(
                    ', '
                )}) VALUES (${placeholders})`,
                values
            );
            this.id = result.insertId;
        }
    }
}

module.exports = Model;
