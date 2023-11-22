const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-btn');
const resultElement = document.getElementById('result');

let currentQuestionIndex = 0;
let questions;

// Fetch questions from the JSON file
// fetch('questions.json')
//     .then(response => response.json())
//     .then(data => {
//         questions = data.questions;
//         displayQuestion();
//     })
//     .catch(error => console.error('Error fetching questions:', error));

document.getElementById('loader').style.display = 'block';
document.getElementById('next-btn').style.display = 'none';

fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
        "content-type": "application/json",
        "Authorization": 'Bearer ' + 'xxx'
    },
    body: JSON.stringify({
        "model": "gpt-4-1106-preview",
        "response_format": {
            "type": "json_object"
        },
        "messages": [
            {
                "role": "system",
                "content": "Return the output as JSON for questions for a user based on the details provided by user...... Don't use \n in the json and respond with an API like json."
            },
            {
                "role": "user",
                "content": "Generate an array with questions from biology. The structure of each question must be: {question: string, options: array<string>, correctAnswer: integer} the correctAnswer property is the correct option index on the options array. The response must be in json format."
            }
        ],
        "temperature": 0.7
    })
}).then(response => {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('next-btn').style.display = 'inline-block';

    return response.json().then(data => {
        return JSON.parse(data.choices[0].message.content);
    })
}).then(openAiData => {
    questions = openAiData.questions;
    console.log(questions);
    displayQuestion();
}).catch(err => {
    console.error('Error fetching data:', error);
    // Hide the loader even if there's an error
    document.getElementById('loader').style.display = 'none';
    document.getElementById('next-btn').style.display = 'inline-block';

});

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
        // Show final score
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