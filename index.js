const data = [
    {
        number:1,
        question:"What does the acronym 'HTML' stand for?",
        correct:"Hyper Text Markup Language",
        options:[
            "Home Tool Markup Language",
            "Hyperlinks and Text Markup Language",
            "Hyper Text Markup Language",
            "Hyper Tool Markup Language",
        ]
    },
    {
        number: 2,
        question: "What does the acronym 'CSS' stand for?",
        correct: "Cascading Style Sheets",
        options: [
          "Computer Style System",
          "Cascading Style Sheets",
          "Coding Style Syntax",
          "Content Structure System",
        ]
      },
      {
        number: 3,
        question: "What is the role of JavaScript in web pages?",
        correct: "Manages interactions and page logic",
        options: [
            "Handles page styling",
            "Displays content on the page",
            "Creates databases on web pages",
            "Manages interactions and page logic",
        ]
      },
      {
        number: 4,
        question: "What does the acronym 'URL' stand for?",
        correct: "Uniform Resource Locator",
        options: [
            "Universal Retrieval Language",
            "Uniform Resource Locator",
            "User Requested Link",
          "Underlying Resource Loader",
        ]
      },
      {
        number: 5,
        question: "What does 'HTTP' stand for in internet communication?",
        correct: "Hypertext Transfer Protocol",
        options: [
            "Hyperlink Text Transmission",
            "Highly Targeted Transfer Protocol",
            "Hypertext Transfer Protocol",
          "Home Top Technology Protocol",
        ]
      }
]

const startBtn = document.querySelector('#startBtn');

const rulesBox = document.querySelector('.rulesBox');
const rulesNext = document.querySelector('#next');
const rulesQuit = document.querySelector('#rulesQuit');

const quizBox = document.querySelector('.quizBox');
const quizQuestion = document.querySelector('.quizQuestion h3');
let timer = document.querySelector('.timer span');
const questionCounter = document.querySelector('.question span');
const answers = document.querySelectorAll('.quizAnswers .answer');
const quizNext = document.querySelector('.quizBtns button');

const finishBox = document.querySelector('.finishBox');
const finishBoxQuit = document.querySelector('#finishQuit');
const restart = document.querySelector('#restart');
const score = document.querySelector('.msg span')

let currentQuestionIndex = 0;
let remainingTime = 16;
let points;
let timeExpired = false;

if (window.innerWidth< 768) {
  answers.forEach(answer => answer.style.cursor = 'auto');
}

function start() {
  startBtn.style.display = "none";
  rulesBox.style.display = "block";
  answers.forEach(answer => answer.addEventListener('click',correction));
}
function quit() {
  location.reload();
}
function quizStart() {
  rulesBox.style.display = "none";
  finishBox.style.display = "none";
  quizBox.style.display = "block";
  points = 0;
}
function quiz() {
  if (remainingTime > 0) {
    remainingTime--;
    timer.innerHTML = remainingTime;
    timerTimeout = setTimeout(quiz,1000);
    quizNext.style.display = 'none';
    timeExpired = false;
  } else {
    const currentQuestion = data[currentQuestionIndex];
    const correctAnswer = Array.from(answers).find(answer=> answer.innerHTML === currentQuestion.correct);
    clearTimeout(timerTimeout);
    quizNext.style.display = 'block';
    quizNext.style.cursor = "auto";
    timeExpired = true;
    timer.innerHTML = 0;
    correctAnswer.classList.add('correct');
  }
  if(currentQuestionIndex < data.length)
  {
    const currentQuestion = data[currentQuestionIndex];
    quizQuestion.textContent = currentQuestion.question;
    questionCounter.textContent = currentQuestion.number;
    const options = currentQuestion.options;
    answers.forEach((answer,index)=>{
      answer.innerHTML = options[index];
    });
  }
}
function nextQuestion() {
  currentQuestionIndex++;
  remainingTime = 16;
  if(currentQuestionIndex < data.length)
  {
    answers.forEach(answer=>{
      answer.classList.remove('correct');
      answer.classList.remove('incorrect');     
    });
    quiz();
  }
  else
  {
    quizBox.style.display = "none";
    finishBox.style.display = "block";
    score.innerHTML = points;
  }
}
function restartQuiz() {
  currentQuestionIndex = 0;
  remainingTime = 16;
  answers.forEach(answer=>{
    answer.classList.remove('correct');
    answer.classList.remove('incorrect');     
  });
  if(currentQuestionIndex < data.length)
  {
    quiz();
  }
}

function correction() {
  remainingTime = 0;
  if (!timeExpired) {
    const currentQuestion = data[currentQuestionIndex];
    const clickedAnswer = event.target;
    const correctAnswer = Array.from(answers).find(answer=> answer.innerHTML === currentQuestion.correct);
      if (currentQuestion.correct === clickedAnswer.innerHTML) {
        clickedAnswer.classList.add('correct');
        points++;
      } else {
        clickedAnswer.classList.add('incorrect');
        correctAnswer.classList.add('correct');
      }
      timer.innerHTML = remainingTime;
      quizNext.disabled = false;
  }
}


startBtn.addEventListener('click',start);

rulesNext.addEventListener('click',quizStart);
rulesNext.addEventListener('click',quiz);

rulesQuit.addEventListener('click',quit);

quizNext.addEventListener('click',nextQuestion);

finishBoxQuit.addEventListener('click',quit);

restart.addEventListener('click',quizStart);
restart.addEventListener('click',restartQuiz);