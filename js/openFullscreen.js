function openFullscreen(element) {
  // Opretter et fuldskærmselement
  const imgSrc = element.querySelector('img').src;
  const fullscreenDiv = document.createElement('div');
  fullscreenDiv.className = 'fullscreen-image';
  fullscreenDiv.onclick = function() {
    document.body.removeChild(fullscreenDiv);
  };

  const img = document.createElement('img');
  img.src = imgSrc;
  fullscreenDiv.appendChild(img);
  document.body.appendChild(fullscreenDiv);
}
