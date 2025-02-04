document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("loggedIn") === "true") {
    showGameSection();
  } else {
    showAuthSection();
  }
});

function showAuthSection() {
  document.getElementById("auth-section").classList.remove("hidden");
  document.getElementById("game-section").classList.add("hidden");
  hideAllGames();
  clearAuthForm();
}

function showGameSection() {
  document.getElementById("auth-section").classList.add("hidden");
  document.getElementById("game-section").classList.remove("hidden");
  document.getElementById(
    "welcome-message"
  ).textContent = `Welcome, ${localStorage.getItem("username")}!`;
}

function clearAuthForm() {
  document.getElementById("auth-form").reset();
  document.getElementById("auth-message").textContent = "";
}

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("auth-message");

  if (username === "" || password === "") {
    message.textContent = "Please enter both username and password.";
    return;
  }

  const storedUsername = localStorage.getItem("username");
  const storedPassword = localStorage.getItem("password");

  if (username === storedUsername && password === storedPassword) {
    localStorage.setItem("loggedIn", "true");
    showGameSection();
  } else {
    message.textContent = "Incorrect username or password.";
  }
}

function register() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("auth-message");

  if (username === "" || password === "") {
    message.textContent = "Please enter both username and password.";
    return;
  }

  localStorage.setItem("username", username);
  localStorage.setItem("password", password);
  localStorage.setItem("loggedIn", "true");
  showGameSection();
}

function logout() {
  localStorage.setItem("loggedIn", "false");
  showAuthSection();
}

function openGame(gameName) {
  hideAllGames();
  document.getElementById(gameName).classList.remove("hidden");
  if (gameName === "game1") {
    initializeGame1();
  }
}

function backToGames() {
  hideAllGames();
  showGameSection();
}

function hideAllGames() {
  document.getElementById("game1").classList.add("hidden");
}

function initializeGame1() {
  const challenge = {
    code: "console.____('Hello, World!'); // What should go in the blank?",
    options: ["log", "print", "write", "display"],
    correct: "log",
  };

  document.getElementById("challenge-text").textContent = challenge.code;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  challenge.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.onclick = () => selectOption(button, challenge.correct);
    optionsDiv.appendChild(button);
  });

  document.getElementById("submit-answer").disabled = true;
  document.getElementById("feedback").textContent = "";
  window.currentCorrectAnswer = challenge.correct;
  window.selectedOption = null;
}

function selectOption(button, correctAnswer) {
  const buttons = document.querySelectorAll("#options button");
  buttons.forEach((btn) => btn.classList.remove("selected"));

  button.classList.add("selected");
  window.selectedOption = button.textContent;
  document.getElementById("submit-answer").disabled = false;
}

function checkAnswer() {
  const feedback = document.getElementById("feedback");
  if (window.selectedOption === window.currentCorrectAnswer) {
    feedback.textContent = "🎉 Correct! Well done.";
    feedback.style.color = "#28a745";
  } else {
    feedback.textContent = "❌ Incorrect. Try again!";
    feedback.style.color = "#dc3545";
  }
  document.getElementById("submit-answer").disabled = true;
}
