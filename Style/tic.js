const chooseContainer = document.getElementById('choose-container');
const gameContainer = document.getElementById('game-container');
const board = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const restartBtn = document.getElementById('restart-btn');
const clickSound = document.getElementById('click-sound');

let player = 'X';
let ai = 'O';
let turn = 'player';
let gameOver = false;
let boardState = Array(9).fill(null);

// اختيار X أو O
document.getElementById('choose-x').addEventListener('click', () => startGame('X'));
document.getElementById('choose-o').addEventListener('click', () => startGame('O'));

function startGame(choice) {
  player = choice;
  ai = player === 'X' ? 'O' : 'X';
  turn = player === 'X' ? 'player' : 'ai';
  chooseContainer.classList.add('hidden');
  gameContainer.classList.remove('hidden');
  boardState.fill(null);
  board.forEach(cell => cell.textContent = '');
  status.textContent = turn === 'player' ? 'ابدأي انتِ' : 'الذكاء بيبدأ!';
  gameOver = false;

  if (turn === 'ai') setTimeout(aiMove, 500);
}

// الضغط على الخانات
board.forEach((cell, idx) => {
  cell.addEventListener('click', () => {
    if (gameOver || turn !== 'player' || boardState[idx]) return;
    clickSound.currentTime = 0;
    clickSound.play();
    cell.textContent = player;
    boardState[idx] = player;
    checkWinner();
    if (!gameOver) {
      turn = 'ai';
      status.textContent = 'دور الذكاء';
      setTimeout(aiMove, 500);
    }
  });
});

// حركة AI ذكي متوازن
function aiMove() {
  const empty = boardState.map((v,i) => v===null? i: null).filter(v => v!==null);

  // نحدد هل AI يلعب ذكي أو عشوائي
  const smart = Math.random() < 0.5; // 50% فرصة يكون ذكي

  let move = null;
  if (smart) {
    // 1. يحاول الفوز
    move = findBestMove(ai);
    // 2. يمنع اللاعب
    if (move === null) move = findBestMove(player);
  }

  // 3. إذا لا شيء أو AI اختار عشوائي
  if (move === null) {
    if (empty.includes(4) && Math.random() < 0.7) move = 4; // أولوية للمركز أحيانًا
    else move = empty[Math.floor(Math.random() * empty.length)];
  }

  board[move].textContent = ai;
  boardState[move] = ai;
  checkWinner();
  if (!gameOver) {
    turn = 'player';
    status.textContent = 'دورك تلعبي';
  }
}

// يبحث عن خانة ممكن تكمل ثلاثة
function findBestMove(symbol) {
  const combos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (let [a,b,c] of combos) {
    const line = [boardState[a], boardState[b], boardState[c]];
    if (line.filter(x => x===symbol).length === 2 && line.includes(null)) {
      return [a,b,c][line.indexOf(null)];
    }
  }
  return null;
}

// التحقق من الفائز
function checkWinner() {
  const combos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (let [a,b,c] of combos) {
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      status.textContent = boardState[a] === player ? 'شطورة فزتي! 🎉' : 'ذكاء يفوز عليك ياسما!!! خسئتِ';
      gameOver = true;
      return;
    }
  }
  if (!boardState.includes(null)) {
    status.textContent = 'تعادل';
    gameOver = true;
  }
}

// إعادة اللعبة
restartBtn.addEventListener('click', () => {
  chooseContainer.classList.remove('hidden');
  gameContainer.classList.add('hidden');
});