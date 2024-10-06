// Open the lightbox
function openLightbox() {
  document.getElementById("lightbox").style.display = "block";
}

// Close the lightbox
function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

// Change the image in the lightbox
var currentImage = 0;
function showImage(index) {
  var images = document.getElementsByClassName("lightbox-img");
  if (index >= images.length) {
    currentImage = 0; // Wrap to first image
  } else if (index < 0) {
    currentImage = images.length - 1; // Wrap to last image
  } else {
    currentImage = index;
  }
  
  // Hide all images
  for (var i = 0; i < images.length; i++) {
    images[i].classList.remove("active");
  }
  
  // Show the current image
  images[currentImage].classList.add("active");
}

// Change to next/previous image
function changeImage(direction) {
  showImage(currentImage + direction);
}
