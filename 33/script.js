const greetingsVocabulary = [
  { word: "bonjour", definition: "French" },
  { word: "hola", definition: "Spanish" },
  { word: "guten tag", definition: "German" },
  { word: "ciao", definition: "Italian" },
  { word: "olá", definition: "Portuguese" },
  { word: "zdravstvuyte", definition: "Russian" },
  { word: "nĭ hăo", definition: "Chinese" },
  { word: "konnichiwa", definition: "Japanese" },
  { word: "annyeonghaseyo", definition: "Korean" },
  { word: "namaste", definition: "Hindi" },
];

const numbersVocabulary = [
  { word: "uno", definition: "Spanish" },
  { word: "eins", definition: "German" },
  { word: "un", definition: "French" },
  { word: "due", definition: "Italian" },
  { word: "zwei", definition: "German" },
  { word: "dos", definition: "Spanish" },
  { word: "san", definition: "Japanese" },
  { word: "tres", definition: "Spanish" },
  { word: "trois", definition: "French" },
  { word: "dva", definition: "Russian" },
];

let currentQuestionIndex = 0;
let correctAnswers = 0;
let totalQuestions = 0;
let currentQuiz = [];

const greetingsQuizBtn = document.getElementById("greetingsQuizBtn");
const numbersQuizBtn = document.getElementById("numbersQuizBtn");
const quizArea = document.getElementById("quizArea");
const questionText = document.getElementById("questionText");
const answerOptions = document.getElementById("answerOptions");
const progressText = document.getElementById("progressText");
const refreshBtn = document.getElementById("refreshBtn");

greetingsQuizBtn.addEventListener("click", () =>
  startQuiz(greetingsVocabulary)
);
numbersQuizBtn.addEventListener("click", () => startQuiz(numbersVocabulary));
refreshBtn.addEventListener("click", resetQuiz);

quizArea.style.display = "none";

function startQuiz(vocabulary) {
  currentQuiz = vocabulary;
  totalQuestions = vocabulary.length;
  currentQuestionIndex = 0;
  correctAnswers = 0;
  quizArea.style.display = "block";
  loadQuizQuestion();
}

function loadQuizQuestion() {
  if (currentQuestionIndex >= totalQuestions) {
    updateProgress();
    showResults();
    return;
  }

  const question = currentQuiz[currentQuestionIndex];
  questionText.textContent = question.word;
  answerOptions.innerHTML = "";

  const correctAnswer = question.definition;
  const options = [correctAnswer, ...generateWrongAnswers(3, correctAnswer)];
  shuffleArray(options);

  options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("answer-button");
    button.addEventListener("click", () => checkAnswer(option));
    answerOptions.appendChild(button);
  });

  updateProgress();
}

function checkAnswer(selectedAnswer) {
  if (selectedAnswer === currentQuiz[currentQuestionIndex].definition) {
    correctAnswers++;
  }
  currentQuestionIndex++;
  loadQuizQuestion();
}

function updateProgress() {
  progressText.innerHTML = `
        Question ${Math.min(
          currentQuestionIndex + 1,
          totalQuestions
        )} of ${totalQuestions} <br/>
        Your score: ${correctAnswers}
      `;
}

function showResults() {
  const message =
    correctAnswers > 7
      ? "Congratulations! You're amazing at this!"
      : correctAnswers >= 3
      ? "Not bad! Keep practicing, and you'll be a master."
      : "You can do better! Practice makes perfect.";

  alert(`${message} You scored ${correctAnswers} out of ${totalQuestions}.`);
}

function generateWrongAnswers(count, correctAnswer) {
  const allOptions = new Set(currentQuiz.map((item) => item.definition));
  allOptions.delete(correctAnswer);
  return Array.from(allOptions).slice(0, count);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function resetQuiz() {
  currentQuestionIndex = 0;
  correctAnswers = 0;
  loadQuizQuestion();
}
