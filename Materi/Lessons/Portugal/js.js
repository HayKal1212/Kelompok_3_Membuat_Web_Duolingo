const vocabulary = [
  { word: "Halo", translation: "Olá", language: "Portugal" },
  { word: "Selamat Malam", translation: "Boa Noite", language: "Portugal" },
  { word: "Terimakasih", translation: "Obrigado", language: "Portugal" },
  { word: "Selamat Pagi", translation: "Bom Dia", language: "Portugal" },
  { word: "Ya", translation: "Sim", language: "Portugal" },
  { word: "Teman", translation: "Amigo", language: "Portugal" },
  { word: "Selamat Tinggal", translation: "Adeus", language: "Portugal" },
  { word: "Bahagia", translation: "Feliz", language: "Portugal" },
  { word: "Bulan", translation: "Lua", language: "Portugal" },
  { word: "Cepat", translation: "Rápido", language: "Portugal" },
];

let currentQuestion = 0;
let score = 0;
let streak = 0;
let selectedOption = null;
let questionsAnswered = 0;
const totalQuestions = 5;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const checkButton = document.getElementById("check-button");
const nextButton = document.getElementById("next-button");
const feedbackElement = document.getElementById("feedback");
const xpGainedElement = document.getElementById("xp-gained");
const streakElement = document.getElementById("streak-count");
const progressBar = document.getElementById("progress-bar");

function initGame() {
  currentQuestion = 0;
  score = 0;
  streak = 0;
  questionsAnswered = 0;
  updateStreak();
  updateProgress();
  loadQuestion();
}

function loadQuestion() {
  optionsElement.innerHTML = "";
  feedbackElement.style.display = "none";
  xpGainedElement.style.display = "none";
  nextButton.style.display = "none";
  checkButton.disabled = true;
  checkButton.style.display = "block";
  selectedOption = null;

  const randomIndex = Math.floor(Math.random() * vocabulary.length);
  const vocab = vocabulary[randomIndex];
  questionElement.textContent = `Bagaimana Anda Menyebutkan "${vocab.word}" Di Bahasa ${vocab.language}?`;

  const options = [vocab.translation];
  while (options.length < 4) {
    const randomVocab =
      vocabulary[Math.floor(Math.random() * vocabulary.length)];
    if (
      !options.includes(randomVocab.translation) &&
      randomVocab.translation !== vocab.translation
    ) {
      options.push(randomVocab.translation);
    }
  }

  options.sort(() => Math.random() - 0.5);

  options.forEach((option, index) => {
    const optionElement = document.createElement("div");
    optionElement.className = "option";
    optionElement.textContent = option;
    optionElement.dataset.index = index;
    optionElement.addEventListener("click", selectOption);
    optionsElement.appendChild(optionElement);
  });

  optionsElement.dataset.correctAnswer = vocab.translation;
}

function selectOption(e) {
  if (selectedOption !== null) {
    selectedOption.classList.remove("selected");
  }
  selectedOption = e.target;
  selectedOption.classList.add("selected");
  checkButton.disabled = false;
}

function checkAnswer() {
  if (!selectedOption) return;

  const correctAnswer = optionsElement.dataset.correctAnswer;
  const userAnswer = selectedOption.textContent;

  const allOptions = document.querySelectorAll(".option");
  allOptions.forEach((option) => {
    option.style.pointerEvents = "none";
    if (option.textContent === correctAnswer) {
      option.classList.add("correct-answer");
    }
  });

  feedbackElement.style.display = "block";
  if (userAnswer === correctAnswer) {
    feedbackElement.textContent = "Mamma Mia!";
    feedbackElement.className = "feedback correct";
    score += 10;
    streak++;
    updateStreak();
  } else {
    feedbackElement.textContent = `Salah Cuy, Jawabannya "${correctAnswer}".`;
    feedbackElement.className = "feedback incorrect";
    selectedOption.classList.add("incorrect-answer");
    streak = 0;
    updateStreak();
  }

  checkButton.style.display = "none";
  nextButton.style.display = "block";
  xpGainedElement.style.display = "block";
  questionsAnswered++;
  updateProgress();
}

function nextQuestion() {
  if (questionsAnswered < totalQuestions) {
    loadQuestion();
  } else {
    endGame();
  }
}

function endGame() {
  questionElement.textContent = `Lesson complete! You earned ${score} XP.`;
  optionsElement.innerHTML = "";
  checkButton.style.display = "none";
  nextButton.textContent = "Start New Lesson";
  nextButton.style.display = "block";
  feedbackElement.style.display = "none";
  xpGainedElement.style.display = "none";

  nextButton.removeEventListener("click", nextQuestion);
  nextButton.addEventListener("click", initGame);
}

function updateStreak() {
  streakElement.textContent = streak;
}

function updateProgress() {
  const progress = (questionsAnswered / totalQuestions) * 100;
  progressBar.style.width = `${progress}%`;
}

checkButton.addEventListener("click", checkAnswer);
nextButton.addEventListener("click", nextQuestion);
initGame();
