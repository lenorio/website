const flowers = ['🌹', '🌸', '🌼', '💐', '🌷', '❤️'];
const photoCount = 24;

function createFlower() {
    const flower = document.createElement('div');
    flower.classList.add('flower');
    flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];

    const size = Math.random() * 20 + 20;
    flower.style.fontSize = size + 'px';
    const offsetX = (Math.random() - 0.5) * 200;
    flower.style.left = `${(Math.random() - 0.5) * window.innerWidth + window.innerWidth / 2 + offsetX}px`;
    flower.style.bottom = '0px';
    flower.style.animationDuration = (Math.random() * 6 + 4) + 's';
    flower.style.position = 'absolute';

    document.querySelector('.flowers-container').appendChild(flower);

    setTimeout(() => { flower.remove(); }, 10000);
}

function createPhoto() {
    const photo = document.createElement('img');
    photo.classList.add('photo');
    photo.src = `8march/photo${Math.floor(Math.random() * photoCount) + 1}.jpg`;

    const size = (Math.random() * 50 + 50) * 3; // Увеличено в 3 раза
    photo.style.width = size + 'px';
    photo.style.height = 'auto';
    const offsetX = (Math.random() - 0.5) * 200;
    photo.style.left = `${(Math.random() - 0.5) * window.innerWidth + window.innerWidth / 2 + offsetX}px`;
    photo.style.bottom = '0px';
    photo.style.animationDuration = (Math.random() * 6 + 4) + 's';
    photo.style.position = 'absolute';

    document.querySelector('.flowers-container').appendChild(photo);

    setTimeout(() => { photo.remove(); }, 10000);
}

setInterval(createFlower, 125);
setInterval(createPhoto, 500);