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
        fullScreenMedia.style.maxWidth = '90%';
        fullScreenMedia.style.maxHeight = '90%';
    } else if (media.tagName === 'VIDEO') {
        fullScreenMedia = document.createElement('video');
        fullScreenMedia.src = media.src;
        fullScreenMedia.controls = true;
        fullScreenMedia.autoplay = true;
        fullScreenMedia.style.maxWidth = '90%';
        fullScreenMedia.style.maxHeight = '90%';
    }

    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '>';
    nextBtn.style.position = 'absolute';
    nextBtn.style.right = '20px';
    nextBtn.style.fontSize = '2rem';
    nextBtn.style.background = 'none';
    nextBtn.style.color = '#ff4500';
    nextBtn.style.border = 'none';
    nextBtn.style.cursor = 'pointer';
    nextBtn.onclick = function () {
        nextMedia(fullScreenMedia);
    };

    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '<';
    prevBtn.style.position = 'absolute';
    prevBtn.style.left = '20px';
    prevBtn.style.fontSize = '2rem';
    prevBtn.style.background = 'none';
    prevBtn.style.color = '#ff4500';
    prevBtn.style.border = 'none';
    prevBtn.style.cursor = 'pointer';
    prevBtn.onclick = function () {
        prevMedia(fullScreenMedia);
    };

    fullScreenDiv.appendChild(prevBtn);
    fullScreenDiv.appendChild(fullScreenMedia);
    fullScreenDiv.appendChild(nextBtn);
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
        mediaElement.tagName === 'VIDEO' && mediaElement.pause();
    } else if (nextMedia.tagName === 'VIDEO') {
        const newVideo = document.createElement('video');
        newVideo.src = nextMedia.src;
        newVideo.controls = true;
        newVideo.autoplay = true;
        mediaElement.replaceWith(newVideo);
    }
}

function prevMedia(mediaElement) {
    currentMediaIndex = (currentMediaIndex - 1 + mediaElements.length) % mediaElements.length;
    const prevMedia = mediaElements[currentMediaIndex];

    if (prevMedia.tagName === 'IMG') {
        mediaElement.src = prevMedia.src;
        mediaElement.tagName === 'VIDEO' && mediaElement.pause();
    } else if (prevMedia.tagName === 'VIDEO') {
        const newVideo = document.createElement('video');
        newVideo.src = prevMedia.src;
        newVideo.controls = true;
        newVideo.autoplay = true;
        mediaElement.replaceWith(newVideo);
    }
}