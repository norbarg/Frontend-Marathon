document.getElementById('loadBtn').addEventListener('click', () => {
    const url = document.getElementById('imageUrl').value.trim();
    if (!url) return;

    const img = new Image();
    img.src = `/image-proxy?url=${encodeURIComponent(url)}`;

    img.onload = () => {
        const size = Math.min(img.width, img.height);
        const sx = (img.width - size) / 2;
        const sy = (img.height - size) / 2;

        const originalCanvas = document.getElementById('original');
        const redCanvas = document.getElementById('red');
        const greenCanvas = document.getElementById('green');
        const blueCanvas = document.getElementById('blue');

        [originalCanvas, redCanvas, greenCanvas, blueCanvas].forEach(
            (canvas) => {
                canvas.width = size;
                canvas.height = size;
            }
        );

        const ctxOriginal = originalCanvas.getContext('2d');
        ctxOriginal.drawImage(img, sx, sy, size, size, 0, 0, size, size);

        const imageData = ctxOriginal.getImageData(0, 0, size, size);

        const ctxRed = redCanvas.getContext('2d');
        const ctxGreen = greenCanvas.getContext('2d');
        const ctxBlue = blueCanvas.getContext('2d');

        const redData = ctxRed.createImageData(size, size);
        const greenData = ctxGreen.createImageData(size, size);
        const blueData = ctxBlue.createImageData(size, size);

        for (let i = 0; i < imageData.data.length; i += 4) {
            const r = imageData.data[i];
            const g = imageData.data[i + 1];
            const b = imageData.data[i + 2];
            const a = imageData.data[i + 3];

            redData.data[i] = r;
            redData.data[i + 1] = 0;
            redData.data[i + 2] = 0;
            redData.data[i + 3] = a;
            greenData.data[i] = 0;
            greenData.data[i + 1] = g;
            greenData.data[i + 2] = 0;
            greenData.data[i + 3] = a;
            blueData.data[i] = 0;
            blueData.data[i + 1] = 0;
            blueData.data[i + 2] = b;
            blueData.data[i + 3] = a;
        }

        ctxRed.putImageData(redData, 0, 0);
        ctxGreen.putImageData(greenData, 0, 0);
        ctxBlue.putImageData(blueData, 0, 0);
    };

    img.onerror = () => {
        alert('Failed to load image.');
    };
});
