
document.addEventListener('DOMContentLoaded', () => {
    if (!getCookie('sqrcorrectAnswers')) {
        setCookie('sqrcorrectAnswers', 0, 365);
    }
    if (!getCookie('sqrtotalQuestions')) {
        setCookie('sqrtotalQuestions', 0, 365);
    }
    displayScore();
    generateSquaresHint();

    document.getElementById('answer').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    });
});

let num;
let timer;
let timeLeft = 5;
let quizRunning = false; // Flag to track if the quiz is running

function startQuiz() {
    const button = document.getElementById('startStopButton');
    if (!quizRunning) {
        generateQuestion();
        button.textContent = "Stop Quiz"; 
        button.style.backgroundColor = '#fab2b2';
        quizRunning = true;
    } else {
        stopQuiz();
    }
}

function stopQuiz() {
    clearInterval(timer); // Stop the timer
    document.getElementById('questionCube').textContent = 'Question';
    document.getElementById('answer').value = '';
    document.getElementById('result').textContent = '';
    document.getElementById('timer').textContent = 'Timer';
    document.getElementById('startStopButton').textContent = "Start Quiz";
    document.getElementById('startStopButton').style.backgroundColor = 'white';
    quizRunning = false;
}

function generateQuestion() {
    num = Math.floor(Math.random() * 50) + 1;
    document.getElementById('questionCube').textContent = `What is the square of ${num}?`;
    document.getElementById('answer').value = '';
    document.getElementById('result').textContent = '';

    timeLeft = 5;
    document.getElementById('timer').textContent = `Time left: ${timeLeft}s`;
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    timeLeft--;
    document.getElementById('timer').textContent = `Time left: ${timeLeft}s`;

    if (timeLeft <= 0) {
        clearInterval(timer);
        document.getElementById('result').textContent = `Time's up! The correct answer was ${num * num}.`;
        incrementTotalQuestions();
        setTimeout(() => {
            quizRunning && generateQuestion();
        }, 3000);
    }
}

function checkAnswer() {
    clearInterval(timer);
    const answer = parseInt(document.getElementById('answer').value);
    const correctAnswer = num * num;

    if (answer === correctAnswer) {
        document.getElementById('result').textContent = 'Correct!';
        incrementCorrectAnswers();
    } else {
        document.getElementById('result').textContent = `Incorrect. The correct answer is ${correctAnswer}.`;
    }
    incrementTotalQuestions();
    setTimeout(() => {
        quizRunning && generateQuestion();
    }, 3000);
}

function incrementCorrectAnswers() {
    let correctAnswers = parseInt(getCookie('sqrcorrectAnswers'));
    correctAnswers += 1;
    setCookie('sqrcorrectAnswers', correctAnswers, 365);
    displayScore();
}

function incrementTotalQuestions() {
    let totalQuestions = parseInt(getCookie('sqrtotalQuestions'));
    totalQuestions += 1;
    setCookie('sqrtotalQuestions', totalQuestions, 365);
    displayScore();
}

function displayScore() {
    const correctAnswers = getCookie('sqrcorrectAnswers');
    const totalQuestions = getCookie('sqrtotalQuestions');
    document.getElementById('score').textContent = `Correct Answers: ${correctAnswers} / Total Questions: ${totalQuestions}`;
}

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function toggleHint() {
    const hintContainer = document.getElementById('squaresHintContainer');
    hintContainer.style.display = hintContainer.style.display === 'none' ? 'block' : 'none';
}

function generateSquaresHint() {
    const squaresHintDiv = document.getElementById('squaresHint');
    squaresHintDiv.innerHTML = '';

    const table = document.createElement('table');
    const tableBody = document.createElement('tbody');

    for (let i = 1; i <= 50; i++) {
        const row = document.createElement('tr');
        const cell1 = document.createElement('td');
        cell1.textContent = i;
        const cell2 = document.createElement('td');
        cell2.textContent = i * i;
        row.appendChild(cell1);
        row.appendChild(cell2);
        tableBody.appendChild(row);
    }

    table.appendChild(tableBody);
    squaresHintDiv.appendChild(table);
}

function clearScore() {
    setCookie('sqrcorrectAnswers', 0, 365);
    setCookie('sqrtotalQuestions', 0, 365);
    displayScore();
}
