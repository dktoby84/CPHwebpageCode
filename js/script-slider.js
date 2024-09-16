document.addEventListener('DOMContentLoaded', function () {
  // Find alle sliders på siden
  const sliders = document.querySelectorAll('.slider');

  sliders.forEach(slider => {
    // Find alle slides i den aktuelle slider
    const slides = slider.querySelectorAll('.slides');
    let currentIndex = 0;

    // Funktion til at vise den aktuelle slide
    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
      });
    }

    // Funktion til at skifte til næste slide
    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    }

    // Start slideren med det første billede
    showSlide(currentIndex);

    // Skift billede automatisk hver 3. sekund (6000 ms)
    setInterval(nextSlide, 3000);

    // Hvis du har knapper til manuel navigation (prev/next), kan du tilføje dem her.
    const prevButton = slider.querySelector('.prevButton');
    const nextButton = slider.querySelector('.nextButton');

    if (prevButton && nextButton) {
      prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length; // Sørg for at gå tilbage til sidste slide, hvis index bliver negativt
        showSlide(currentIndex);
      });

      nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
      });
    }
  });
});
