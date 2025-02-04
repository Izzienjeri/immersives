let secretNumber = Math.floor(Math.random() * 100) + 1;
let totalGuesses = 10;
let remainingGuesses = totalGuesses;

document.getElementById("result").textContent =
  "You have " + totalGuesses + " guesses.";

guessInput = document.getElementById("guessInput");
guessButton = document.querySelector('button[onclick="checkGuess()"]');

function checkGuess() {
  let guess = parseInt(document.getElementById("guessInput").value);
  let result = document.getElementById("result");

  if (guess === secretNumber) {
    result.textContent = "Congratulations! You guessed it!";
    result.style.color = "green";
    restartGame();
  } else {
    remainingGuesses--;
    if (remainingGuesses === 0) {
      result.textContent = "Game Over! The number was " + secretNumber;
      result.style.color = "red";

      restartGame();
    } else {
      if (remainingGuesses > 0) {
        result.textContent = guess < secretNumber ? "Too low!" : "Too high!";
        result.textContent +=
          " You have " + remainingGuesses + " guesses left.";
      }
    }
  }
  guessInput.value = "";
}

function restartGame() {
  const restartButton = document.createElement("button");
  restartButton.textContent = "Restart";
  guessInput.style.display = "none";
  guessButton.style.display = "none";
  restartButton.addEventListener("click", () => {
    location.reload();
  });

  document.querySelector(".game-container").appendChild(restartButton);
}
