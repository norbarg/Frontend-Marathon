class Avenger {
    constructor({ name, alias, gender, age, powers }) {
        function Avenger() {
            return `${alias.toUpperCase()}\n${powers.join('\n')}`;
        }

        Avenger.toString = () => {
            return `name: ${name}\ngender: ${gender}\nage: ${age}`;
        };

        return Avenger;
    }
}

module.exports = { Avenger };
