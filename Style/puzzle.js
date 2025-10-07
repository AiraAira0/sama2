function goBack(){ window.location.href='games zone.html'; }

const container = document.querySelector('.puzzle-container');
const message = document.getElementById('message');
const shuffleBtn = document.getElementById('shuffleBtn');
const nextBtn = document.getElementById('nextBtn');

const rows = 4;
const cols = 4;
let pieces = [];
const imageUrl = '../images/US1.jpg'; // حطي هنا رابط صورتك

// توليد القطع وتقسيم الصورة
for (let i = 0; i < rows * cols; i++) {
  const piece = document.createElement('div');
  piece.classList.add('puzzle-piece');

  const row = Math.floor(i / cols);
  const col = i % cols;

  piece.style.backgroundImage = `url(${imageUrl})`;
  piece.style.backgroundSize = `${cols * 100}% ${rows * 100}%`;
  piece.style.backgroundPosition = `${(col / (cols - 1)) * 100}% ${(row / (rows - 1)) * 100}%`;

  piece.dataset.correctIndex = i; 
  pieces.push(piece);
}

function renderPuzzle(shuffle = true) {
  container.innerHTML = "";
  let newPieces = [...pieces];
  if (shuffle) newPieces.sort(() => Math.random() - 0.5);
  newPieces.forEach(p => container.appendChild(p));
}
renderPuzzle();

// منطق تبديل القطع
let selected = null;

container.addEventListener('click', e => {
  if (!e.target.classList.contains('puzzle-piece')) return;
  
  if (!selected) {
    selected = e.target;
    selected.classList.add('selected');
  } else {
    const first = selected;
    const second = e.target;

    if (first !== second) {
      const firstNext = first.nextSibling;
      const secondNext = second.nextSibling;
      const parent = first.parentNode;

      parent.insertBefore(first, secondNext);
      parent.insertBefore(second, firstNext);
    }

    first.classList.remove('selected');
    selected = null;

    checkWin();
  }
});

// التحقق من الفوز
function checkWin() {
  const current = [...container.children];
  const correct = current.every((piece, index) => piece.dataset.correctIndex == index);

  if (correct) {
    message.innerHTML = "👉🏻👈🏻✨ذول انا وانتِ برأسي";
  }
}

// زر إعادة الخلط
shuffleBtn.addEventListener('click', () => {
  message.textContent = "";
  renderPuzzle(true);
});

// زر الانتقال للصفحة التال