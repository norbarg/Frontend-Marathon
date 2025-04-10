function Calculator() {
    let result = 0;

    this.init = function (num) {
        result = num;
        return this;
    };

    this.add = function (num) {
        result += num;
        return this;
    };

    this.sub = function (num) {
        result -= num;
        return this;
    };

    this.mul = function (num) {
        result *= num;
        return this;
    };

    this.div = function (num) {
        if (num !== 0) {
            result /= num;
        } else {
            this.alert('Cannot divide by zero');
        }
        return this;
    };

    this.alert = function () {
        setTimeout(() => {
            alert(result);
        }, 5000);
        return this;
    };
    this.getResult = function () {
        return result;
    };
}
