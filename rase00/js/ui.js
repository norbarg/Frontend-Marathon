let expression = '';
let isResultDisplayed = false;

const display = document.querySelector('.current-input');
const history = document.querySelector('.history');
const clearBtn = document.querySelector('button.color-red:not([data-action])');

export function updateDisplay() {
    display.textContent = expression || '0';
}

export function setHistory(text) {
    history.textContent = text;
}

export function clearAll() {
    if (isResultDisplayed) {
        expression = '';
        setHistory('');
        isResultDisplayed = false;
        setClearButtonTo('C');
    } else {
        expression = expression.slice(0, -1);
    }
    updateDisplay();
}

export function appendDigit(digit) {
    if (isResultDisplayed) {
        expression = '';
        isResultDisplayed = false;
        setClearButtonTo('C');
    }

    if (digit === '.') {
        const lastNumber = expression.split(/[\+\-\×\÷\^]/).pop();
        if (lastNumber.includes('.')) {
            return;
        }
        if (lastNumber === '') {
            expression += '0.';
            updateDisplay();
            return;
        }
    }

    expression += digit;
    updateDisplay();
}

export function appendOperator(operator) {
    if (isResultDisplayed) {
        isResultDisplayed = false;
        setClearButtonTo('C');
    }

    const lastChar = expression.slice(-1);
    const isLastOperator = ['+', '-', '×', '÷', '^'].includes(lastChar);

    if (isLastOperator) {
        // замінюємо останній оператор
        expression = expression.slice(0, -1) + operator;
    } else if (expression === '' && operator === '-') {
        // дозволити мінус на початку
        expression += operator;
    } else if (expression !== '') {
        expression += operator;
    }

    updateDisplay();
}

export function getExpression() {
    return expression;
}

export function setExpression(value) {
    expression = value.toString();
    isResultDisplayed = true;
    setClearButtonTo('AC');
    updateDisplay();
}
export function setClearButtonTo(mode) {
    if (clearBtn) {
        clearBtn.textContent = mode;
    }
}
export function toggleSign() {
    const match = expression.match(/(-?\d*\.?\d+)(?!.*\d)/);
    if (!match) return;

    const number = match[0];
    const start = match.index;
    const end = start + number.length;

    let toggled;
    if (number.startsWith('-')) {
        toggled = number.slice(1);
    } else {
        toggled = '-' + number;
    }

    expression = expression.slice(0, start) + toggled + expression.slice(end);
    updateDisplay();
}

export function getDisplayValue() {
    const display = document.querySelector('.current-input');
    return parseFloat(display.textContent) || 0;
}

export function setDisplayValue(value) {
    const display = document.querySelector('.current-input');
    display.textContent = value;
}

export function setHistoryMessage(msg) {
    const history = document.querySelector('.history');
    history.textContent = msg;
}
