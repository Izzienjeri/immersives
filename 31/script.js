const doors = document.querySelectorAll(".door");
const resetButton = document.getElementById("resetButton");
const winsSpan = document.getElementById("wins");
const lossesSpan = document.getElementById("losses");
const messageElement = document.createElement("p");
document.body.insertBefore(messageElement, resetButton);
let wins = 0;
let losses = 0;
let selectedDoor = null;
let openedDoor = null;
let carDoor = null;
let gameState = "initial";
function initializeGame() {
  doors.forEach((door) => {
    door.classList.remove("selected", "open", "disabled");
    door.textContent = "";
  });
  carDoor = Math.floor(Math.random() * 3);
  winsSpan.textContent = wins;
  lossesSpan.textContent = losses;
  selectedDoor = null;
  openedDoor = null;
  messageElement.textContent = "Select a door to start the game!";
  gameState = "initial";
  doors.forEach((door) => door.classList.remove("disabled"));
  resetButton.textContent = "End Game";
}

function chooseDoor(doorNumber) {
  if (gameState === "initial") {
    firstPick(doorNumber);
  } else if (gameState === "firstPick") {
    secondPick(doorNumber);
  }
}

function firstPick(doorNumber) {
  selectedDoor = doorNumber;
  doors[selectedDoor].classList.add("selected");
  revealGoat();
  gameState = "firstPick";
  messageElement.textContent =
    "A goat has been revealed. Would you like to stay with your choice or switch to the other closed door?";
}

function secondPick(doorNumber) {
  if (doorNumber !== openedDoor) {
    doors[selectedDoor].classList.remove("selected");
    selectedDoor = doorNumber;
    doors[selectedDoor].classList.add("selected");
    revealResult();
    gameState = "finished";
    doors.forEach((door) => door.classList.add("disabled"));
    setTimeout(() => {
      if (selectedDoor === carDoor) {
        wins++;
        messageElement.textContent =
          "Congratulations! You won! The car was behind door " +
          (carDoor + 1) +
          ".";
      } else {
        losses++;
        messageElement.textContent =
          "Sorry, you lost. The car was behind door " + (carDoor + 1) + ".";
      }
      winsSpan.textContent = wins;
      lossesSpan.textContent = losses;
      setTimeout(() => {
        initializeGame();
      }, 2000);
    }, 1000);
  }
}

function revealGoat() {
  let goatDoor = Math.floor(Math.random() * 3);
  while (goatDoor === selectedDoor || goatDoor === carDoor) {
    goatDoor = Math.floor(Math.random() * 3);
  }
  doors[goatDoor].classList.add("open");
  doors[goatDoor].textContent = "🐐";
  openedDoor = goatDoor;
}

function revealResult() {
  doors.forEach((door, index) => {
    door.classList.add("open");
    if (index === carDoor) {
      door.textContent = "🚗";
    } else if (index !== openedDoor) {
      door.textContent = "🐐";
    }
  });
}

function endGame() {
  messageElement.textContent = `Game ended. Final score - Wins: ${wins}, Losses: ${losses}`;
  doors.forEach((door) => door.classList.add("disabled"));
  resetButton.textContent = "Start New Game";
  gameState = "ended";
}

doors.forEach((door, index) => {
  door.addEventListener("click", () => {
    if (!door.classList.contains("disabled")) {
      chooseDoor(index);
    }
  });
});

resetButton.addEventListener("click", () => {
  if (gameState === "ended") {
    wins = 0;
    losses = 0;
    initializeGame();
  } else {
    if (confirm("Are you sure you want to end the game?")) {
      endGame();
    }
  }
});

initializeGame();
