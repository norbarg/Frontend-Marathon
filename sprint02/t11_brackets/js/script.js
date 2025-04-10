function checkBrackets(str) {
    if (typeof str !== 'string' || !/[()]/.test(str)) {
        return -1;
    }

    let balance = 0;
    let additions = 0;

    for (let char of str) {
        if (char === '(') {
            balance++;
        } else if (char === ')') {
            if (balance > 0) {
                balance--;
            } else {
                additions++;
            }
        }
    }

    return balance + additions;
}
