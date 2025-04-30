class Avenger {
    constructor(name, alias, gender, age, powers, hp) {
        function Avenger() {
            return `${alias.toUpperCase()}\n${powers.join('\n')}`;
        }

        Avenger.toString = () => {
            return `name: ${name}\ngender: ${gender}\nage: ${age}`;
        };

        Avenger.realName = name;
        Avenger.alias = alias;
        Avenger.gender = gender;
        Avenger.age = age;
        Avenger.powers = powers;
        Avenger.hp = hp;

        Avenger.clone = () =>
            new Avenger(name, alias, gender, age, [...powers], hp);

        return Avenger;
    }
}

module.exports = { Avenger };
