document.addEventListener('DOMContentLoaded', () => {
    if (!getCookie('cubcorrectAnswers')) {
        setCookie('cubcorrectAnswers', 0, 365);
    }
    if (!getCookie('cubtotalQuestions')) {
        setCookie('cubtotalQuestions', 0, 365);
    }
    displayScore();
    generateCubesHint();
    
    document.getElementById('answer').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    });
});


let timer; // Declare a variable to store the timer
let timeLeft = 5; // Set the initial time for the countdown
let quizRunning = false; 

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
    num = Math.floor(Math.random() * 20) + 1;
    document.getElementById('questionCube').textContent = `What is the cube of ${num}?`;
    document.getElementById('answer').value = '';
    document.getElementById('result').textContent = '';

    timeLeft = 5; // Reset the timer to 5 seconds
    document.getElementById('timer').textContent = `Time left: ${timeLeft}s`;
    clearInterval(timer); // Clear any existing timer
    timer = setInterval(updateTimer, 1000); // Start the countdown
}

function updateTimer() {
    timeLeft--;
    document.getElementById('timer').textContent = `Time left: ${timeLeft}s`;

    if (timeLeft <= 0) {
        clearInterval(timer); // Stop the timer when it reaches 0
        const correctAnswer = num * num * num;
        document.getElementById('result').textContent = `Time's up! The correct answer was ${correctAnswer}.`;
        incrementTotalQuestions();
        setTimeout(() => {
            quizRunning && generateQuestion();
        }, 3000); // Generate a new question after 3 seconds
    }
}

function checkAnswer() {
    clearInterval(timer); // Stop the timer as the user has answered
    const answer = parseInt(document.getElementById('answer').value);
    const correctAnswer = num * num * num;

    if (answer === correctAnswer) {
        document.getElementById('result').textContent = 'Correct!';
        incrementCorrectAnswers();
    } else {
        document.getElementById('result').textContent = `Incorrect. The correct answer is ${correctAnswer}.`;
    }
    incrementTotalQuestions();
    setTimeout(() => {
        quizRunning && generateQuestion();
    }, 3000); // Generate a new question after 3 seconds
}

function incrementCorrectAnswers() {
    let correctAnswers = parseInt(getCookie('cubcorrectAnswers'));
    correctAnswers += 1;
    setCookie('cubcorrectAnswers', correctAnswers, 365);
    displayScore();
}

function incrementTotalQuestions() {
    let totalQuestions = parseInt(getCookie('cubtotalQuestions'));
    totalQuestions += 1;
    setCookie('cubtotalQuestions', totalQuestions, 365);
    displayScore();
}

function displayScore() {
    const correctAnswers = getCookie('cubcorrectAnswers');
    const totalQuestions = getCookie('cubtotalQuestions');
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
    const hintContainer = document.getElementById('cubesHintContainer');
    hintContainer.style.display = hintContainer.style.display === 'none' ? 'block' : 'none';
}

function generateCubesHint() {
    const cubesHintDiv = document.getElementById('cubesHint');
    cubesHintDiv.innerHTML = ''; // Clear any existing hints

    const table = document.createElement('table');
    const tableBody = document.createElement('tbody');

    for (let i = 1; i <= 20; i++) {
        const row = document.createElement('tr');
        const cell1 = document.createElement('td');
        cell1.textContent = i;
        const cell2 = document.createElement('td');
        cell2.textContent = i * i * i;
        row.appendChild(cell1);
        row.appendChild(cell2);
        tableBody.appendChild(row);
    }
    
    table.appendChild(tableBody);
    cubesHintDiv.appendChild(table);
}

function clearScore() {
    setCookie('cubcorrectAnswers', 0, 365);
    setCookie('cubtotalQuestions', 0, 365);
    displayScore();
}
