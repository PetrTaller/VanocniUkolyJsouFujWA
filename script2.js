const canvas = document.getElementById('gridCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gridSize = 50;
const columns = Math.floor(canvas.width / gridSize);
const rows = Math.floor(canvas.height / gridSize);

const board = Array.from({ length: columns }, () => Array(rows).fill(null));

let drawCircle = true;

canvas.addEventListener('click', drawOnMouseClick);

function drawOnMouseClick(event) {
  const x = Math.floor((event.clientX - canvas.getBoundingClientRect().left) / gridSize);
  const y = Math.floor((event.clientY - canvas.getBoundingClientRect().top) / gridSize);

  if (!board[x][y]) {
    board[x][y] = drawCircle ? 'O' : 'X';
    drawMove(x, y, board[x][y]);

    if (checkForWin(x, y)) {
      alert(`Player ${drawCircle ? 'O' : 'X'} wins!`);
      resetGame();
    } else {
      drawCircle = !drawCircle;
    }
  }
}

function checkForWin(x, y) {
  const currentPlayer = board[x][y];

  if (
    checkLine(x, y, 1, 0) + checkLine(x, y, -1, 0) >= 3 ||
    checkLine(x, y, 1, 1) + checkLine(x, y, -1, -1) >= 3 ||
    checkLine(x, y, 1, -1) + checkLine(x, y, -1, 1) >= 3
  ) {
    return true;
  }

  if (checkLine(x, y, 0, 1) + checkLine(x, y, 0, -1) >= 3) {
    return true;
  }

  return false;
}

function checkLine(x, y, dx, dy) {
  const currentPlayer = board[x][y];
  let count = 0;

  for (let i = 1; i < 4; i++) {
    const nx = x + i * dx;
    const ny = y + i * dy;

    if (nx < 0 || nx >= columns || ny < 0 || ny >= rows || board[nx][ny] !== currentPlayer) {
      break;
    }

    count++;
  }

  return count;
}

function drawMove(x, y, type) {
  const centerX = x * gridSize + gridSize / 2;
  const centerY = y * gridSize + gridSize / 2;

  ctx.beginPath();
  if (type === 'O') {
    ctx.arc(centerX, centerY, gridSize / 3, 0, 2 * Math.PI);
    ctx.strokeStyle = 'blue';
  } else if (type === 'X') {
    ctx.moveTo(centerX - gridSize / 4, centerY - gridSize / 4);
    ctx.lineTo(centerX + gridSize / 4, centerY + gridSize / 4);
    ctx.moveTo(centerX + gridSize / 4, centerY - gridSize / 4);
    ctx.lineTo(centerX - gridSize / 4, centerY + gridSize / 4);
    ctx.strokeStyle = 'red';
  }
  ctx.stroke();
}

function resetGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  board.forEach((column, x) => column.fill(null));
  drawGrid();
}

function drawGrid() {
  ctx.strokeStyle = '#000';

  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      const x = i * gridSize;
      const y = j * gridSize;

      ctx.strokeRect(x, y, gridSize, gridSize);
    }
  }
}

drawGrid();