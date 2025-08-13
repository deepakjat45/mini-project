const questions = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
    answer: 0
  },
  {
    question: "Which CSS property changes text color?",
    options: ["text-color", "font-color", "color"],
    answer: 2
  },
  {
    question: "Inside which HTML element do we put JavaScript?",
    options: ["<js>", "<javascript>", "<script>"],
    answer: 2
  },
  {
    question: "What does CSS stand for?",
    options: ["Cascading Style Sheets", "Colorful Style Sheets", "Computer Style Sheets"],
    answer: 0
  },
  {
    question: "Which tag is used for the largest heading?",
    options: ["<head>", "<h6>", "<h1>"],
    answer: 2
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["let", "int", "string"],
    answer: 0
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const scoreEl = document.getElementById("score");

function loadQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = `Q${currentQuestion + 1}. ${q.question}`;
  optionsEl.innerHTML = "";

  q.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.classList.add("option-btn");
    btn.onclick = () => checkAnswer(idx, btn);
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(selectedIdx, selectedBtn) {
  const correct = questions[currentQuestion].answer;
  const allOptions = document.querySelectorAll("#options button");

  allOptions.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === correct) {
      btn.classList.add("correct");
    } else if (idx === selectedIdx) {
      btn.classList.add("wrong");
    }
  });

  if (selectedIdx === correct) score++;

  nextBtn.style.display = "block";
}

function showResult() {
  document.getElementById("quiz-box").classList.add("hide");
  resultBox.classList.remove("hide");
  scoreEl.textContent = `${score} / ${questions.length}`;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  shuffleQuestions();
  resultBox.classList.add("hide");
  document.getElementById("quiz-box").classList.remove("hide");
  loadQuestion();
}

function shuffleQuestions() {
  questions.sort(() => Math.random() - 0.5);
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
    nextBtn.style.display = "none";
  } else {
    showResult();
  }
});

shuffleQuestions();
loadQuestion();
