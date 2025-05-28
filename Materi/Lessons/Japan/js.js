const lessons = [
  {
    kanji: "こんにちは",
    furigana: "Konnichiwa",
    question: "Apa Artinya Ini?",
    options: ["Selamat pagi", "Halo", "Selamat malam", "Terima kasih"],
    answer: 1,
    explanation:
      "こんにちは (konnichiwa) berarti 'Halo' dalam bahasa Indonesia.",
  },
  {
    kanji: "ありがとう",
    furigana: "arigatou",
    question: "Apa artinya ini?",
    options: ["Maaf", "Tolong", "Terima kasih", "Selamat tinggal"],
    answer: 2,
    explanation:
      "ありがとう (arigatou) berarti 'Terima kasih' dalam bahasa Indonesia.",
  },
  {
    kanji: "さようなら",
    furigana: "sayounara",
    question: "Apa artinya ini?",
    options: [
      "Selamat tinggal",
      "Selamat datang",
      "Apa kabar?",
      "Sampai jumpa",
    ],
    answer: 0,
    explanation:
      "さようなら (sayounara) berarti 'Selamat tinggal' dalam bahasa Indonesia.",
  },
  {
    kanji: "すみません",
    furigana: "sumimasen",
    question: "Apa artinya ini?",
    options: ["Terima kasih", "Maaf", "Tolong", "Permisi"],
    answer: 3,
    explanation:
      "すみません (sumimasen) bisa berarti 'Maaf' atau 'Permisi' tergantung konteks.",
  },
  {
    kanji: "おはよう",
    furigana: "ohayou",
    question: "Apa artinya ini?",
    options: [
      "Selamat pagi",
      "Selamat siang",
      "Selamat malam",
      "Selamat tidur",
    ],
    answer: 0,
    explanation:
      "おはよう (ohayou) berarti 'Selamat pagi' dalam bahasa Indonesia.",
  },
  {
    kanji: "ありがとうございます",
    furigana: "arigatou gozaimasu",
    question: "Apa artinya ini?",
    options: ["Terima kasih banyak", "Permisi", "Maaf", "Tolong"],
    answer: 0,
    explanation:
      "ありがとうございます (arigatou gozaimasu) berarti 'Terima kasih banyak' (lebih formal).",
  },
  {
    kanji: "ごめんなさい",
    furigana: "gomen nasai",
    question: "Apa artinya ini?",
    options: ["Terima kasih", "Maaf", "Tolong", "Permisi"],
    answer: 1,
    explanation:
      "ごめんなさい (gomen nasai) berarti 'Maaf' dalam bahasa Indonesia.",
  },
  {
    kanji: "いってきます",
    furigana: "itte kimasu",
    question: "Apa artinya ini?",
    options: [
      "Selamat tinggal",
      "Saya pergi dulu",
      "Selamat datang",
      "Selamat pagi",
    ],
    answer: 1,
    explanation:
      "いってきます (itte kimasu) diucapkan ketika akan pergi, artinya mirip 'Saya pergi dulu'.",
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
