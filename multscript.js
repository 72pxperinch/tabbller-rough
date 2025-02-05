// document.addEventListener('DOMContentLoaded', () => {
//     if (!getCookie('score')) {
//         setCookie('score', 0, 365);
//     }
//     displayScore();
//     generateTableButtons();
// });

// let selectedTables = [];
// let num1, num2;

// function generateTableButtons() {
//     const tableButtonsDiv = document.getElementById('tableButtons');
//     for (let i = 1; i <= 30; i++) {
//         const button = document.createElement('button');
//         button.className = 'table-button';
//         button.textContent = `${i}`;
//         button.dataset.value = i;
//         button.onclick = () => toggleTableSelection(button);
//         tableButtonsDiv.appendChild(button);
//     }
// }

// function toggleTableSelection(button) {
//     const tableValue = parseInt(button.dataset.value);
//     const index = selectedTables.indexOf(tableValue);

//     if (index === -1) {
//         selectedTables.push(tableValue);
//         button.classList.add('selected');
//     } else {
//         selectedTables.splice(index, 1);
//         button.classList.remove('selected');
//     }
// }

// function startQuiz() {
//     if (selectedTables.length > 0) {
//         generateQuestion();
//     } else {
//         alert('Please select at least one table to start the quiz.');
//     }
// }


// let timer; // Declare a variable to store the timer
// let timeLeft = 5; // Set the initial time for the countdown

// function generateQuestion() {
//     if (selectedTables.length > 0) {
//         num1 = selectedTables[Math.floor(Math.random() * selectedTables.length)];
//         num2 = Math.floor(Math.random() * 30) + 1;
//         document.getElementById('question').textContent = `${num1} x ${num2} = `;
//         document.getElementById('answer').value = '';
//         document.getElementById('result').textContent = '';

//         timeLeft = 5; // Reset the timer to 10 seconds
//         document.getElementById('timer').textContent = `Time left: ${timeLeft}s`;
//         clearInterval(timer); // Clear any existing timer
//         timer = setInterval(updateTimer, 1000); // Start the countdown
//     }
// }

// function updateTimer() {
//     timeLeft--;
//     document.getElementById('timer').textContent = `Time left: ${timeLeft}s`;

//     if (timeLeft <= 0) {
//         clearInterval(timer); // Stop the timer when it reaches 0
//         document.getElementById('result').textContent = `Time's up! The correct answer was ${num1 * num2}.`;
//         setTimeout(generateQuestion, 3000); // Generate a new question after 1 second
//     }
// }



// function checkAnswer() {
//     clearInterval(timer); // Stop the timer as the user has answered
//     const answer = parseInt(document.getElementById('answer').value);
//     const correctAnswer = num1 * num2;

//     if (answer === correctAnswer) {
//         document.getElementById('result').textContent = 'Correct!';
//         incrementScore();
//     } else {
//         document.getElementById('result').textContent = `Incorrect. The correct answer is ${correctAnswer}.`;
//     }
//     setTimeout(generateQuestion, 3000);
// }

// function incrementScore() {
//     let score = parseInt(getCookie('score'));
//     score += 1;
//     setCookie('score', score, 365);
//     displayScore();
// }

// function displayScore() {
//     const score = getCookie('score');
//     document.getElementById('score').textContent = `Score: ${score}`;
// }

// function setCookie(name, value, days) {
//     const date = new Date();
//     date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
//     const expires = "expires=" + date.toUTCString();
//     document.cookie = name + "=" + value + ";" + expires + ";path=/";
// }

// function getCookie(name) {
//     const nameEQ = name + "=";
//     const ca = document.cookie.split(';');
//     for (let i = 0; i < ca.length; i++) {
//         let c = ca[i];
//         while (c.charAt(0) === ' ') c = c.substring(1, c.length);
//         if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
//     }
//     return null;
// }

