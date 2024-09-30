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

      // Knapper til manuel navigation (prev/next)
      const prevButton = slider.querySelector('.prevButton');
      const nextButton = slider.querySelector('.nextButton');

      if (prevButton && nextButton) {
          prevButton.addEventListener('click', () => {
              currentIndex = (currentIndex - 1 + slides.length) % slides.length;
              showSlide(currentIndex);
          });

          nextButton.addEventListener('click', () => {
              nextSlide();
          });
      }

      // Åbn billeder i fuld skærm ved klik
      slides.forEach((slide, i) => {
          slide.addEventListener('click', () => {
              openFullscreen(i); // Send indekset til openFullscreen
          });
      });

      // Funktion til at åbne billeder i fuld skærm
      function openFullscreen(index) {
          const fullscreenDiv = document.createElement('div');
          fullscreenDiv.className = 'fullscreen-image';
          fullscreenDiv.onclick = function() {
              document.body.removeChild(fullscreenDiv);
          };

          const img = document.createElement('img');
          img.src = slides[index].src; // Vis det valgte billede
          fullscreenDiv.appendChild(img);

          // Knapper til navigation
          const prevButton = document.createElement('button');
          prevButton.textContent = 'Forrige';
          prevButton.onclick = function(event) {
              event.stopPropagation(); // Stop click event fra at lukke fuldskærm
              index = (index - 1 + slides.length) % slides.length; // Gå til forrige slide
              img.src = slides[index].src; // Opdater billede
          };

          const nextButton = document.createElement('button');
          nextButton.textContent = 'Næste';
          nextButton.onclick = function(event) {
              event.stopPropagation(); // Stop click event fra at lukke fuldskærm
              index = (index + 1) % slides.length; // Gå til næste slide
              img.src = slides[index].src; // Opdater billede
          };

          // Tilføj knapperne til fullscreen-div'en
          fullscreenDiv.appendChild(prevButton);
          fullscreenDiv.appendChild(nextButton);

          // Style knapperne
          prevButton.style.position = 'absolute';
          prevButton.style.left = '20px';
          prevButton.style.top = '50%';
          prevButton.style.transform = 'translateY(-50%)';

          nextButton.style.position = 'absolute';
          nextButton.style.right = '20px';
          nextButton.style.top = '50%';
          nextButton.style.transform = 'translateY(-50%)';

          // Tilføj fullscreen-div'en til dokumentet
          document.body.appendChild(fullscreenDiv);
      }
  });
});
