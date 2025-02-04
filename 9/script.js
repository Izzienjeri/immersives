const gameBoard = document.querySelector(".game-board");
const startButton = document.getElementById("start-game");
const player1ColorSelect = document.getElementById("player1-color");
const player2ColorSelect = document.getElementById("player2-color");

player1ColorSelect.style.backgroundColor = player1ColorSelect.value;
player2ColorSelect.style.backgroundColor = player2ColorSelect.value;

const gameStatus = document.createElement("div");
gameStatus.classList.add("game-status");
document.querySelector(".container").insertBefore(gameStatus, gameBoard);

function updateGameStatus() {
  const player1Name =
    document.getElementById("player1-name").value || "Player 1";
  const player2Name =
    document.getElementById("player2-name").value || "Player 2";
  const currentName = currentPlayer === 1 ? player1Name : player2Name;
  const currentColor =
    currentPlayer === 1 ? player1ColorSelect.value : player2ColorSelect.value;

  gameStatus.innerHTML = `
        <div class="current-player">
            <span class="player-name">${currentName}'s Turn</span>
            <div class="color-preview" style="background-color: ${currentColor}"></div>
        </div>
    `;
}

function checkDraw() {
  return board.every((row) => row.every((cell) => cell !== null));
}

player1ColorSelect.addEventListener("change", function () {
  this.style.backgroundColor = this.value;
});

player2ColorSelect.addEventListener("change", function () {
  this.style.backgroundColor = this.value;
});

let board = [];
let currentPlayer = 1;
let gameOver = false;

startButton.addEventListener("click", startGame);

function startGame() {
  const player1Name = document.getElementById("player1-name").value;
  const player2Name = document.getElementById("player2-name").value;
  const player1Color = player1ColorSelect.value;
  const player2Color = player2ColorSelect.value;

  if (player1Color === player2Color) {
    alert(
      "Players cannot have the same color! Please choose different colors."
    );
    return;
  }

  if (player1Name === "" || player2Name === "") {
    alert("Please enter names for both players!");
    return;
  }

  createBoard();
  renderBoard();
  updateGameStatus();
  gameOver = false;
  currentPlayer = 1;

  document.getElementById("start-game").innerText = "Restart Game";
  document.querySelectorAll(".game-message").forEach((msg) => msg.remove());
}

function createBoard() {
  board = [];
  for (let row = 0; row < 6; row++) {
    board[row] = new Array(7).fill(null);
  }
}

function renderBoard() {
  gameBoard.innerHTML = "";

  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      if (board[row][col] === 1) {
        cell.classList.add(player1ColorSelect.value);
      } else if (board[row][col] === 2) {
        cell.classList.add(player2ColorSelect.value);
      }

      cell.addEventListener("click", () => handleClick(row, col));
      gameBoard.appendChild(cell);
    }
  }
}

function handleClick(row, col) {
  if (gameOver) return;

  const dropRow = findEmptyRow(col);
  if (dropRow === null) {
    showMessage("This column is full. Try another one!", "warning");
    return;
  }

  board[dropRow][col] = currentPlayer;
  renderBoard();

  const winner = checkWinner();
  if (winner !== null) {
    gameOver = true;
    showMessage(`${winner} wins!`, "success");
    return;
  }

  if (checkDraw()) {
    gameOver = true;
    showMessage("Game ended in a draw!", "info");
    return;
  }

  switchPlayer();
  updateGameStatus();
}

function showMessage(message, type) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("game-message", type);
  messageDiv.textContent = message;

  const container = document.querySelector(".container");
  container.insertBefore(messageDiv, container.firstChild);

  setTimeout(() => {
    messageDiv.remove();
  }, 3000);
}

function switchPlayer() {
  currentPlayer = parseInt(currentPlayer, 10) === 1 ? 2 : 1;
}

function findEmptyRow(col) {
  for (let row = 5; row >= 0; row--) {
    if (board[row][col] === null) {
      return row;
    }
  }
  return null;
}

function checkWinner() {
  const player1Name = document.getElementById("player1-name").value;
  const player2Name = document.getElementById("player2-name").value;

  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 4; col++) {
      if (
        board[row][col] !== null &&
        board[row][col] === board[row][col + 1] &&
        board[row][col + 1] === board[row][col + 2] &&
        board[row][col + 2] === board[row][col + 3]
      ) {
        return board[row][col] === 1 ? player1Name : player2Name;
      }
    }
  }

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 7; col++) {
      if (
        board[row][col] !== null &&
        board[row][col] === board[row + 1][col] &&
        board[row + 1][col] === board[row + 2][col] &&
        board[row + 2][col] === board[row + 3][col]
      ) {
        return board[row][col] === 1 ? player1Name : player2Name;
      }
    }
  }

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      if (
        board[row][col] !== null &&
        board[row][col] === board[row + 1][col + 1] &&
        board[row + 1][col + 1] === board[row + 2][col + 2] &&
        board[row + 2][col + 2] === board[row + 3][col + 3]
      ) {
        return board[row][col] === 1 ? player1Name : player2Name;
      }
    }
  }

  for (let row = 3; row < 6; row++) {
    for (let col = 0; col < 4; col++) {
      if (
        board[row][col] !== null &&
        board[row][col] === board[row - 1][col + 1] &&
        board[row - 1][col + 1] === board[row - 2][col + 2] &&
        board[row - 2][col + 2] === board[row - 3][col + 3]
      ) {
        return board[row][col] === 1 ? player1Name : player2Name;
      }
    }
  }

  return null;
}
