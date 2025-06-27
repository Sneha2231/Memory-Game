const board = document.getElementById('game-board');
const movesEl = document.getElementById('moves');
const matchesEl = document.getElementById('matches');
const victoryMessage = document.getElementById('victory-message');

let emojis = {
  easy: ['🐶', '🐱', '🐭'],
  medium: ['🐶', '🐱', '🐭', '🦊', '🐻', '🐼'],
  hard: ['🐶', '🐱', '🐭', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐷', '🐸', '🐵']
};

let gameCards = [], flipped = [], matched = [], moves = 0, difficulty = 'easy';

function shuffle(arr) {
  return [...arr, ...arr].sort(() => Math.random() - 0.5);
}

function setDifficulty(level) {
  difficulty = level;
  resetGame();
}

function resetGame() {
  const set = emojis[difficulty];
  gameCards = shuffle(set);
  flipped = [];
  matched = [];
  moves = 0;
  victoryMessage.style.display = 'none'; // Hide message on reset
  updateStats();
  renderCards();
}

function updateStats() {
  movesEl.textContent = moves;
  matchesEl.textContent = matched.length / 2;
}

function renderCards() {
  board.innerHTML = '';
  const cols = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 4 : 6;
  board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

  gameCards.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.index = index;
    card.textContent = flipped.includes(index) || matched.includes(index) ? emoji : '❓';
    card.addEventListener('click', () => flipCard(index));
    board.appendChild(card);
  });
}

function flipCard(index) {
  if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

  flipped.push(index);
  renderCards();

  if (flipped.length === 2) {
    const [i1, i2] = flipped;
    if (gameCards[i1] === gameCards[i2]) {
      matched.push(i1, i2);
    }
    moves++;
    setTimeout(() => {
      flipped = [];
      updateStats();
      renderCards();

      // ✅ Show victory message if all matched
      if (matched.length === gameCards.length) {
        victoryMessage.style.display = 'block';
      }
    }, 1000);
  }
}

setDifficulty('easy');
