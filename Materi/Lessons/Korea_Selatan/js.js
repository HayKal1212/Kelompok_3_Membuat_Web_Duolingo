const lessons = [
  {
    kanji: "안녕하세요",
    furigana: "annyeonghaseyo",
    question: "Apa artinya ini?",
    options: ["Selamat pagi", "Halo", "Selamat malam", "Terima kasih"],
    answer: 1,
    explanation:
      "안녕하세요 (annyeonghaseyo) berarti 'Halo' atau 'Hai' dalam bahasa Indonesia.",
  },
  {
    kanji: "감사합니다",
    furigana: "gamsahamnida",
    question: "Apa artinya ini?",
    options: ["Maaf", "Tolong", "Terima kasih", "Selamat tinggal"],
    answer: 2,
    explanation:
      "감사합니다 (gamsahamnida) berarti 'Terima kasih' dalam bentuk formal.",
  },
  {
    kanji: "안녕히 가세요",
    furigana: "annyeonghi gaseyo",
    question: "Apa artinya ini?",
    options: [
      "Selamat tinggal",
      "Selamat datang",
      "Apa kabar?",
      "Sampai jumpa",
    ],
    answer: 0,
    explanation:
      "안녕히 가세요 (annyeonghi gaseyo) berarti 'Selamat tinggal' kepada orang yang pergi.",
  },
  {
    kanji: "실례합니다",
    furigana: "sillyehamnida",
    question: "Apa artinya ini?",
    options: ["Terima kasih", "Maaf", "Tolong", "Permisi"],
    answer: 3,
    explanation:
      "실례합니다 (sillyehamnida) berarti 'Permisi' dalam situasi formal atau sopan.",
  },
  {
    kanji: "좋은 아침",
    furigana: "joeun achim",
    question: "Apa artinya ini?",
    options: [
      "Selamat pagi",
      "Selamat siang",
      "Selamat malam",
      "Selamat tidur",
    ],
    answer: 0,
    explanation:
      "좋은 아침 (joeun achim) berarti 'Selamat pagi' dalam bahasa Korea.",
  },
  {
    kanji: "대단히 감사합니다",
    furigana: "daedanhi gamsahamnida",
    question: "Apa artinya ini?",
    options: ["Terima kasih banyak", "Permisi", "Maaf", "Tolong"],
    answer: 0,
    explanation:
      "대단히 감사합니다 (daedanhi gamsahamnida) berarti 'Terima kasih banyak' secara sangat sopan.",
  },
  {
    kanji: "죄송합니다",
    furigana: "joesonghamnida",
    question: "Apa artinya ini?",
    options: ["Terima kasih", "Maaf", "Tolong", "Permisi"],
    answer: 1,
    explanation: "죄송합니다 (joesonghamnida) berarti 'Maaf' secara formal.",
  },
  {
    kanji: "다녀오겠습니다",
    furigana: "danyeo ogessseumnida",
    question: "Apa artinya ini?",
    options: [
      "Selamat tinggal",
      "Saya pergi dulu",
      "Selamat datang",
      "Selamat pagi",
    ],
    answer: 1,
    explanation:
      "다녀오겠습니다 (danyeo ogessseumnida) diucapkan saat pergi dari rumah dan bermakna 'Saya pergi dulu'.",
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
