const html = document.documentElement;
const canvas = document.querySelector('.myview-scrolling');
const context = canvas.getContext('2d');
const overlay = document.querySelector('.overlay');
const message = document.querySelector('.message');
const content = document.querySelector('.content');

const currentFrame = index => (
    `https://gi.esmplus.com/BLADER01/Hyukki%20Lee/1-ywqklrabashlblbwwoln/${index.toString().padStart(0, '0')}.jpg`
);

// 프레임 수= 사진 수
const frameCount = 101;

// set canvas dimensions
canvas.height = 770;
canvas.width = 1158;

const images = [];

// Preload images
const preloadImages = () => {
    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        images.push(img);
    }
};

preloadImages();

// Create, load, and draw the image
const img = new Image();
img.src = currentFrame(1);
img.onload = function () {
    drawCentered(img);
}

const updateImage = index => {
    // Clear the previous image
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the new image
    drawCentered(images[index]);
};

function drawCentered(img) {
    const offsetX = (canvas.width - img.width) / 2;
    const offsetY = (canvas.height - img.height) / 2;
    context.drawImage(img, offsetX, offsetY);
}

let animationFrameId;

window.addEventListener('scroll', () => {
    cancelAnimationFrame(animationFrameId);

    const scrollTop = html.scrollTop;
    const maxScrollTop = html.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;
    const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
    );

    animationFrameId = requestAnimationFrame(() => updateImage(frameIndex));

    if (frameIndex === frameCount - 1) {
        canvas.style.transition = 'opacity 1s ease-in-out';
        canvas.style.opacity = '0';
        overlay.classList.add('visible');
        message.classList.add('visible');
        content.classList.add('visible');
    } else {
        canvas.style.opacity = '1';
        overlay.classList.remove('visible');
        message.classList.remove('visible');
        content.classList.remove('visible');
    }
});
