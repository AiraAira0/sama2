const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');
const gameOverScreen = document.getElementById('game-over');
const finalScore = document.getElementById('final-score');
const restartBtn = document.getElementById('restart-btn');
const clickSound = document.getElementById('click-sound');

let score = 0;
let speedMultiplier = 1;
let gameInterval;
let gameOver = false;

function createStar() {
  if (gameOver) return;

  const star = document.createElement('div');
  star.classList.add('star');

  star.style.zIndex = Math.floor(Math.random() * 100 + 2);
  // حجم أكبر: 50-80px
  const size = Math.random() * 30 + 50;
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;

  star.style.left = `${Math.random() * (gameArea.clientWidth - size)}px`;

  const duration = (Math.random() * 2 + 3) / speedMultiplier;
  star.style.animationDuration = `${duration}s`;

  gameArea.appendChild(star);

  star.addEventListener('click', () => {
    if (gameOver) return;
    score++;
    scoreDisplay.textContent = score;
    speedMultiplier += 0.05;
    clickSound.currentTime = 0;
    clickSound.play();
    star.remove();
  });

  star.addEventListener('animationend', () => {
    if (!gameOver) endGame();
    star.remove();
  });
}

function startGame() {
  gameOver = false;
  gameOverScreen.classList.add('hidden');
  gameArea.innerHTML = '';
  score = 0;
  speedMultiplier = 1;
  scoreDisplay.textContent = score;
  gameInterval = setInterval(createStar, 800);
}


function endGame() {
  clearInterval(gameInterval);
  gameOver = true;
  finalScore.textContent = score;
  gameOverScreen.classList.remove('hidden');
}

restartBtn.addEventListener('click', startGame);

startGame();