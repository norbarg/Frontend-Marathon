class HardWorker {
    constructor() {
        this._name = '';
        this._age = 0;
        this._salary = 0;
    }

    get name() {
        return this._name;
    }
    set name(val) {
        this._name = val;
    }

    get age() {
        return this._age;
    }
    set age(val) {
        if (1 <= val && val < 100) {
            this._age = val;
        }
    }

    get salary() {
        return this._salary;
    }
    set salary(val) {
        if (100 <= val && val < 10000) {
            this._salary = val;
        }
    }

    toObject() {
        return {
            name: this._name,
            age: this._age,
            salary: this._salary,
        };
    }
}
