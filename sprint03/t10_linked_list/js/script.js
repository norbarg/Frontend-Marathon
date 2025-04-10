class ListNode {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    add(value) {
        const newNode = new ListNode(value);
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

    remove(value) {
        if (!this.head) return false;

        if (this.head.data === value) {
            this.head = this.head.next;
            return true;
        }

        let current = this.head;
        while (current.next && current.next.data !== value) {
            current = current.next;
        }

        if (current.next) {
            current.next = current.next.next;
            return true;
        }
        return false;
    }

    contains(value) {
        let current = this.head;
        while (current) {
            if (current.data === value) return true;
            current = current.next;
        }
        return false;
    }

    clear() {
        this.head = null;
    }

    count() {
        let count = 0;
        let current = this.head;
        while (current) {
            count++;
            current = current.next;
        }
        return count;
    }

    log() {
        let values = [];
        let current = this.head;
        while (current) {
            values.push(current.data);
            current = current.next;
        }
        console.log(values.join(', '));
    }

    *[Symbol.iterator]() {
        let current = this.head;
        while (current) {
            yield current.data;
            current = current.next;
        }
    }
}

function createLinkedList(arr) {
    const list = new LinkedList();
    for (const value of arr) {
        list.add(value);
    }
    return list;
}
