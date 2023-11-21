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

function checkAnswer(userAnswer) {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    if (userAnswer === correctAnswer) {
        resultElement.innerText = 'Correct!';
        createConfetti();
    } else {
        resultElement.innerText = 'Incorrect!';
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
        resultElement.innerText = '';
    } else {
        // Show final score or submit the answers to a server
        resultElement.innerText = 'Quiz completed!';
        nextButton.style.display = 'none';
        optionsElement.innerHTML = '';
        questionElement.innerText = '';
    }
}

function createConfetti() {
    const scalar = 3;
    const pineapple = confetti.shapeFromText({ text: '💕', scalar, gravity: 0.3 });

    confetti({
    shapes: [pineapple, 'circle'],
    scalar,
    });
} 