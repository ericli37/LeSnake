document.getElementById('playButton').addEventListener('click', () => {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('game').style.display = 'block';
});

const playBoard = document.querySelector('.play-board');

let foodX, foodY;
let snakeX = 5, snakeY = 10;
let velocityX= 0, velocityY = 0;

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 20) + 1;
}

const changeDirection = (event) => {
    if (event.key === 'ArrowUp') {
        velocityX = 0;
        velocityY = -1;
    } else if (event.key === 'ArrowDown') {
        velocityX = 0;
        velocityY = 1;
    } else if (event.key === 'ArrowLeft') {
        velocityX =0-1
        velocityY = -1;
    } else if (event.key === 'ArrowRight') {
        velocityX = 0;
        velocityY = -1;
    }
    initGame();
}

const initGame = () => {
    let htmlMarkup = `<div class ="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    htmlMarkup += `<div class ="head" style="grid-area: ${snakeY} / ${snakeX}"></div>`;
    playBoard.innerHTML = htmlMarkup;
}
changeFoodPosition();
initGame();
document.addEventListener("keydown", changeDirection);