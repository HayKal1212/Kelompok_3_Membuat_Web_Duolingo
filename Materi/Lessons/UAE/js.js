const lessons = [
  {
    kanji: "مرحبا",
    furigana: "Marhaban",
    question: "Apa artinya ini?",
    options: ["Selamat pagi", "Halo", "Selamat malam", "Terima kasih"],
    answer: 1,
    explanation: "مرحبا (Marhaban) berarti 'Halo' dalam bahasa Indonesia.",
  },
  {
    kanji: "شكرا",
    furigana: "Syukran",
    question: "Apa artinya ini?",
    options: ["Maaf", "Tolong", "Terima kasih", "Selamat tinggal"],
    answer: 2,
    explanation:
      "شكرا (Syukran) berarti 'Terima kasih' dalam bahasa Indonesia.",
  },
  {
    kanji: "مع السلامة",
    furigana: "Ma'a as-salamah",
    question: "Apa artinya ini?",
    options: [
      "Selamat tinggal",
      "Selamat datang",
      "Apa kabar?",
      "Sampai jumpa",
    ],
    answer: 0,
    explanation:
      "مع السلامة (Ma'a as-salamah) berarti 'Selamat tinggal' atau 'Sampai jumpa'.",
  },
  {
    kanji: "عفوا",
    furigana: "‘Afwan",
    question: "Apa artinya ini?",
    options: ["Terima kasih", "Maaf", "Tolong", "Permisi"],
    answer: 3,
    explanation:
      "عفوا (‘Afwan) bisa berarti 'Permisi' atau 'Sama-sama', tergantung konteks.",
  },
  {
    kanji: "صباح الخير",
    furigana: "Shabahul khair",
    question: "Apa artinya ini?",
    options: [
      "Selamat pagi",
      "Selamat siang",
      "Selamat malam",
      "Selamat tidur",
    ],
    answer: 0,
    explanation: "صباح الخير (Shabahul khair) berarti 'Selamat pagi'.",
  },
  {
    kanji: "شكرا جزيلا",
    furigana: "Syukran jazilan",
    question: "Apa artinya ini?",
    options: ["Terima kasih banyak", "Permisi", "Maaf", "Tolong"],
    answer: 0,
    explanation: "شكرا جزيلا (Syukran jazilan) berarti 'Terima kasih banyak'.",
  },
  {
    kanji: "آسف",
    furigana: "Asif",
    question: "Apa artinya ini?",
    options: ["Terima kasih", "Maaf", "Tolong", "Permisi"],
    answer: 1,
    explanation:
      "آسف (Asif) berarti 'Maaf' dalam bahasa Arab. Untuk perempuan: آسفة (Asifah).",
  },
  {
    kanji: "أنا ذاهب",
    furigana: "Ana dhahib",
    question: "Apa artinya ini?",
    options: [
      "Selamat tinggal",
      "Saya pergi dulu",
      "Selamat datang",
      "Selamat pagi",
    ],
    answer: 1,
    explanation:
      "أنا ذاهب (Ana dhahib) berarti 'Saya pergi dulu'. Untuk perempuan: أنا ذاهبة (Ana dhahibah).",
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
