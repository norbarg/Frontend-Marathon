document.addEventListener('DOMContentLoaded', function () {
    var images = document.getElementsByTagName('img');
    var imageArray = Array.prototype.filter.call(images, function (img) {
        return img.hasAttribute('data-src');
    });

    var counter = document.getElementById('image-counter');
    var loadedImages = 0;
    var totalImages = imageArray.length;

    function updateCounter() {
        counter.textContent =
            String(loadedImages) + ' images loaded from ' + String(totalImages);
    }

    function isInViewport(img) {
        var rect = img.getBoundingClientRect();
        var windowHeight =
            window.innerHeight || document.documentElement.clientHeight;
        return rect.top >= -50 && rect.top <= windowHeight + 50;
    }

    function loadImage(img) {
        if (!img.getAttribute('data-src')) return;
        img.setAttribute('src', img.getAttribute('data-src'));
        img.removeAttribute('data-src');
        img.onload = function () {
            loadedImages = loadedImages + 1;
            updateCounter();
            if (loadedImages === totalImages) {
                counter.className = counter.className + ' loaded';
                setTimeout(function () {
                    counter.style.display = 'none';
                }, 3000);
            }
        };
    }

    function checkImages() {
        for (var i = 0; i < imageArray.length; i++) {
            if (
                imageArray[i].hasAttribute('data-src') &&
                isInViewport(imageArray[i])
            ) {
                loadImage(imageArray[i]);
            }
        }
    }

    checkImages();
    updateCounter();

    window.addEventListener('scroll', checkImages);

    window.addEventListener('resize', checkImages);
});
