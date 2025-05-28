const lessons = [
  {
    kanji: "你好",
    furigana: "nǐ hǎo",
    question: "Apa artinya ini?",
    options: ["Selamat pagi", "Halo", "Selamat malam", "Terima kasih"],
    answer: 1,
    explanation: "你好 (nǐ hǎo) berarti 'Halo' dalam bahasa Indonesia.",
  },
  {
    kanji: "谢谢",
    furigana: "xièxie",
    question: "Apa artinya ini?",
    options: ["Maaf", "Tolong", "Terima kasih", "Selamat tinggal"],
    answer: 2,
    explanation: "谢谢 (xièxie) berarti 'Terima kasih' dalam bahasa Indonesia.",
  },
  {
    kanji: "再见",
    furigana: "zàijiàn",
    question: "Apa artinya ini?",
    options: [
      "Selamat tinggal",
      "Selamat datang",
      "Apa kabar?",
      "Sampai jumpa",
    ],
    answer: 0,
    explanation:
      "再见 (zàijiàn) berarti 'Selamat tinggal' atau 'Sampai jumpa'.",
  },
  {
    kanji: "对不起",
    furigana: "duìbuqǐ",
    question: "Apa artinya ini?",
    options: ["Terima kasih", "Maaf", "Tolong", "Permisi"],
    answer: 1,
    explanation: "对不起 (duìbuqǐ) berarti 'Maaf' dalam bahasa Indonesia.",
  },
  {
    kanji: "早上好",
    furigana: "zǎoshang hǎo",
    question: "Apa artinya ini?",
    options: [
      "Selamat pagi",
      "Selamat siang",
      "Selamat malam",
      "Selamat tidur",
    ],
    answer: 0,
    explanation: "早上好 (zǎoshang hǎo) berarti 'Selamat pagi'.",
  },
  {
    kanji: "非常感谢",
    furigana: "fēicháng gǎnxiè",
    question: "Apa artinya ini?",
    options: ["Terima kasih banyak", "Permisi", "Maaf", "Tolong"],
    answer: 0,
    explanation:
      "非常感谢 (fēicháng gǎnxiè) berarti 'Terima kasih banyak' dalam bentuk sangat sopan.",
  },
  {
    kanji: "对不起",
    furigana: "duìbuqǐ",
    question: "Apa artinya ini?",
    options: ["Terima kasih", "Maaf", "Tolong", "Permisi"],
    answer: 1,
    explanation:
      "对不起 (duìbuqǐ) berarti 'Maaf'. Bisa digunakan dalam banyak situasi sopan.",
  },
  {
    kanji: "我走了",
    furigana: "wǒ zǒu le",
    question: "Apa artinya ini?",
    options: [
      "Selamat tinggal",
      "Saya pergi dulu",
      "Selamat datang",
      "Selamat pagi",
    ],
    answer: 1,
    explanation:
      "我走了 (wǒ zǒu le) secara harfiah berarti 'Saya pergi dulu'. Digunakan saat pamit.",
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
