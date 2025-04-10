import * as math from './math.js';
import {
    toggleSign,
    updateDisplay,
    clearAll,
    appendDigit,
    appendOperator,
    getExpression,
    setExpression,
    setHistory,
} from './ui.js';
import * as memory from './memory.js';
import * as ui from './ui.js';

export function bindAllEvents() {
    const memoryButtons = document.querySelectorAll('.memory');
    memoryButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const action = button.dataset.action;
            const currentValue = ui.getDisplayValue();

            let message = '';

            switch (action) {
                case 'MC':
                    message = memory.memoryClear();
                    break;
                case 'MR':
                    const recalled = memory.memoryRecall();
                    ui.setExpression(recalled);
                    message = `Memory recalled: ${recalled}`;
                    break;
                case 'M+':
                    message = memory.memoryAdd(currentValue);
                    break;
                case 'M-':
                    message = memory.memorySubtract(currentValue);
                    break;
            }

            ui.setHistoryMessage(message);
        });
    });

    document.querySelectorAll('button').forEach((button) => {
        const value = button.textContent.trim();

        switch (value) {
            case 'C':
                button.addEventListener('click', clearAll);
                break;
            case '=':
                button.addEventListener('click', () => {
                    try {
                        const expr = getExpression()
                            .replace(/×/g, '*')
                            .replace(/÷/g, '/')
                            .replace(/\^/g, '**');

                        const result = math.evaluateExpression(expr);
                        setHistory(`${expr} =`);
                        setExpression(result);
                    } catch {
                        setExpression('Error');
                    }
                });
                break;

            case '%':
                button.addEventListener('click', () => appendOperator('/100'));
                break;
            case 'x!':
                button.addEventListener('click', () => {
                    try {
                        const expr = getExpression();
                        const result = math.factorial(parseInt(expr));
                        setHistory(`${expr}! =`);
                        setExpression(result);
                    } catch {
                        setExpression('Error');
                    }
                });
                break;
            case 'xⁿ':
                button.addEventListener('click', () => appendOperator('^'));
                break;
            case '√':
                button.addEventListener('click', () => {
                    try {
                        const expr = getExpression();
                        const result = math.sqrt(parseFloat(expr));
                        setHistory(`√${expr} =`);
                        setExpression(result);
                    } catch {
                        setExpression('Error');
                    }
                });
                break;
            case '+':
            case '-':
            case '×':
            case '÷':
                button.addEventListener('click', () => appendOperator(value));
                break;
            case '+/-':
                button.addEventListener('click', toggleSign);
                break;
            default:
                if (!isNaN(value) || value === '.' || value === '00') {
                    button.addEventListener('click', () => appendDigit(value));
                }
        }
    });
}
