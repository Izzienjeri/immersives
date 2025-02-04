const questions = [
  {
    question:
      "Q1. In Python programming language ___ function is used to display output.",
    answer: "print",
  },
  {
    question: "Q2. To create a function in Python, we use ___.",
    answer: "def",
  },
  {
    question: "Q3. The ___ function in Python is used to get user input.",
    answer: "input",
  },
];

let currentQuestionIndex = 0;
let correctAnswers = 0;

function displayQuestion() {
  const questionElement = document.getElementById("question");
  const answerInput = document.getElementById("answer");
  const feedback = document.getElementById("feedback");
  const nextButton = document.getElementById("nextQuestion");
  const refreshButton = document.getElementById("refresh");
  const result = document.getElementById("result");

  questionElement.textContent = questions[currentQuestionIndex].question;
  answerInput.value = "";
  feedback.textContent = "";
  nextButton.style.display = "none";
  refreshButton.style.display = "none";
  result.style.display = "none";
}

function checkAnswer() {
  const userInput = document.getElementById("answer").value.trim();
  const feedback = document.getElementById("feedback");
  const nextButton = document.getElementById("nextQuestion");

  if (
    userInput.toLowerCase() ===
    questions[currentQuestionIndex].answer.toLowerCase()
  ) {
    feedback.textContent = "Correct! Well done!";
    feedback.style.color = "green";
    correctAnswers++;
  } else {
    feedback.textContent = "Incorrect! Try again.";
    feedback.style.color = "red";
  }

  if (currentQuestionIndex < questions.length - 1) {
    nextButton.style.display = "inline-block";
  } else {
    const refreshButton = document.getElementById("refresh");
    const result = document.getElementById("result");
    result.textContent = `You answered correctly ${correctAnswers} out of ${questions.length} questions.`;
    result.style.display = "block";
    refreshButton.style.display = "inline-block";
  }
}

function nextQuestion() {
  currentQuestionIndex++;
  displayQuestion();
}

function refreshPage() {
  currentQuestionIndex = 0;
  correctAnswers = 0;
  displayQuestion();
}

displayQuestion();
