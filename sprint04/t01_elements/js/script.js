const characters = document.querySelectorAll('#characters li');

characters.forEach((char) => {
    if (
        !char.classList.contains('good') &&
        !char.classList.contains('evil') &&
        !char.classList.contains('unknown')
    ) {
        char.classList.add('unknown');
    }

    if (!char.hasAttribute('data-element')) {
        char.setAttribute('data-element', 'none');
    }

    // Добавление кружков элементов
    char.appendChild(document.createElement('br'));
    const elements = char.getAttribute('data-element').split(' ');
    elements.forEach((element) => {
        const circle = document.createElement('div');
        circle.classList.add('elem', element);

        if (element === 'none') {
            const line = document.createElement('div');
            line.classList.add('line');
            circle.appendChild(line);
        }

        char.appendChild(circle);
    });
});
