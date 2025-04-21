module.exports = class Access {
    constructor() {
        this._mark = undefined;
    }

    get mark_LXXXV() {
        if (this._mark === undefined) return 'undefined';
        if (this._mark === 'null') return 'null';
        return this._mark;
    }

    set mark_LXXXV(value) {
        this._mark = value;
    }
};
