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
const questionElement = document.getElementById("question");
const optionElements = document.getElementById("options");
const scoreElement = document.getElementById("score");
const submitButton = document.getElementById("submit-button");

function showQuestion() {
  const currentQuizData = quizData[currentQuestion];
  questionElement.innerText = currentQuizData.question;
  optionElements.innerHTML = "";
  currentQuizData.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.innerText = option;
    button.classList.add("option");
    button.setAttribute("data-answer", index);
    optionElements.appendChild(button);
  });
  submitButton.disabled = true;
}

function selectOption() {
  const options = document.querySelectorAll(".option");
  options.forEach((option) => {
    option.addEventListener("click", () => {
      options.forEach((option) => {
        option.classList.remove("selected");
      });
      option.classList.add("selected");
      submitButton.disabled = false;
    });
  });
}

function submitAnswer() {
  const selectedOption = document.querySelector(".selected");
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
  questionElement.style.display = "none";
  optionElements.style.display = "none";
  submitButton.style.display = "none";
  scoreElement.innerText = score + " out of " + quizData.length;
  document.getElementById("score-container").style.display = "block";
}

// Add event listeners
submitButton.addEventListener("click", submitAnswer);

// Start the quiz
showQuestion();
selectOption();
