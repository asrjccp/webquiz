// Define the quiz questions and answers
const quizData = [
  {
    question: "What does HTML stand for?",
    options: ["Hyperlinks and Text Markup Language", "HyperText Markup Language", "HyperText Manipulation Language", "High-Tech Markup Language"],
    answer: 1
  },
  {
    question: "Which tag is used to create a hyperlink in HTML?",
    options: ["<a>", "<h1>", "<img>", "<p>"],
    answer: 0
  },
  {
    question: "What is the purpose of the <head> section in an HTML document?",
    options: ["To define the content and structure of the page", "To define the layout and styling of the page", "To define the title and metadata of the page", "To define the body content of the page"],
    answer: 2
  },
  {
    question: "Which attribute is used to define an image in HTML?",
    options: ["src", "href", "alt", "title"],
    answer: 0
  },
  {
    question: "Which tag is used to define a list in HTML?",
    options: ["<ul>", "<li>", "<ol>", "<dl>"],
    answer: 0
  }
];

// Initialize the quiz
let currentQuestion = 0;
let score = 0;
const questionContainers = document.querySelectorAll(".question-container");
const questions = document.querySelectorAll(".question");
const options = document.querySelectorAll(".options");
const submitButton = document.getElementById("submit-button");
const scoreElement = document.getElementById("score");

function showQuestion() {
  questions[currentQuestion].innerText = quizData[currentQuestion].question;
  options[currentQuestion].innerHTML = "";
  quizData[currentQuestion].options.forEach((option, optionIndex) => {
    const button = document.createElement("button");
    button.innerText = option;
    button.classList.add("option");
    button.setAttribute("data-answer", optionIndex);
    options[currentQuestion].appendChild(button);
  });
  submitButton.disabled = true;
}

function selectOption() {
  const optionButtons = document.querySelectorAll(".option");
  optionButtons.forEach((optionButton) => {
    optionButton.addEventListener("click", () => {
      optionButtons.forEach((button) => {
        button.classList.remove("selected");
      });
      optionButton.classList.add("selected");
      submitButton.disabled = false;
    });
  });
}

function submitAnswers() {
  const selectedOption = options[currentQuestion].querySelector(".selected");
  if (selectedOption) {
    const answer = selectedOption.getAttribute("data-answer");
    if (answer == quizData[currentQuestion].answer) {
      score++;
    }
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      showQuestion();
    } else {
      showScore();
    }
  }
}

function showScore() {
  questionContainers.forEach((questionContainer) => {
    questionContainer.style.display = "none";
  });
  submitButton.style.display = "none";
  scoreElement.innerText = score + " out of " + quizData.length;
  document.getElementById("score-container").style.display = "block";
}

// Add event listeners
submitButton.addEventListener("click", submitAnswers);

// Set the data-question attribute for each question
questions.forEach((question, index) => {
  question.setAttribute("data-question", index);
});

// Start the quiz
showQuestion();
selectOption();
