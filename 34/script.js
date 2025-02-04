let timerInterval;
let timeRemaining;
let initialDuration;
let isPaused = false;

const startButton = document.getElementById("start-timer");
const stopTimerButton = document.getElementById("stop-timer");
const restartButton = document.getElementById("restart-timer");
const backButton = document.getElementById("back-button");
const labelDisplay = document.getElementById("label-display");

startButton.addEventListener("click", startTimer);
stopTimerButton.addEventListener("click", togglePauseResume);
restartButton.addEventListener("click", restartTimer);
backButton.addEventListener("click", backToInput);

function startTimer() {
  const durationInput = document.getElementById("timer-duration");
  const labelInput = document.getElementById("timer-label");

  timeRemaining = parseInt(durationInput.value);
  if (!timeRemaining || timeRemaining <= 0) {
    alert("Please enter a valid time!");
    return;
  }

  initialDuration = timeRemaining;

  document.getElementById("input-section").classList.add("hidden");
  document.getElementById("timer-section").classList.remove("hidden");
  labelDisplay.classList.add("hidden");
  updateTimerDisplay();

  stopTimerButton.disabled = false;
  stopTimerButton.textContent = "Stop";

  isPaused = false;

  clearInterval(timerInterval);
  timerInterval = setInterval(countdown, 1000);
}

function togglePauseResume() {
  if (isPaused) {
    isPaused = false;
    stopTimerButton.textContent = "Stop";
  } else {
    isPaused = true;
    stopTimerButton.textContent = "Start";
  }
}

function countdown() {
  if (!isPaused && timeRemaining > 0) {
    timeRemaining--;
    updateTimerDisplay();

    if (timeRemaining === 0) {
      clearInterval(timerInterval);
      stopTimerButton.disabled = true;
      labelDisplay.classList.remove("hidden");
      labelDisplay.textContent =
        document.getElementById("timer-label").value || "Finished!";
    }
  }
}

function restartTimer() {
  clearInterval(timerInterval);
  isPaused = false;
  timeRemaining = initialDuration;
  labelDisplay.classList.add("hidden");
  labelDisplay.textContent = "";
  updateTimerDisplay();
  stopTimerButton.textContent = "Stop";
  stopTimerButton.disabled = false;

  timerInterval = setInterval(countdown, 1000);
}

function backToInput() {
  clearInterval(timerInterval);
  timeRemaining = null;
  initialDuration = null;
  isPaused = false;
  stopTimerButton.textContent = "Stop";
  stopTimerButton.disabled = true;

  document.getElementById("input-section").classList.remove("hidden");
  document.getElementById("timer-section").classList.add("hidden");

  document.getElementById("timer-duration").value = "";
  document.getElementById("timer-label").value = "";

  labelDisplay.classList.add("hidden");
  labelDisplay.textContent = "";

  updateTimerDisplay();
}

function updateTimerDisplay() {
  const minutes = Math.floor((timeRemaining || 0) / 60);
  const seconds = (timeRemaining || 0) % 60;
  document.getElementById("timer-time").textContent = `${pad(minutes)}:${pad(
    seconds
  )}`;
}

function pad(number) {
  return number < 10 ? `0${number}` : number;
}
