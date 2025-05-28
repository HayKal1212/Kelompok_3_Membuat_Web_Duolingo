const lessons = [
  {
    kanji: "Привет",
    furigana: "Privet",
    question: "Apa artinya ini?",
    options: ["Selamat pagi", "Halo", "Selamat malam", "Terima kasih"],
    answer: 1,
    explanation: "Привет (Privet) berarti 'Halo'. Ini bentuk informal.",
  },
  {
    kanji: "Спасибо",
    furigana: "Spasibo",
    question: "Apa artinya ini?",
    options: ["Maaf", "Tolong", "Terima kasih", "Selamat tinggal"],
    answer: 2,
    explanation: "Спасибо (Spasibo) berarti 'Terima kasih'.",
  },
  {
    kanji: "До свидания",
    furigana: "Do svidaniya",
    question: "Apa artinya ini?",
    options: [
      "Selamat tinggal",
      "Selamat datang",
      "Apa kabar?",
      "Sampai jumpa",
    ],
    answer: 0,
    explanation:
      "До свидания (Do svidaniya) berarti 'Selamat tinggal' secara formal.",
  },
  {
    kanji: "Извините",
    furigana: "Izvinite",
    question: "Apa artinya ini?",
    options: ["Terima kasih", "Maaf", "Tolong", "Permisi"],
    answer: 3,
    explanation:
      "Извините (Izvinite) berarti 'Permisi' atau 'Maaf', tergantung konteksnya.",
  },
  {
    kanji: "Доброе утро",
    furigana: "Dobroye utro",
    question: "Apa artinya ini?",
    options: [
      "Selamat pagi",
      "Selamat siang",
      "Selamat malam",
      "Selamat tidur",
    ],
    answer: 0,
    explanation: "Доброе утро (Dobroye utro) berarti 'Selamat pagi'.",
  },
  {
    kanji: "Большое спасибо",
    furigana: "Bol'shoye spasibo",
    question: "Apa artinya ini?",
    options: ["Terima kasih banyak", "Permisi", "Maaf", "Tolong"],
    answer: 0,
    explanation:
      "Большое спасибо (Bol'shoye spasibo) berarti 'Terima kasih banyak'.",
  },
  {
    kanji: "Простите",
    furigana: "Prostite",
    question: "Apa artinya ini?",
    options: ["Terima kasih", "Maaf", "Tolong", "Permisi"],
    answer: 1,
    explanation: "Простите (Prostite) berarti 'Maaf'.",
  },
  {
    kanji: "Я пошёл",
    furigana: "Ya poshol",
    question: "Apa artinya ini?",
    options: [
      "Selamat tinggal",
      "Saya pergi dulu",
      "Selamat datang",
      "Selamat pagi",
    ],
    answer: 1,
    explanation:
      "Я пошёл (Ya poshol) digunakan oleh laki-laki saat akan pergi, artinya 'Saya pergi dulu'. Untuk perempuan: Я пошла (Ya poshla).",
  },
];

let currentLesson = 0;
let score = 0;
let selectedOption = null;
let answered = false;

const kanjiElement = document.getElementById("kanji");
const furiganaElement = document.getElementById("furigana");
const questionTextElement = document.querySelector(".question-text");
const optionsElement = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const feedbackElement = document.getElementById("feedback");
const progressElement = document.getElementById("progress");
const xpElement = document.getElementById("xp");

function loadLesson(lessonIndex) {
  if (lessonIndex >= lessons.length) {
    document.querySelector(".question").innerHTML = `
                  <div>
                      <h2>Pelajaran Selesai!</h2>
                      <p>Skor Anda: ${score} dari ${lessons.length}</p>
                      <p>XP diperoleh: ${score * 10}</p>
                  </div>
              `;
    optionsElement.innerHTML = "";
    nextBtn.style.display = "none";
    xpElement.textContent = score * 10;
    return;
  }

  const lesson = lessons[lessonIndex];
  kanjiElement.textContent = lesson.kanji;
  furiganaElement.textContent = lesson.furigana;
  questionTextElement.textContent = lesson.question;

  optionsElement.innerHTML = "";
  lesson.options.forEach((option, index) => {
    const optionElement = document.createElement("div");
    optionElement.classList.add("option");
    optionElement.textContent = option;
    optionElement.addEventListener("click", () => selectOption(index));
    optionsElement.appendChild(optionElement);
  });

  answered = false;
  selectedOption = null;
  nextBtn.style.display = "none";
  feedbackElement.textContent = "";
  feedbackElement.className = "feedback";

  progressElement.style.width = `${(lessonIndex / lessons.length) * 100}%`;
}

function selectOption(optionIndex) {
  if (answered) return;

  selectedOption = optionIndex;
  const lesson = lessons[currentLesson];
  const optionElements = document.querySelectorAll(".option");

  optionElements.forEach((el, idx) => {
    if (idx === lesson.answer) {
      el.classList.add("correct");
    }
    if (idx === optionIndex && idx !== lesson.answer) {
      el.classList.add("incorrect");
    }
  });

  if (optionIndex === lesson.answer) {
    feedbackElement.textContent = "Benar! " + lesson.explanation;
    feedbackElement.classList.add("correct-feedback");
    score++;
    xpElement.textContent = score * 10;
  } else {
    feedbackElement.textContent = "Salah. " + lesson.explanation;
    feedbackElement.classList.add("incorrect-feedback");
  }

  answered = true;
  nextBtn.style.display = "block";
}

function nextLesson() {
  currentLesson++;
  loadLesson(currentLesson);
}

nextBtn.addEventListener("click", nextLesson);

loadLesson(0);
