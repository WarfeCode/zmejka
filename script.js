const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const box = 20; // Размер одной клетки
let score = 0; // Очки
let snake = [{ x: box * 5, y: box * 5 }]; // Начальная позиция змейки
let direction = 'RIGHT'; // Начальное направление
let food = spawnFood(); // Создаем первую еду

// Установка обработчика событий на нажатие клавиш
document.addEventListener('keydown', changeDirection);

// Функция отрисовки игры
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Очистка экрана
    drawSnake();
    drawFood();
    moveSnake();
    if (checkCollision()) {
        endGame();
    }
}

// Функция рисования змейки
function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? 'green' : 'lightgreen'; // Цвет головы и тела
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = 'black'; // Обводка
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
}

// Функция рисования еды
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);
}

// Функция передвижения змейки
function moveSnake() {
    const headX = snake[0].x;
    const headY = snake[0].y;
    let newHead;

    if (direction === 'LEFT') newHead = { x: headX - box, y: headY };
    if (direction === 'UP') newHead = { x: headX, y: headY - box };
    if (direction === 'RIGHT') newHead = { x: headX + box, y: headY };
    if (direction === 'DOWN') newHead = { x: headX, y: headY + box };

    snake.unshift(newHead); // Добавляем новую голову змейки

    // Проверяем, съела ли змейка еду
    if (newHead.x === food.x && newHead.y === food.y) {
        score++; // Увеличиваем счет
        document.getElementById('score').innerText = "Очки: " + score; // Обновляем очки
        food = spawnFood(); // Создаем новую еду
    } else {
        snake.pop(); // Удаляем последний элемент змейки
    }
}

// Функция для создания еды
function spawnFood() {
    const foodX = Math.floor(Math.random() * (canvas.width / box)) * box;
    const foodY = Math.floor(Math.random() * (canvas.height / box)) * box;
    return { x: foodX, y: foodY };
}

// Функция для изменения направления змейки
function changeDirection(event) {
    if (event.keyCode === 37 && direction !== 'RIGHT') direction = 'LEFT'; // Влево
    if (event.keyCode === 38 && direction !== 'DOWN') direction = 'UP'; // Вверх
    if (event.keyCode === 39 && direction !== 'LEFT') direction = 'RIGHT'; // Вправо
    if (event.keyCode === 40 && direction !== 'UP') direction = 'DOWN'; // Вниз
}

// Функция проверки столкновения
function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) return true; // Удар о стену
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) return true; // Удар о саму себя
    }
    return false;
}

// Функция окончания игры
function endGame() {
    clearInterval(game);
    alert('Игра окончена! Очки: ' + score);
}

// Запуск игры
const game = setInterval(drawGame, 100); // Обновление игры каждые 100 мс
