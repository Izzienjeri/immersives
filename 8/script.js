let secretNumber = Math.floor(Math.random() * 100) + 1;
let guessInput = document.getElementById("guessInput");
let checkGuessButton = document.getElementById("checkGuess");
let guessesLeft = document.getElementById("guessesLeft");
let result = document.getElementById("result");
let resultContainer = document.getElementById("resultContainer");
let alertContainer = document.getElementById("alert");
let remainingGuesses = 10;

function checkGuess() {
  let guess = parseInt(document.getElementById("guessInput").value);

  if (guess === secretNumber) {
    resultContainer.hidden = false;
    alertContainer.classList.remove("alert-info");
    alertContainer.classList.add("alert-success");
    result.innerHTML = `
        <h4 class="alert-heading">Congratulations!</h4>
        <p>You guessed it!</p>`;
    disableGame();
  } else {
    remainingGuesses--;
    guessesLeft.textContent = `Remaining Guesses: ${remainingGuesses}`;

    if (remainingGuesses == 0) {
      resultContainer.hidden = false;
      alertContainer.classList.remove("alert-info");
      alertContainer.classList.add("alert-danger");
      result.innerHTML = `
            <h4 class="alert-heading">Game Over!</h4>
            <p>The number was ${secretNumber}</p>`;
      disableGame();
    } else {
      resultContainer.hidden = false;
      result.textContent = guess < secretNumber ? "Too low!" : "Too high!";
      guessInput.value = "";
      guessInput.focus();
    }
  }
}

function disableGame() {
  guessInput.disabled = true;
  checkGuessButton.disabled = true;
}
