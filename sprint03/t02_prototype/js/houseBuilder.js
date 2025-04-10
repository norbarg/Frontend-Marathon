const houseBlueprint = {
    getDaysToBuild: function () {
        return this.size / this._averageBuildSpeed;
    },
};

function HouseBuilder(address, description, owner, size, roomCount) {
    this.address = address;
    this.date = new Date();
    this.description = description;
    this.owner = owner;
    this.size = size;
    this.roomCount = roomCount;
}

HouseBuilder.prototype = Object.create(houseBlueprint);
HouseBuilder.prototype.constructor = HouseBuilder;
HouseBuilder.prototype._averageBuildSpeed = 0.5;
