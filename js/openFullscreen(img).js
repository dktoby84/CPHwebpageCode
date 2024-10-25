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
        fullScreenMedia.style.maxWidth = '100%';
        fullScreenMedia.style.maxHeight = '100%';
    } else if (media.tagName === 'VIDEO') {
        fullScreenMedia = document.createElement('video');
        fullScreenMedia.src = media.src;
        fullScreenMedia.controls = true;
        fullScreenMedia.autoplay = true;
        fullScreenMedia.style.maxWidth = '100%';
        fullScreenMedia.style.maxHeight = '100%';
    }

    fullScreenDiv.appendChild(fullScreenMedia);

    // Create "Next" button
    const nextButton = document.createElement('button');
    nextButton.innerText = '>';
    nextButton.style.position = 'absolute';
    nextButton.style.right = '20px';
    nextButton.style.top = '50%';
    nextButton.style.transform = 'translateY(-50%)';
    nextButton.style.padding = '10px';
    nextButton.style.fontSize = '1.5em';
    nextButton.style.cursor = 'pointer';
    nextButton.onclick = () => nextMedia(fullScreenMedia);
    fullScreenDiv.appendChild(nextButton);

    // Create "Previous" button
    const prevButton = document.createElement('button');
    prevButton.innerText = '<';
    prevButton.style.position = 'absolute';
    prevButton.style.left = '20px';
    prevButton.style.top = '50%';
    prevButton.style.transform = 'translateY(-50%)';
    prevButton.style.padding = '10px';
    prevButton.style.fontSize = '1.5em';
    prevButton.style.cursor = 'pointer';
    prevButton.onclick = () => prevMedia(fullScreenMedia);
    fullScreenDiv.appendChild(prevButton);

    document.body.appendChild(fullScreenDiv);

    fullScreenDiv.onclick = function (e) {
        if (e.target === fullScreenDiv) {
            document.body.removeChild(fullScreenDiv);
        }
    };

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
        newVideo.style.maxWidth = '100%';
        newVideo.style.maxHeight = '100%';
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
        newVideo.style.maxWidth = '100%';
        newVideo.style.maxHeight = '100%';
        mediaElement.replaceWith(newVideo);
    }
}