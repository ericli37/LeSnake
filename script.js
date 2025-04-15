document.getElementById('playButton').addEventListener('click', () => {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('settings').style.display = 'none';
    document.getElementById('game').style.display = 'block';
});
document.getElementById('settingsButton').addEventListener('click', () => {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('game').style.display = 'none';
    document.getElementById('settings').style.display = 'block';
});

document.getElementById('reset').addEventListener('click', () => {
    resetScore();
});

document.getElementById('back1').addEventListener('click', () => {
    back();
});
document.getElementById('back2').addEventListener('click', () => {
    back();
});

const playBoard = document.querySelector('.play-board');
const scoreElement = document.querySelector('.score');
const highScoreElement = document.querySelector('.high-score');
const controls = document.querySelectorAll('.controls i');

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let velocityX= 0, velocityY = 0;
let setIntervalId;
let score = 0;

let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

const changeFoodPosition = () => {
    let isOnSnake;
    do {
        isOnSnake = false;
        foodX = Math.floor(Math.random() * 30) + 1;
        foodY = Math.floor(Math.random() * 20) + 1;

        // Check if the food position overlaps with the snake's body
        for (let i = 0; i < snakeBody.length; i++) {
            if (snakeBody[i][0] === foodX && snakeBody[i][1] === foodY) {
                isOnSnake = true;
                break;
            }
        }
    } while (isOnSnake);
}

const resetScore = () => {
    score = 0;
    localStorage.setItem("high-score", 0);
    highScoreElement.innerText = `High Score: ${0}`;
}

const back = () => {
    document.getElementById('menu').style.display = 'block';
    document.getElementById('settings').style.display = 'none';
    document.getElementById('game').style.display = 'none';
    location.reload();
}

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over! Your score is ${snakeBody.length}");
    location.reload();
}

const changeDirection = (event) => {
    if (event.key === 'ArrowUp' && velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (event.key === 'ArrowDown' && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (event.key === 'ArrowLeft' && velocityX !== 1) {
        velocityX = -1
        velocityY = 0;
    } else if (event.key === 'ArrowRight' && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

controls.forEach(key => {
    key.addEventListener('click', () => changeDirection({key: key.dataset.key}));
});

const initGame = () => {
    if (gameOver) {
        return handleGameOver();
    }
    let htmlMarkup = `<div class ="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        snakeBody.push([foodX, foodY]);
        score++;

        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);


        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY];

    snakeX += velocityX;
    snakeY += velocityY;

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true;
    }
    
    for (let i = 0; i < snakeBody.length; i++){
        htmlMarkup += `<div class ="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }    
    playBoard.innerHTML = htmlMarkup;
}
changeFoodPosition();
setIntervalId = setInterval(initGame, 85);
document.addEventListener("keydown", changeDirection);