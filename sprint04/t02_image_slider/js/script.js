const images = [
    'assets/images/kitty.jpg',
    'assets/images/my_kitty.jpg',
    'assets/images/monke.jpg',
];

let currentIndex = 0;
const sliderImage = document.getElementById('slider-image');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
let autoSlide = setInterval(nextImage, 3000);

function updateImage() {
    sliderImage.src = images[currentIndex];
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
    resetInterval();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
    resetInterval();
}

function resetInterval() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextImage, 3000);
}

prevButton.addEventListener('click', prevImage);
nextButton.addEventListener('click', nextImage);
