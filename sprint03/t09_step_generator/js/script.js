function* numberGenerator() {
    let previousResult = 1;
    while (true) {
        let input = prompt(
            `Previous result: ${previousResult}. Enter a new number:`
        );
        let num = Number(input);

        if (isNaN(num)) {
            console.error('Invalid number!');
            continue;
        }

        previousResult += num;

        if (previousResult > 10000) {
            previousResult = 1;
        }
    }
}

(function runGenerator() {
    const generator = numberGenerator();
    while (true) {
        generator.next();
    }
})();
