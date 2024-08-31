const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const carousel = document.querySelector('.carousel');
const images = document.querySelectorAll('.carousel-image');
const totalImages = images.length;

let currentIndex = 0;

function showImage(index) {

    if (index < 0) currentIndex = totalImages - 1;
    else if (index >= totalImages) currentIndex = 0;
    else currentIndex = index;

    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
}

prevButton.addEventListener('click', () => showImage(currentIndex - 1));
nextButton.addEventListener('click', () => showImage(currentIndex + 1));
