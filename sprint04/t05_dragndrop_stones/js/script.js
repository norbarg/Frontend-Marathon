document.addEventListener('DOMContentLoaded', () => {
    const stones = document.querySelectorAll('.stone');

    stones.forEach((stone) => {
        stone.addEventListener('click', () => {
            const isDraggable = stone.getAttribute('draggable') === 'true';
            stone.setAttribute('draggable', !isDraggable);
            stone.classList.toggle('no-drag');
        });

        stone.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.className);
            setTimeout(() => {
                stone.style.opacity = '0.5';
            }, 0);
        });

        stone.addEventListener('dragend', (e) => {
            stone.style.opacity = '1';
            stone.style.left = e.pageX - 50 + 'px';
            stone.style.top = e.pageY - 50 + 'px';
        });

        stone.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        stone.addEventListener('drop', (e) => {
            e.preventDefault();
        });
    });

    document.body.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    document.body.addEventListener('drop', (e) => {
        e.preventDefault();
    });
});
