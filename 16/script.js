const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
const startButton = document.getElementById("startButton");
const scoreDisplay = document.getElementById("score");
const gameOverMessage = document.getElementById("gameOverMessage");
const finalScoreDisplay = document.getElementById("finalScore");

const grid = 16;
const canvasSize = 400;
let count = 0;
let score = 0;
let isGameRunning = false;

const snake = {
  x: canvasSize / 2 - grid / 2,
  y: canvasSize / 2 - grid / 2,
  dx: grid,
  dy: 0,
  cells: [],
  maxCells: 1,
};

const food = { x: 0, y: 0 };

function spawnFood() {
  food.x = Math.floor(Math.random() * (canvasSize / grid)) * grid;
  food.y = Math.floor(Math.random() * (canvasSize / grid)) * grid;

  if (checkFoodSnakeCollision()) {
    spawnFood();
  }
}

function checkFoodSnakeCollision() {
  return snake.cells.some((cell) => cell.x === food.x && cell.y === food.y);
}

function drawFood() {
  context.fillStyle = "red";
  context.fillRect(food.x, food.y, grid - 1, grid - 1);
}

function checkWallCollision() {
  return (
    snake.x < 0 || snake.x >= canvasSize || snake.y < 0 || snake.y >= canvasSize
  );
}

function checkSnakeCollision() {
  for (let i = 1; i < snake.cells.length; i++) {
    if (snake.cells[i].x === snake.x && snake.cells[i].y === snake.y) {
      return true;
    }
  }
  return false;
}

function moveSnake() {
  snake.x += snake.dx;
  snake.y += snake.dy;

  if (checkWallCollision() || checkSnakeCollision()) {
    gameOver();
  }

  if (snake.x === food.x && snake.y === food.y) {
    snake.maxCells++;
    score += 10;
    scoreDisplay.textContent = score;
    spawnFood();
  }

  snake.cells.unshift({ x: snake.x, y: snake.y });

  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }
}

function drawSnake() {
  context.fillStyle = "green";
  snake.cells.forEach((cell) => {
    context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
  });
}

function gameOver() {
  isGameRunning = false;
  startButton.textContent = "Reset Game";
  finalScoreDisplay.textContent = score;
  gameOverMessage.style.display = "block";
  startButton.disabled = false;
}

function resetGame() {
  snake.x = canvasSize / 2 - grid / 2;
  snake.y = canvasSize / 2 - grid / 2;
  snake.dx = grid;
  snake.dy = 0;
  snake.cells = [];
  snake.maxCells = 1;
  score = 0;
  scoreDisplay.textContent = score;
  startButton.textContent = "Start Game";
  gameOverMessage.style.display = "none";
}

document.addEventListener("keydown", (e) => {
  if (e.key === "a" && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  } else if (e.key === "w" && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  } else if (e.key === "d" && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  } else if (e.key === "s" && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});

function gameLoop() {
  if (!isGameRunning) return;

  requestAnimationFrame(gameLoop);

  if (++count < 10) return;
  count = 0;

  context.clearRect(0, 0, canvasSize, canvasSize);
  moveSnake();
  drawSnake();
  drawFood();
}

startButton.addEventListener("click", () => {
  resetGame();
  if (!isGameRunning) {
    isGameRunning = true;
    startButton.disabled = true;
    spawnFood();
    requestAnimationFrame(gameLoop);
  }
});
