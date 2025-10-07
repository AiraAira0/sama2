const gameArea = document.getElementById('memory-game');
const movesDisplay = document.getElementById('moves');
const message = document.getElementById('message');
let moves = 0;

const images = ['skz.jpg','skz1.jpg','skz2.jpg','skz3.jpg','skz4.jpg','skz5.jpg','skz6.jpg','skz7.jpg'];
const cardImages = [...images, ...images];
shuffleArray(cardImages);

let firstCard = null;
let secondCard = null;

function createCards() {
  gameArea.innerHTML = '';
  cardImages.forEach(img => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front"></div>
        <div class="card-back" style="background-image: url('../images/${img}')"></div>
      </div>
    `;
    gameArea.appendChild(card);
  });

  const allCards = document.querySelectorAll('.card');

  // أولاً: نخلي كل الكروت مقلوبة عشان الصور تظهر
  allCards.forEach(card => card.classList.add('flipped'));

  // بعد ثانيتين تنقلب وترجع للوضع الطبيعي
  setTimeout(() => {
    allCards.forEach(card => card.classList.remove('flipped'));
    allCards.forEach(card => card.addEventListener('click', () => flipCard(card)));
  }, 2000);
}

function flipCard(card) {
  if (card.classList.contains('flipped') || secondCard) return;

  card.classList.add('flipped');

  if (!firstCard) {
    firstCard = card;
  } else {
    secondCard = card;
    moves++;
    movesDisplay.textContent = moves;
    checkMatch();
  }
}

function checkMatch() {
  const firstImg = firstCard.querySelector('.card-back').style.backgroundImage;
  const secondImg = secondCard.querySelector('.card-back').style.backgroundImage;

  if (firstImg === secondImg) {
    firstCard = null;
    secondCard = null;
    checkWin();
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      firstCard = null;
      secondCard = null;
    }, 900);
  }
}

function shuffleArray(array) {
  for (let i = array.length -1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i +1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function checkWin() {
  const allFlipped = document.querySelectorAll('.card.flipped');
  if (allFlipped.length === cardImages.length) {
    message.textContent = `شطورة فزتي بـ ${moves}! حركة `;
    message.classList.add('show');

    setTimeout(() => {
      message.classList.remove('show');
      resetGame();
    }, 2000);
  }
}

function resetGame() {
  moves = 0;
  movesDisplay.textContent = moves;
  firstCard = null;
  secondCard = null;
  shuffleArray(cardImages);
  createCards();
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('back-btn').addEventListener('click', () => {
    window.location.href = "../nav/games zone.html";
  });

  document.getElementById('restart-btn').addEventListener('click', resetGame);

  createCards();
});