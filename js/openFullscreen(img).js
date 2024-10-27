let currentMediaIndex = 0;
let mediaElements = [];

function openFullscreen(media) {
    if (media.id === 'bgVideo' || media.classList.contains('exclude-icon')) {
        return;
    }

    const mediaList = document.querySelectorAll('img:not(.exclude-icon), video:not(#bgVideo)');
    mediaElements = Array.from(mediaList);
    currentMediaIndex = mediaElements.indexOf(media);

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

    let fullScreenMedia;
    if (media.tagName === 'IMG') {
        fullScreenMedia = document.createElement('img');
        fullScreenMedia.src = media.src;
        fullScreenMedia.style.width = '100%';
        fullScreenMedia.style.height = '100%';
        fullScreenMedia.style.objectFit = 'contain';
    } else if (media.tagName === 'VIDEO') {
        fullScreenMedia = document.createElement('video');
        fullScreenMedia.src = media.src;
        fullScreenMedia.controls = true;
        fullScreenMedia.autoplay = true;
        fullScreenMedia.style.width = '100%';
        fullScreenMedia.style.height = '100%';
        fullScreenMedia.style.objectFit = 'contain';
    }

    fullScreenDiv.appendChild(fullScreenMedia);

    
    const nextButton = document.createElement('button');
    nextButton.innerText = '>';
    nextButton.style.position = 'absolute';
    nextButton.style.right = '20px';
    nextButton.style.top = '50%';
    nextButton.style.transform = 'translateY(-50%)';
    nextButton.style.padding = '10px';
    nextButton.style.fontSize = '2em';
    nextButton.style.cursor = 'pointer';
    nextButton.style.color = '#ff4500';
    nextButton.style.backgroundColor = 'transparent';
    nextButton.style.border = 'none';
    nextButton.onclick = () => nextMedia(fullScreenMedia);
    fullScreenDiv.appendChild(nextButton);

    
    const prevButton = document.createElement('button');
    prevButton.innerText = '<';
    prevButton.style.position = 'absolute';
    prevButton.style.left = '20px';
    prevButton.style.top = '50%';
    prevButton.style.transform = 'translateY(-50%)';
    prevButton.style.padding = '10px';
    prevButton.style.fontSize = '2em';
    prevButton.style.cursor = 'pointer';
    prevButton.style.color = '#ff4500';
    prevButton.style.backgroundColor = 'transparent';
    prevButton.style.border = 'none';
    prevButton.onclick = () => prevMedia(fullScreenMedia);
    fullScreenDiv.appendChild(prevButton);

    
    const closeButton = document.createElement('button');
    closeButton.innerText = 'X';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '20px';
    closeButton.style.right = '20px';
    closeButton.style.padding = '5px 10px';
    closeButton.style.fontSize = '1.5em';
    closeButton.style.cursor = 'pointer';
    closeButton.style.color = '#ff4500';
    closeButton.style.backgroundColor = 'transparent';
    closeButton.style.border = 'none';
    closeButton.onclick = () => document.body.removeChild(fullScreenDiv);
    fullScreenDiv.appendChild(closeButton);

    document.body.appendChild(fullScreenDiv);

    document.onkeydown = function (e) {
        if (e.key === 'ArrowRight') {
            nextMedia(fullScreenMedia);
        } else if (e.key === 'ArrowLeft') {
            prevMedia(fullScreenMedia);
        } else if (e.key === 'Escape') {
            document.body.removeChild(fullScreenDiv);
        }
    };
}

function nextMedia(mediaElement) {
    currentMediaIndex = (currentMediaIndex + 1) % mediaElements.length;
    const nextMedia = mediaElements[currentMediaIndex];

    if (nextMedia.tagName === 'IMG') {
        mediaElement.src = nextMedia.src;
        if (mediaElement.tagName === 'VIDEO') mediaElement.pause();
    } else if (nextMedia.tagName === 'VIDEO') {
        const newVideo = document.createElement('video');
        newVideo.src = nextMedia.src;
        newVideo.controls = true;
        newVideo.autoplay = true;
        newVideo.style.width = '100%';
        newVideo.style.height = '100%';
        mediaElement.replaceWith(newVideo);
    }
}

function prevMedia(mediaElement) {
    currentMediaIndex = (currentMediaIndex - 1 + mediaElements.length) % mediaElements.length;
    const prevMedia = mediaElements[currentMediaIndex];

    if (prevMedia.tagName === 'IMG') {
        mediaElement.src = prevMedia.src;
        if (mediaElement.tagName === 'VIDEO') mediaElement.pause();
    } else if (prevMedia.tagName === 'VIDEO') {
        const newVideo = document.createElement('video');
        newVideo.src = prevMedia.src;
        newVideo.controls = true;
        newVideo.autoplay = true;
        newVideo.style.width = '100%';
        newVideo.style.height = '100%';
        mediaElement.replaceWith(newVideo);
    }
}