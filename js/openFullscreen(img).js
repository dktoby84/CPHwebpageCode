function openFullscreen(img) {
      const fullScreenDiv = document.createElement('div');
      fullScreenDiv.style.position = 'fixed';
      fullScreenDiv.style.top = 0;
      fullScreenDiv.style.left = 0;
      fullScreenDiv.style.width = '100vw';
      fullScreenDiv.style.height = '100vh';
      fullScreenDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
      fullScreenDiv.style.display = 'flex';
      fullScreenDiv.style.alignItems = 'center';
      fullScreenDiv.style.justifyContent = 'center';
      fullScreenDiv.style.zIndex = 1000;

      const fullScreenImg = document.createElement('img');
      fullScreenImg.src = img.src;
      fullScreenImg.style.maxWidth = '90%';
      fullScreenImg.style.maxHeight = '90%';

      fullScreenDiv.appendChild(fullScreenImg);
      document.body.appendChild(fullScreenDiv);

      // Luk fuldskærm når der klikkes på baggrunden
      fullScreenDiv.onclick = function() {
        document.body.removeChild(fullScreenDiv);
      };
    }