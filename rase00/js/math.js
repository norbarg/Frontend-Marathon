export function factorial(n) {
    if (n < 0 || !Number.isInteger(n)) throw new Error('Invalid input');
    return n <= 1 ? 1 : n * factorial(n - 1);
}

export function sqrt(n) {
    if (n < 0) throw new Error('Invalid input');
    return Math.sqrt(n);
}

export function evaluateExpression(expr) {
    const fn = new Function(`return ${expr}`);
    return fn();
}