// function toggleHint() {
//     const hintContainer = document.getElementById('tablesHintContainer');
//     if (selectedTables.length > 0) {
//         generateTablesHint();
//         hintContainer.style.display = hintContainer.style.display === 'none' ? 'flex' : 'none';
//     } else {
//         alert('Please select at least one table to see the hint.');
//     }
// }

// function generateTablesHint() {
//     const tablesHintDiv = document.getElementById('tablesHint');
//     tablesHintDiv.innerHTML = ''; // Clear any existing hints
//     selectedTables.forEach(table => {
//         // Create a div container to hold the table and heading
//         const tableContainer = document.createElement('div');
        
//         const tableTitle = document.createElement('h3');
//         tableTitle.textContent = `Table of ${table}`;
//         tableContainer.appendChild(tableTitle);
    
//         const tableElement = document.createElement('table');
//         const tableHead = document.createElement('thead');
//         const tableBody = document.createElement('tbody');
//         const headRow = document.createElement('tr');
//         const th1 = document.createElement('th');
//         const th2 = document.createElement('th');
    
//         th1.textContent = 'Expression';
//         th2.textContent = 'Result';
    
//         headRow.appendChild(th1);
//         headRow.appendChild(th2);
//         tableHead.appendChild(headRow);
//         tableElement.appendChild(tableHead);
    
//         for (let i = 1; i <= 30; i++) {
//             const row = document.createElement('tr');
//             const cell1 = document.createElement('td');
//             const cell2 = document.createElement('td');
    
//             cell1.textContent = `${table} * ${i}`;
//             cell2.textContent = table * i;
    
//             row.appendChild(cell1);
//             row.appendChild(cell2);
//             tableBody.appendChild(row);
//         }
//         tableElement.appendChild(tableBody);
    
//         // Append the table to the div container
//         tableContainer.appendChild(tableElement);
    
//         // Append the div container to tablesHintDiv
//         tablesHintDiv.appendChild(tableContainer);
//     });
// }

// function clearScore() {
//     setCookie('score', 0, 365);
//     displayScore();
// }


document.addEventListener('DOMContentLoaded', () => {
    if (!getCookie('correctAnswers')) {
        setCookie('correctAnswers', 0, 365);
    }
    if (!getCookie('totalQuestions')) {
        setCookie('totalQuestions', 0, 365);
    }
    displayScore();
    generateTableButtons();
        
    document.getElementById('answer').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    });
});

let selectedTables = [];
let num1, num2;

function generateTableButtons() {
    const tableButtonsDiv = document.getElementById('tableButtons');
    for (let i = 1; i <= 30; i++) {
        const button = document.createElement('button');
        button.className = 'table-button';
        button.textContent = `${i}`;
        button.dataset.value = i;
        button.onclick = () => toggleTableSelection(button);
        tableButtonsDiv.appendChild(button);
    }
}

function toggleTableSelection(button) {
    const tableValue = parseInt(button.dataset.value);
    const index = selectedTables.indexOf(tableValue);

    if (index === -1) {
        selectedTables.push(tableValue);
        button.classList.add('selected');
    } else {
        selectedTables.splice(index, 1);
        button.classList.remove('selected');
    }
}

// function startQuiz() {
//     if (selectedTables.length > 0) {
//         generateQuestion();
//     } else {
//         alert('Please select at least one table to start the quiz.');
//     }
// }

let timer; // Declare a variable to store the timer
let timeLeft = 5; // Set the initial time for the countdown
let quizRunning = false; 

function startQuiz() {
    const button = document.getElementById('startStopButton');
    if (selectedTables.length > 0 && !quizRunning) {
        generateQuestion();
        button.textContent = "Stop Quiz"; 
        button.style.backgroundColor = '#fab2b2';
        quizRunning = true;
    } else { if (selectedTables.length > 0 && quizRunning) {
        stopQuiz();
    } else {
        alert('Please select at least one table to start the quiz.')
    }
    }
}

