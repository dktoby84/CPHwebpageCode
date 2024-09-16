// JavaScript til automatisk skift af billeder i slideren
const slides = document.querySelectorAll('#mine-lob .slides');
let currentIndex = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? 'block' : 'none';
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

// Start slideren med det første billede
showSlide(currentIndex);

// Skift billede hver 3. sekund (3000 ms)
setInterval(nextSlide, 3000);

// Knapper til manuel navigation
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

prevButton.addEventListener('click',   
 () => {
  showSlide(currentIndex - 1);
});

nextButton.addEventListener('click', () => {
  showSlide(currentIndex + 1);
});
