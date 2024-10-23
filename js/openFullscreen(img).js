let currentImageIndex = 0;
let images = []; // Array til billederne

function openFullscreen(img) {
    // Tjek om billedet har klassen 'social-icon'. Hvis ja, gør intet.
    if (img.classList.contains('exclude-icon')) {
        return; // Undgå at vise sociale ikoner i fuldskærm
    }

    // Find alle billeder på siden, undtagen dem med klassen 'social-icon'
    const imagesList = document.querySelectorAll('img:not(.exclude-icon)');
    images = Array.from(imagesList); // Lav en array af billeder uden sociale ikoner
    currentImageIndex = images.indexOf(img); // Find indekset for det valgte billede

    // Opret en div til fuldskærmsvisning
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

    // Opret et billede-element til at vise det valgte billede i fuldskærm
    const fullScreenImg = document.createElement('img');
    fullScreenImg.src = img.src;
    fullScreenImg.style.maxWidth = '90%';
    fullScreenImg.style.maxHeight = '90%';

    // Opret knapper til at navigere mellem billeder
    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '>';
    nextBtn.style.position = 'absolute';
    nextBtn.style.right = '20px';
    nextBtn.style.fontSize = '2rem';
    nextBtn.style.background = 'none';
    nextBtn.style.color = 'white';
    nextBtn.style.border = 'none';
    nextBtn.style.cursor = 'pointer';
    nextBtn.onclick = function () {
        nextImage(fullScreenImg);
    };

    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '<';
    prevBtn.style.position = 'absolute';
    prevBtn.style.left = '20px';
    prevBtn.style.fontSize = '2rem';
    prevBtn.style.background = 'none';
    prevBtn.style.color = 'white';
    prevBtn.style.border = 'none';
    prevBtn.style.cursor = 'pointer';
    prevBtn.onclick = function () {
        prevImage(fullScreenImg);
    };

    fullScreenDiv.appendChild(prevBtn);
    fullScreenDiv.appendChild(fullScreenImg);
    fullScreenDiv.appendChild(nextBtn);
    document.body.appendChild(fullScreenDiv);

    // Luk fuldskærmsvisning når man klikker uden for billedet
    fullScreenDiv.onclick = function (e) {
        if (e.target === fullScreenDiv) {
            document.body.removeChild(fullScreenDiv);
        }
    };

    // Tilføj tastaturkontrol
    document.onkeydown = function (e) {
        if (e.key === 'ArrowRight') {
            nextImage(fullScreenImg);
        } else if (e.key === 'ArrowLeft') {
            prevImage(fullScreenImg);
        } else if (e.key === 'Escape') {
            document.body.removeChild(fullScreenDiv);
        }
    };
}

function nextImage(imgElement) {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    imgElement.src = images[currentImageIndex].src;
}

function prevImage(imgElement) {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    imgElement.src = images[currentImageIndex].src;
}
