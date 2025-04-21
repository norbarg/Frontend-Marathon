function checkDivision(start = 1, end = 60) {
    for (let i = start; i <= end; i++) {
        let message = `The number ${i}`;

        const divisible = [];

        if (i % 2 === 0) divisible.push('is divisible by 2');
        if (i % 3 === 0) divisible.push('is divisible by 3');
        if (i % 10 === 0) divisible.push('is divisible by 10');

        if (divisible.length > 0) {
            message += ' ' + divisible.join(', ');
        } else {
            message += ' -';
        }

        console.log(message);
    }
}

exports.checkDivision = checkDivision;
