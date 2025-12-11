// DOM Elements
const startBtn = document.querySelector(".start"),
      numQuestions = document.querySelector("#num-questions"),
      timePerQuestion = document.querySelector("#time"),
      quiz = document.querySelector(".quiz"),
      startScreen = document.querySelector(".start-screen"),
      submitBtn = document.querySelector(".submit"),
      nextBtn = document.querySelector(".next"),
      endScreen = document.querySelector(".end-screen"),
      finalScore = document.querySelector(".final-score"),
      totalScore = document.querySelector(".total-score"),
      progressBar = document.querySelector(".progress-bar"),
      progressText = document.querySelector(".progress-text");

let questions = [],
    currentQuestion = 0,
    score = 0,
    timer,
    time = 30,
    loadingInterval;

// Expanded sample questions (15+)
const sampleQuestions = [
  { question: "What is 1+1?", correct_answer: "2", incorrect_answers: ["1","3","4"] },
  { question: "Which planet is known as the Red Planet?", correct_answer: "Mars", incorrect_answers: ["Venus","Earth","Jupiter"] },
  { question: "Which language runs in a web browser?", correct_answer: "JavaScript", incorrect_answers: ["Python","C++","Java"] },
  { question: "What is the capital of France?", correct_answer: "Paris", incorrect_answers: ["London","Berlin","Rome"] },
  { question: "Who wrote 'Hamlet'?", correct_answer: "Shakespeare", incorrect_answers: ["Hemingway","Tolstoy","Dickens"] },
  { question: "Which gas do plants absorb?", correct_answer: "Carbon Dioxide", incorrect_answers: ["Oxygen","Nitrogen","Helium"] },
  { question: "What is 10 x 5?", correct_answer: "50", incorrect_answers: ["45","55","60"] },
  { question: "Who painted Mona Lisa?", correct_answer: "Leonardo da Vinci", incorrect_answers: ["Picasso","Van Gogh","Michelangelo"] },
  { question: "What is H2O?", correct_answer: "Water", incorrect_answers: ["Oxygen","Hydrogen","Salt"] },
  { question: "Which planet is closest to the Sun?", correct_answer: "Mercury", incorrect_answers: ["Venus","Earth","Mars"] },
  { question: "How many continents are there?", correct_answer: "7", incorrect_answers: ["5","6","8"] },
  { question: "Who discovered gravity?", correct_answer: "Isaac Newton", incorrect_answers: ["Einstein","Galileo","Tesla"] },
  { question: "What is the largest ocean?", correct_answer: "Pacific", incorrect_answers: ["Atlantic","Indian","Arctic"] },
  { question: "Which element has symbol 'O'?", correct_answer: "Oxygen", incorrect_answers: ["Gold","Iron","Hydrogen"] },
  { question: "What is 5+7?", correct_answer: "12", incorrect_answers: ["10","11","13"] }
];

// Progress bar
const progress = (value) => {
  const percentage = (value / time) * 100;
  progressBar.style.width = `${percentage}%`;
  progressText.innerHTML = `${value}`;
};

// Loading animation
const loadingAnimation = () => {
  startBtn.innerHTML = "Loading";
  loadingInterval = setInterval(() => {
    if (startBtn.innerHTML.length >= 10) startBtn.innerHTML = "Loading";
    else startBtn.innerHTML += ".";
  }, 500);
};

// Start Quiz
const startQuiz = () => {
  loadingAnimation();

  setTimeout(() => {
    clearInterval(loadingInterval);
    startBtn.innerHTML = "Start Quiz";

    // Load questions dynamically based on selection
    const num = parseInt(numQuestions.value);
    questions = sampleQuestions.slice(0, num); // <-- dynamic slice
    startScreen.classList.add("hide");
    quiz.classList.remove("hide");
    currentQuestion = 0;
    score = 0;
    showQuestion(questions[currentQuestion]);
  }, 1500);
};

// Show question
const showQuestion = (question) => {
  const questionText = document.querySelector(".question"),
        answersWrapper = document.querySelector(".answer-wrapper"),
        questionNumber = document.querySelector(".number");

  questionText.innerHTML = question.question;

  const answers = [...question.incorrect_answers, question.correct_answer];
  answers.sort(() => Math.random() - 0.5);

  answersWrapper.innerHTML = "";
  answers.forEach(answer => {
    answersWrapper.innerHTML += `
      <div class="answer">
        <span class="text">${answer}</span>
        <span class="checkbox"><i class="fas fa-check"></i></span>
      </div>
    `;
  });

  questionNumber.innerHTML = ` Question <span class="current">${currentQuestion+1}</span>
                               <span class="total">/${questions.length}</span>`;

  const answersDiv = document.querySelectorAll(".answer");
  answersDiv.forEach(answer => {
    answer.addEventListener("click", () => {
      if (!answer.classList.contains("checked")) {
        answersDiv.forEach(a => a.classList.remove("selected"));
        answer.classList.add("selected");
        submitBtn.disabled = false;
      }
    });
  });

  time = parseInt(timePerQuestion.value);
  startTimer(time);
};

// Timer
const startTimer = (t) => {
  clearInterval(timer);
  timer = setInterval(() => {
    if (t >= 0) {
      progress(t);
      t--;
    } else {
      checkAnswer();
    }
  }, 1000);
};

// Check answer
const checkAnswer = () => {
  clearInterval(timer);
  const selected = document.querySelector(".answer.selected");
  const answersDiv = document.querySelectorAll(".answer");

  if (selected) {
    if (selected.querySelector(".text").innerHTML === questions[currentQuestion].correct_answer) {
      score++;
      selected.classList.add("correct");
    } else {
      selected.classList.add("wrong");
      answersDiv.forEach(a => {
        if (a.querySelector(".text").innerHTML === questions[currentQuestion].correct_answer)
          a.classList.add("correct");
      });
    }
  } else {
    answersDiv.forEach(a => {
      if (a.querySelector(".text").innerHTML === questions[currentQuestion].correct_answer)
        a.classList.add("correct");
    });
  }

  answersDiv.forEach(a => a.classList.add("checked"));
  submitBtn.style.display = "none";
  nextBtn.style.display = "block";
};

// Next question
const nextQuestion = () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion(questions[currentQuestion]);
    submitBtn.style.display = "block";
    submitBtn.disabled = true;
    nextBtn.style.display = "none";
  } else {
    showScore();
  }
};

// Show final score
const showScore = () => {
  quiz.classList.add("hide");
  endScreen.classList.remove("hide");
  finalScore.innerHTML = score;
  totalScore.innerHTML = `/ ${questions.length}`;
};

// Restart
const restartQuiz = () => window.location.reload();

// Event listeners
startBtn.addEventListener("click", startQuiz);
submitBtn.addEventListener("click", checkAnswer);
nextBtn.addEventListener("click", nextQuestion);
document.querySelector(".restart").addEventListener("click", restartQuiz);

