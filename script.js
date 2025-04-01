document.getElementById('playButton').addEventListener('click', () => {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('game').style.display = 'block';
});

const playBoard = document.getElementById('play-board');

let foodX = 13