class Building {
    constructor(floors, material, address) {
        this.floors = floors;
        this.material = material;
        this.address = address;
    }

    toString() {
        return [
            `Floors: ${this.floors}`,
            `Material: ${this.material}`,
            `Address: ${this.address}`,
        ].join('\n');
    }
}
class Tower extends Building {
    constructor(floors, material, address, hasElevator, arcCapacity, height) {
        super(floors, material, address);
        this._hasElevator = hasElevator;
        this._arcCapacity = arcCapacity;
        this._height = height;
    }

    get floors() {
        return this._floors;
    }

    set floors(value) {
        this._floors = value;
    }

    get material() {
        return this._material;
    }

    set material(value) {
        this._material = value;
    }

    get address() {
        return this._address;
    }

    set address(value) {
        this._address = value;
    }

    get hasElevator() {
        return this._hasElevator;
    }

    set hasElevator(value) {
        this._hasElevator = value;
    }

    get arcCapacity() {
        return this._arcCapacity;
    }

    set arcCapacity(value) {
        this._arcCapacity = value;
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this._height = value;
    }

    getFloorHeight() {
        return this._height / this.floors;
    }
    toString() {
        return `${super.toString()}\nElevator: ${
            this.hasElevator ? '+' : '-'
        }\nArc reactor capacity: ${this.arcCapacity}\nHeight: ${
            this.height
        }\nFloor height: ${this.getFloorHeight()}`;
    }
}
