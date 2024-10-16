const canvas = document.getElementById('gameCanvas'); // Получаем элемент canvas
const ctx = canvas.getContext('2d'); // Получаем контекст для рисования
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

    // Рисуем змейку
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? 'green' : 'lightgreen'; // Цвет головы и тела
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = 'black'; // Обводка
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // Рисуем еду
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    // Двигаем змейку
    const headX = snake[0].x;
    const headY = snake[0].y;

    // Определяем новое положение головы змейки
    if (direction === 'LEFT') snake.unshift({ x: headX - box, y: headY });
    if (direction === 'UP') snake.unshift({ x: headX, y: headY - box });
    if (direction === 'RIGHT') snake.unshift({ x: headX + box, y: headY });
    if (direction === 'DOWN') snake.unshift({ x: headX, y: headY + box });

    // Проверяем, съела ли змейка еду
    if (snake[0].x === food.x && snake[0].y === food.y) {
        score++; // Увеличиваем счет
        document.getElementById('score').innerText = "Очки: " + score; // Обновляем очки
        food = spawnFood(); // Создаем новую еду
    } else {
        snake.pop(); // Удаляем последний элемент змейки
    }

    // Проверяем столкновение со стенами или с самой собой
    if (collision()) {
        clearInterval(game);
        alert('Игра окончена! Очки: ' + score);
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
function collision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) return true; // Удар о стену
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) return true; // Удар о саму себя
    }
    return false;
}

// Запуск игры
const game = setInterval(drawGame, 100); // Обновление игры каждые 100 мс
