export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

export function multiply(a, b) {
    return a * b;
}

export function divide(a, b) {
    if (b === 0) throw new Error('Division by zero');
    return a / b;
}

export function percentage(a) {
    return a / 100;
}

export function factorial(n) {
    if (n < 0 || !Number.isInteger(n)) throw new Error('Invalid input');
    return n <= 1 ? 1 : n * factorial(n - 1);
}

export function power(base, exponent) {
    return Math.pow(base, exponent);
}

export function sqrt(n) {
    if (n < 0) throw new Error('Invalid input');
    return Math.sqrt(n);
}

export function negate(n) {
    return -n;
}
export function evaluateExpression(expr) {
    const fn = new Function(`return ${expr}`);
    return fn();
}
