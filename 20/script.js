document.addEventListener("DOMContentLoaded", () => {
  const timerLabelInput = document.getElementById("timer-label");
  const timerDurationInput = document.getElementById("timer-duration");
  const addTimerButton = document.getElementById("add-timer");
  const timersContainer = document.getElementById("timers-container");

  let timers = [];

  addTimerButton.addEventListener("click", () => {
    const label = timerLabelInput.value.trim();
    const duration = parseInt(timerDurationInput.value);

    if (label && !isNaN(duration) && duration > 0) {
      const timer = createTimer(label, duration);
      timers.push(timer);
      timersContainer.appendChild(timer.element);
      timerLabelInput.value = "";
      timerDurationInput.value = "";
    } else {
      alert("Please enter a valid label and duration.");
    }
  });

  function createTimer(label, duration) {
    let remainingTime = duration;
    let timerInterval;
    let isRunning = false;
    let hasEnded = false;

    const timerCard = document.createElement("div");
    timerCard.classList.add("timer-card");
    timerCard.innerHTML = `
                <div class="timer-label">${label}</div>
                <div class="timer-display">${formatTime(remainingTime)}</div>
                <div class="timer-controls">
                    <button class="start">Start</button>
                    <button class="stop" disabled>Stop</button>
                    <button class="restart" disabled>Restart</button>
                 </div>
            `;

    const display = timerCard.querySelector(".timer-display");
    const startButton = timerCard.querySelector(".start");
    const stopButton = timerCard.querySelector(".stop");
    const restartButton = timerCard.querySelector(".restart");

    const updateDisplay = () => {
      display.textContent = formatTime(remainingTime);
    };

    const updateButtonState = () => {
      startButton.disabled = isRunning || hasEnded;
      stopButton.disabled = !isRunning;
      restartButton.disabled = !(
        hasEnded ||
        (!isRunning && remainingTime < duration)
      );
    };

    const startTimer = () => {
      if (!isRunning) {
        isRunning = true;
        hasEnded = false;
        updateButtonState();
        timerInterval = setInterval(() => {
          if (remainingTime > 0) {
            remainingTime--;
            updateDisplay();
          } else {
            clearInterval(timerInterval);
            isRunning = false;
            hasEnded = true;
            updateButtonState();
            display.textContent = "Time's up!";
          }
        }, 1000);
      }
    };

    const stopTimer = () => {
      clearInterval(timerInterval);
      isRunning = false;
      updateButtonState();
    };

    const restartTimer = () => {
      stopTimer();
      remainingTime = duration;
      updateDisplay();
      startTimer();
    };

    startButton.addEventListener("click", startTimer);
    stopButton.addEventListener("click", stopTimer);
    restartButton.addEventListener("click", restartTimer);
    updateButtonState();

    return {
      element: timerCard,
    };
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  }
});