function stopQuiz() {
    clearInterval(timer); // Stop the timer
    document.getElementById('answer').value = '';
    document.getElementById('result').textContent = '';
    document.getElementById('timer').textContent = 'Timer';
    document.getElementById('startStopButton').textContent = "Start Quiz";
    document.getElementById('startStopButton').style.backgroundColor = 'white';
    quizRunning = false;
}

function generateQuestion() {
    if (selectedTables.length > 0) {
        num1 = selectedTables[Math.floor(Math.random() * selectedTables.length)];
        num2 = Math.floor(Math.random() * 30) + 1;
        document.getElementById('question').textContent = `${num1} x ${num2} = `;
        document.getElementById('answer').value = '';
        document.getElementById('result').textContent = '';

        timeLeft = 5; // Reset the timer to 5 seconds
        document.getElementById('timer').textContent = `Time left: ${timeLeft}s`;
        clearInterval(timer); // Clear any existing timer
        timer = setInterval(updateTimer, 1000); // Start the countdown
    }
}

function updateTimer() {
    timeLeft--;
    document.getElementById('timer').textContent = `Time left: ${timeLeft}s`;

    if (timeLeft <= 0) {
        clearInterval(timer); // Stop the timer when it reaches 0
        const correctAnswer = num1 * num2;
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
    const correctAnswer = num1 * num2;

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
    let correctAnswers = parseInt(getCookie('correctAnswers'));
    correctAnswers += 1;
    setCookie('correctAnswers', correctAnswers, 365);
    displayScore();
}

function incrementTotalQuestions() {
    let totalQuestions = parseInt(getCookie('totalQuestions'));
    totalQuestions += 1;
    setCookie('totalQuestions', totalQuestions, 365);
    displayScore();
}

function displayScore() {
    const correctAnswers = getCookie('correctAnswers');
    const totalQuestions = getCookie('totalQuestions');
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
    const hintContainer = document.getElementById('tablesHintContainer');
    if (selectedTables.length > 0) {
        generateTablesHint();
        hintContainer.style.display = hintContainer.style.display === 'none' ? 'flex' : 'none';
    } else {
        alert('Please select at least one table to see the hint.');
    }
}

function generateTablesHint() {
    const tablesHintDiv = document.getElementById('tablesHint');
    tablesHintDiv.innerHTML = ''; // Clear any existing hints
    selectedTables.forEach(table => {
        // Create a div container to hold the table and heading
        const tableContainer = document.createElement('div');
        
        const tableTitle = document.createElement('h3');
        tableTitle.textContent = `Table of ${table}`;
        tableContainer.appendChild(tableTitle);
    
        const tableElement = document.createElement('table');
        const tableHead = document.createElement('thead');
        const tableBody = document.createElement('tbody');
        const headRow = document.createElement('tr');
        const th1 = document.createElement('th');
        const th2 = document.createElement('th');
    
        th1.textContent = 'Expression';
        th2.textContent = 'Result';
    
        headRow.appendChild(th1);
        headRow.appendChild(th2);
        tableHead.appendChild(headRow);
        tableElement.appendChild(tableHead);
    
        for (let i = 1; i <= 30; i++) {
            const row = document.createElement('tr');
            const cell1 = document.createElement('td');
            const cell2 = document.createElement('td');
    
            cell1.textContent = `${table} * ${i}`;
            cell2.textContent = table * i;
    
            row.appendChild(cell1);
            row.appendChild(cell2);
            tableBody.appendChild(row);
        }
        tableElement.appendChild(tableBody);
    
        // Append the table to the div container
        tableContainer.appendChild(tableElement);
    
        // Append the div container to tablesHintDiv
        tablesHintDiv.appendChild(tableContainer);
    });
}

function clearScore() {
    setCookie('correctAnswers', 0, 365);
    setCookie('totalQuestions', 0, 365);
    displayScore();
}
