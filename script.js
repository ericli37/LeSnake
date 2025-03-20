document.getElementById('playButton').addEventListener('click', () => {
    // Hide the menu and show the game screen
    document.getElementById('menu').style.display = 'none';
    document.getElementById('game').style.display = 'block';

    // Initialize the game
    startGame();
});

function startGame() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 400;
    canvas.height = 400;

    let snake = [{ x: 200, y: 200 }];
    let direction = { x: 0, y: 0 };
    let food = { x: 100, y: 100 };
    let score = 0;

    function drawSnake() {
        ctx.fillStyle = 'green';
        snake.forEach(segment => ctx.fillRect(segment.x, segment.y, 20, 20));
    }

    function drawFood() {
        ctx.fillStyle = 'red';
        ctx.fillRect(food.x, food.y, 20, 20);
    }

    function moveSnake() {
        const head = { x: snake[0].x + direction.x * 20, y: snake[0].y + direction.y * 20 };
        snake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
            score++;
            food = { x: Math.floor(Math.random() * 20) * 20, y: Math.floor(Math.random() * 20) * 20 };
        } else {
            snake.pop();
        }
    }

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawSnake();
        drawFood();
        moveSnake();
        setTimeout(gameLoop, 100);
    }

    document.addEventListener('keydown', event => {
        if (event.key === 'ArrowUp' && direction.y === 0) direction = { x: 0, y: -1 };
        if (event.key === 'ArrowDown' && direction.y === 0) direction = { x: 0, y: 1 };
        if (event.key === 'ArrowLeft' && direction.x === 0) direction = { x: -1, y: 0 };
        if (event.key === 'ArrowRight' && direction.x === 0) direction = { x: 1, y: 0 };
    });

    gameLoop();
}