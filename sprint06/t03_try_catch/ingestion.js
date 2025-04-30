const { EatException } = require('./eat-exception');

class Ingestion {
    constructor(meal_type, id) {
        this.id = id;
        this.meal_type = meal_type;
        this.products = [];
        this.day_of_diet = 0;
    }

    setProduct(product) {
        this.products.push(product);
    }

    getProductInfo(name) {
        return this.products.find((product) => product.name === name);
    }

    getFromFridge(productName) {
        const product = this.getProductInfo(productName);
        if (product.kcal > 200) {
            throw new EatException(
                `Too many calories in ${product.name} for ${this.meal_type}`
            );
        }
        return product;
    }
}

module.exports = {
    Ingestion,
};
