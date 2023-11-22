const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-btn');
const resultElement = document.getElementById('result');

let currentQuestionIndex = 0;
let questions;

// Fetch questions from the JSON file
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data.questions;
        displayQuestion();
    })
    .catch(error => console.error('Error fetching questions:', error));

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    optionsElement.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option');
        button.onclick = () => checkAnswer(index);
        optionsElement.appendChild(button);
    });
}

function checkAnswer(userIndexAnswer) {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    if (userIndexAnswer === correctAnswer) {
        resultElement.innerText = 'Correct!';
    } else {
        resultElement.innerText = 'Incorrect!';
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    displayQuestion();
}