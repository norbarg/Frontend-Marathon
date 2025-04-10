function concat(string1, string2) {
    if (string2 !== undefined) {
        return `${string1} ${string2}`;
    }

    function func1() {
        func1.count++;
        let string2 = prompt('Enter the second string:');
        return `${string1} ${string2}`;
    }

    func1.count = 0;

    return func1;
}
