const LLData = require('./LLData');

class LList {
    constructor() {
        this.head = null;
    }

    *[Symbol.iterator]() {
        let current = this.head;
        while (current) {
            yield current.data;
            current = current.next;
        }
    }

    getFirst() {
        return this.head ? this.head.data : undefined;
    }

    getLast() {
        let current = this.head;
        if (!current) return undefined;
        while (current.next) {
            current = current.next;
        }
        return current.data;
    }

    add(value) {
        const newNode = new LLData(value);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
    }

    addFromArray(arrayOfData) {
        for (const value of arrayOfData) {
            this.add(value);
        }
    }

    remove(value) {
        if (!this.head) return;
        if (this.head.data === value) {
            this.head = this.head.next;
            return;
        }
        let current = this.head;
        while (current.next && current.next.data !== value) {
            current = current.next;
        }
        if (current.next && current.next.data === value) {
            current.next = current.next.next;
        }
    }

    removeAll(value) {
        while (this.head && this.head.data === value) {
            this.head = this.head.next;
        }
        let current = this.head;
        while (current && current.next) {
            if (current.next.data === value) {
                current.next = current.next.next;
            } else {
                current = current.next;
            }
        }
    }

    contains(value) {
        for (const data of this) {
            if (data === value) return true;
        }
        return false;
    }

    clear() {
        this.head = null;
    }

    count() {
        let count = 0;
        for (const _ of this) {
            count++;
        }
        return count;
    }

    toString() {
        return [...this].join(',');
    }

    getIterator() {
        return this[Symbol.iterator]();
    }

    filter(callback) {
        const filteredList = new LList();
        for (const data of this) {
            if (callback(data)) {
                filteredList.add(data);
            }
        }
        return filteredList;
    }
}

module.exports = { LList };
