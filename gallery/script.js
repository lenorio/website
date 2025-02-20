window.onload = function () {
    const galleryContainer = document.querySelector('.gallery-container');
    const overlayBox = document.querySelector('.overlay-box');
    let isEnterPressed = false;  // Флаг для блокировки фото до нажатия ENTER

    function loadImages() {
        const galleryFolder = './gallery';
        const images = Array.from({ length: 50 }, (_, i) => `image${i + 1}.jpg`); // 50 фото

        const rows = 5; // Количество рядов
        const imagesPerRow = 10; // Количество фото в ряду

        for (let i = 0; i < rows; i++) {
            const row = document.createElement('div');
            row.classList.add('row');

            // Берем нужные фото для ряда
            const rowImages = images.slice(i * imagesPerRow, (i + 1) * imagesPerRow);
            const fullRowImages = [...rowImages, ...rowImages]; // Дублирование для плавного движения

            fullRowImages.forEach(imgName => {
                const imgElement = document.createElement('img');
                imgElement.src = `${galleryFolder}/${imgName}`;
                imgElement.alt = imgName;

                // Добавляем класс для кликабельности, если ENTER был нажато
                if (isEnterPressed) {
                    imgElement.classList.add('clickable');
                } else {
                    imgElement.classList.remove('clickable');
                }

                imgElement.addEventListener('click', () => openFullscreen(imgElement.src));
                row.appendChild(imgElement);
            });

            row.style.animationDuration = `${15 + i * 2}s`; // Разная скорость для естественного вида
            if (i % 2 === 1) {
                row.style.animationDirection = 'reverse';
            }

            galleryContainer.appendChild(row);
        }
    }

    function openFullscreen(src) {
        const fullscreenContainer = document.createElement('div');
        fullscreenContainer.classList.add('fullscreen-container');

        const fullscreenImg = document.createElement('img');
        fullscreenImg.src = src;
        fullscreenImg.classList.add('fullscreen');

        fullscreenContainer.appendChild(fullscreenImg);
        document.body.appendChild(fullscreenContainer);

        // Закрытие при клике вне изображения или по ESC
        fullscreenContainer.addEventListener('click', (e) => {
            if (e.target === fullscreenContainer) closeFullscreen();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeFullscreen();
        });
    }

    function closeFullscreen() {
        document.querySelector('.fullscreen-container')?.remove();
    }

    // Эффект наклона плашки при движении курсора
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 20;
        const y = (window.innerHeight / 2 - e.pageY) / 20;
        overlayBox.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    });

    // Скрытие плашки при клике
    overlayBox.addEventListener('click', () => {
        if (overlayBox.classList.contains('hidden')) {
            overlayBox.classList.remove('hidden');
        } else {
            overlayBox.classList.add('hidden');
        }
    });

    // Включаем возможность клика по фото, когда нажимаем ENTER
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            isEnterPressed = true; // Разрешаем кликать по фото
            loadImages(); // Перезагружаем изображения, чтобы они стали кликабельными
        }
    });

    loadImages();
};
