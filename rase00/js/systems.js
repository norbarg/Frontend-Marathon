document.addEventListener('DOMContentLoaded', function () {
    const display = document.querySelector('.current-input');
    const history = document.querySelector('.history');

    function convertToBinary(value) {
        const number = parseInt(value, 10);
        if (isNaN(number)) return null;
        return number.toString(2);
    }

    function convertToHex(value) {
        const number = parseInt(value, 10);
        if (isNaN(number)) return null;
        return number.toString(16).toUpperCase();
    }

    function updateDisplay(newValue, historyMessage) {
        display.textContent = newValue;
        history.textContent = historyMessage;
    }

    document.querySelectorAll('.sistem').forEach((button) => {
        button.addEventListener('click', () => {
            const action = button.textContent.trim().toLowerCase();
            const value = display.textContent.trim();

            let result = '';
            let message = '';

            if (action === 'binary') {
                result = convertToBinary(value);
                message = 'Converted to Binary:';
            } else if (action === 'hexad') {
                result = convertToHex(value);
                message = 'Converted to Hexadecimal:';
            }

            if (result !== null) {
                updateDisplay(result, message);
            } else {
                updateDisplay('Error', 'Invalid input for conversion');
            }
        });
    });
});
