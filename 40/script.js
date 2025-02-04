let inhaleTime, exhaleTime, intervalId;

document
  .getElementById("startButton")
  .addEventListener("click", startCountdown);
document
  .getElementById("pauseButton")
  .addEventListener("click", pauseCountdown);
document
  .getElementById("resetButton")
  .addEventListener("click", resetCountDown);

function startCountdown() {
  inhaleTime = parseInt(document.getElementById("inhaleTime").value);
  exhaleTime = parseInt(document.getElementById("exhaleTime").value);
  let count = inhaleTime;
  let phase = "inhale";
  document.getElementById("countdown").textContent = count || "";
  document.getElementById("countdown").className = "inhale";
  document.getElementById("currentProcess").textContent = "inhale";
  document.getElementById("startButton").disabled = true;
  document.getElementById("pauseButton").disabled = false;
  document.getElementById("resetButton").disabled = true;

  if (inhaleTime >= 1 && exhaleTime >= 1) {
    intervalId = setInterval(() => {
      if (count === 0) {
        phase = phase === "inhale" ? "exhale" : "inhale";
        count = phase === "inhale" ? inhaleTime : exhaleTime;
      }
      document.getElementById("countdown").textContent = count;
      document.getElementById("countdown").className = phase;
      document.getElementById("currentProcess").textContent = phase;
      document.getElementById("currentProcess").className = phase;
      document.getElementById("resetButton").disabled = false;
      count--;
    }, 1000);
  } else {
    alert("Please enter valid inhale and exhale times (minimum 1 second).");
    document.getElementById("currentProcess").textContent = "";
    return;
  }
}

function pauseCountdown() {
  clearInterval(intervalId);
  document.getElementById("startButton").disabled = false;
  document.getElementById("pauseButton").disabled = true;
}

function resetCountDown() {
  clearInterval(intervalId);
  document.getElementById("startButton").disabled = false;
  document.getElementById("pauseButton").disabled = true;
  inhaleTime = 0;
  exhaleTime = 0;
  document.getElementById("countdown").textContent = "";
  document.getElementById("currentProcess").textContent = "";
  document.getElementById("inhaleTime").value = "";
  document.getElementById("exhaleTime").value = "";
  document.getElementById("resetButton").disabled = true;
}
