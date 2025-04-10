document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.current-input');
    const modeButtons = document.querySelectorAll('.mode');
    let baseValue = '';

    const observer = new MutationObserver(() => {
        const text = display.textContent.trim();
        if (!isNaN(text) && text !== '') {
            baseValue = text;
        }
    });

    observer.observe(display, { childList: true });

    document.querySelectorAll('.operations button').forEach((button) => {
        if (button.textContent.trim() === 'C') {
            button.addEventListener('click', () => {
                baseValue = '';
            });
        }
    });

    document
        .querySelector('.mode:nth-child(1)')
        .addEventListener('click', () => {
            const val = parseFloat(baseValue || display.textContent);
            if (!isNaN(val)) {
                display.textContent = `${val * 10000} cm² = ${val} m² = ${(
                    val / 1000000
                ).toFixed(6)} km²`;
            }
        });

    document
        .querySelector('.mode:nth-child(2)')
        .addEventListener('click', () => {
            const val = parseFloat(baseValue || display.textContent);
            if (!isNaN(val)) {
                display.textContent = `${val * 1000} g = ${val} kg = ${(
                    val / 1000
                ).toFixed(3)} t`;
            }
        });

    document
        .querySelector('.mode:nth-child(3)')
        .addEventListener('click', () => {
            const val = parseFloat(baseValue || display.textContent);
            if (!isNaN(val)) {
                display.textContent = `${val * 100} cm = ${val} m = ${(
                    val / 1000
                ).toFixed(3)} km`;
            }
        });
});
