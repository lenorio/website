let incorrectAttempts = 0;
let hintDisplayed = false; // Флаг, чтобы проверить, была ли уже показана подсказка

function showPasswordInput() {
    document.getElementById("password-input").classList.add("visible");
}

function checkPassword() {
    const password = document.getElementById("password").value;
    if (password === "lenorio") {
        // Создание элемента сообщения динамически после успешного ввода пароля
        const message = document.createElement("div");
        message.id = "message";
        message.classList.add("message", "visible");
        message.textContent = "Люблю Вику";
        
        // Добавление элемента сообщения в контейнер
        const container = document.querySelector(".container");
        container.appendChild(message);

        document.getElementById("start-btn").classList.add("hidden");
        document.getElementById("password-input").classList.remove("visible");
        document.getElementById("password-input").classList.add("hidden");
    } else {
        incorrectAttempts++;
        document.getElementById("error-message").classList.add("visible");

        if (incorrectAttempts >= 3 && !hintDisplayed) {
            const hint = document.createElement("p");
            hint.id = "hint";
            hint.classList.add("hint");
            hint.textContent = "За паролем напиши в телеграм @Lenorio_l_bot";
            hint.style.color = "#ff0000"; // Красный цвет текста для подсказки
            
            const passwordInput = document.getElementById("password-input");
            passwordInput.appendChild(hint);
            hintDisplayed = true; // Установить флаг, чтобы подсказка не появлялась снова
        }
    }
}

function getRandomPosition(rectangle, size) {
    const edge = Math.floor(Math.random() * 4);
    const max_x = rectangle.clientWidth - size;
    const max_y = rectangle.clientHeight - size;
    const offset = size * 2;

    switch (edge) {
        case 0:
            return { x: Math.floor(Math.random() * max_x), y: -offset };
        case 1:
            return { x: rectangle.clientWidth + offset, y: Math.floor(Math.random() * max_y) };
        case 2:
            return { x: Math.floor(Math.random() * max_x), y: rectangle.clientHeight + offset };
        case 3:
        default:
            return { x: -offset, y: Math.floor(Math.random() * max_y) };
    }
}

function getRandomRedShade() {
    const red = 255;
    const green = Math.floor(Math.random() * 100); // Небольшие значения зелёного
    const blue = Math.floor(Math.random() * 100);  // Небольшие значения синего
    const alpha = 0.8;
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function createRandomCircle(rectangleElement) {
    const rectangle = rectangleElement;
    const size = Math.floor(Math.random() * 200) + 100;
    const position = getRandomPosition(rectangle, size);
    const duration = 10 + Math.random() * 10;
    const finalPosition = getRandomPosition(rectangle, size);

    const circle = document.createElement("div");
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.left = `${position.x}px`;
    circle.style.top = `${position.y}px`;
    circle.style.backgroundColor = getRandomRedShade(); // Разные оттенки красного
    circle.style.position = "absolute";
    circle.style.borderRadius = "50%";
    circle.style.filter = "blur(50px)";
    circle.style.zIndex = "-1";

    const animation = circle.animate(
        [
            { left: `${position.x}px`, top: `${position.y}px` },
            { left: `${finalPosition.x}px`, top: `${finalPosition.y}px` },
        ],
        { duration: duration * 1000, iterations: 1, easing: "linear" }
    );

    animation.onfinish = () => {
        circle.remove();
        createRandomCircle(rectangleElement);
    };

    rectangle.appendChild(circle);
}

function createRandomCircles(rectangleElement) {
    const numberOfCircles = Math.floor(Math.random() * 30) + 15;

    for (let i = 0; i < numberOfCircles; i++) {
        createRandomCircle(rectangleElement);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const backgroundElement = document.querySelector(".background");
    createRandomCircles(backgroundElement);

    const cursorCircle = document.querySelector(".cursor-circle");
    document.addEventListener("mousemove", (e) => {
        cursorCircle.style.left = e.pageX + "px";
        cursorCircle.style.top = e.pageY + "px";
    });
});
