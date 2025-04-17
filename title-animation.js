document.addEventListener('DOMContentLoaded', function() {
    const fullTitle = "Lenorio";
    const titleElement = document.getElementById('dynamic-title');
    let currentIndex = 0;
    let isGrowing = true;
    const speed = 200; // Скорость анимации (можно регулировать)

    function animateTitle() {
        titleElement.textContent = fullTitle.substring(0, currentIndex);
        
        if (isGrowing) {
            currentIndex++;
            if (currentIndex > fullTitle.length) {
                isGrowing = false;
                currentIndex = fullTitle.length - 1;
            }
        } else {
            currentIndex--;
            if (currentIndex < 1) {
                isGrowing = true;
                currentIndex = 1;
            }
        }

        setTimeout(animateTitle, speed);
    }

    // Начинаем с "L"
    titleElement.textContent = "L";
    setTimeout(animateTitle, 1000); // Задержка перед началом анимации
});