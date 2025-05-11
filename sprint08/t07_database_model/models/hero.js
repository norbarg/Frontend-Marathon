const Model = require('../model');

class Hero extends Model {
    constructor(attrs = {}) {
        super(attrs);
    }

    static table() {
        return 'heroes';
    }
}

module.exports = Hero;
