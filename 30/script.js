const questions = [
  "Do you enjoy daily exercise?",
  "Do you prefer spending time outdoors?",
  "Are you social with strangers?",
  "Do you enjoy mental challenges?",
  "Are you generally tidy?",
];

let currentQuestionIndex = 0;
let userScore = 0;
let userName = "";

const questionContainer = document.getElementById("question-container");
const resultSection = document.getElementById("result");
const dogProfileDiv = document.getElementById("dogProfile");
const matchReasonDiv = document.getElementById("matchReason");
const refreshButton = document.getElementById("refresh-btn");
const greetingElement = document.getElementById("greeting");

window.onload = function () {
  userName = prompt("Please enter your name:", "Guest");
  if (userName) {
    greetingElement.textContent = `Welcome to PetQuest, ${userName}!`;
  } else {
    userName = "Guest";
    greetingElement.textContent = "Welcome to PetQuest!";
  }
  displayQuestion();
};

function displayQuestion() {
  if (currentQuestionIndex < questions.length) {
    const questionText = questions[currentQuestionIndex];
    questionContainer.innerHTML = `
      <p>${userName}, ${questionText}</p>
      <button type="button" class="answer-btn" data-answer="yes">Yes</button>
      <button type="button" class="answer-btn" data-answer="no">No</button>
    `;

    const answerButtons = questionContainer.querySelectorAll(".answer-btn");
    answerButtons.forEach((button) => {
      button.addEventListener("click", handleAnswer);
    });
  } else {
    calculateDogMatch();
  }
}

function handleAnswer(event) {
  const answer = event.target.getAttribute("data-answer");
  if (answer === "yes") {
    userScore++;
  }
  currentQuestionIndex++;
  displayQuestion();
}

function calculateDogMatch() {
  let dogType, matchReason;

  if (userScore > 3) {
    dogType = "Golden Retriever";
    matchReason =
      "You are outgoing, active, and sociable. You enjoy outdoor activities and mental stimulation, much like a Golden Retriever!";
  } else {
    dogType = "Basset Hound";
    matchReason =
      "You are more laid-back, prefer indoor activities, and enjoy a relaxed lifestyle. This matches well with the calm nature of a Basset Hound!";
  }

  displayResult(dogType, matchReason);
}

function displayResult(dogType, matchReason) {
  dogProfileDiv.textContent = `${userName}, you are most similar to a ${dogType}.`;
  matchReasonDiv.textContent = matchReason;
  resultSection.style.display = "block";
  questionContainer.style.display = "none";
}

refreshButton.addEventListener("click", () => {
  currentQuestionIndex = 0;
  userScore = 0;
  resultSection.style.display = "none";
  questionContainer.style.display = "block";
  displayQuestion();
});
