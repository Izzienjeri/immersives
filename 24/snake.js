const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let gameRunning = false;

const setCanvasSize = () => {
  canvas.width = Math.min(window.innerWidth * 0.9, 400);
  canvas.height = Math.min(window.innerHeight * 0.6, 400);
};
setCanvasSize();

const gridSize = canvas.width / 20;
let snake = [{ x: 10, y: 10 }];
let food = {};
let direction = "right";
let score = 0;
let gameOver = false;

const scoreboard = document.getElementById("scoreboard");
let gameInterval;

function generateFood() {
  food = {
    x: Math.floor(Math.random() * (canvas.width / gridSize)),
    y: Math.floor(Math.random() * (canvas.height / gridSize)),
  };
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "green" : "lime";
    ctx.fillRect(
      snake[i].x * gridSize,
      snake[i].y * gridSize,
      gridSize,
      gridSize
    );
  }

  ctx.fillStyle = "red";
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

function update() {
  if (gameOver) return;

  const head = { x: snake[0].x, y: snake[0].y };

  switch (direction) {
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "left":
      head.x--;
      break;
    case "right":
      head.x++;
      break;
  }

  if (
    head.x < 0 ||
    head.x >= canvas.width / gridSize ||
    head.y < 0 ||
    head.y >= canvas.height / gridSize ||
    checkCollision(head)
  ) {
    gameOver = true;
    document.getElementById("startButton").textContent = "Restart";
    clearInterval(gameInterval);
    alert("Game Over! Score: " + score);
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreboard.textContent = `Score: ${score}`;
    generateFood();
  } else {
    snake.pop();
  }

  draw();
}

function checkCollision(head) {
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

document.addEventListener("keydown", (e) => {
  if (gameRunning) {
    switch (e.key) {
      case "w":
        if (direction !== "down") direction = "up";
        break;
      case "s":
        if (direction !== "up") direction = "down";
        break;
      case "a":
        if (direction !== "right") direction = "left";
        break;
      case "d":
        if (direction !== "left") direction = "right";
        break;
    }
  }
});

document.getElementById("startButton").addEventListener("click", () => {
  if (gameInterval) clearInterval(gameInterval);
  document.getElementById("startButton").textContent = "Start Game";
  gameRunning = true;
  gameOver = false;
  snake = [{ x: 10, y: 10 }];
  direction = "right";
  score = 0;
  scoreboard.textContent = `Score: ${score}`;
  generateFood();
  gameInterval = setInterval(update, 200);
});

window.addEventListener("resize", () => {
  setCanvasSize();
  generateFood();
  draw();
});
