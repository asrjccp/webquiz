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
const questionElements = document.querySelectorAll(".question");
const optionElements = document.querySelectorAll(".options");
const submitButton = document.getElementById("submit-button");
const scoreElement = document.getElementById("score");

function showQuestion() {
  questionElements.forEach((question, index) => {
    question.innerText = quizData[index].question;
    optionElements[index].innerHTML = "";
    quizData[index].options.forEach((option, optionIndex) => {
      const button = document.createElement("button");
      button.innerText = option;
      button.classList.add("option");
      button.setAttribute("data-answer", optionIndex);
      optionElements[index].appendChild(button);
    });
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

function submitAnswers() {
  const selectedOptions = document.querySelectorAll(".selected");
  if (selectedOptions.length > 0) {
    selectedOptions.forEach((selectedOption) => {
      const answer = selectedOption.getAttribute("data-answer");
      const questionIndex = selectedOption.parentNode.parentNode.querySelector(".question").getAttribute("data-question");
      if (answer == quizData[questionIndex].answer) {
        score++;
      }
    });
    showScore();
  }
}

function showScore() {
questionElements.forEach((question) => {
question.style.display = "none";
});
optionElements.forEach((option) => {
option.style.display = "none";
});
submitButton.style.display = "none";
scoreElement.innerText = score + " out of " + quizData.length;
document.getElementById("score-container").style.display = "block";
}

// Add event listeners
submitButton.addEventListener("click", submitAnswers);

// Set the data-question attribute for each question
questionElements.forEach((question, index) => {
question.setAttribute("data-question", index);
});

// Start the quiz
showQuestion();
selectOption();
