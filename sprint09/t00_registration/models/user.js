const Model = require('../model');

class User extends Model {
    static table() {
        return 'users';
    }

    constructor(attrs) {
        super(attrs);
    }
}

module.exports = User;
