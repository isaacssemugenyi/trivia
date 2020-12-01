// global variables
var questions; // objects containing the quiz questions
var count, score, scorePercentage, scoreDisplay, answer; // tracking variables
var correctAnswer, prevFlag; // flags
var choices, question, resultsPara, choicesPara; // elements being updated
var resetButton, prevButton; // buttons
var progressCount = 0, progress; // progress

questions = [
    {
        number: 0,
        question: "When did Uganda obtain indepedence?",
        choices: ["1997", "1945","1996", "1962"],
        answer: 3
    },
    {
        number: 1,
        question: "Which Ugandan has the most number of twitter followers?",
        choices: ["Y.K. Museveni", "Winnie Byanyima","Robert Kyagulanyi", "Kizza Besigye"],
        answer: 0
    },
    {
        number: 2,
        question: "Which of these is a book by Ernest Hemingway?",
        choices: ["Animal farm", "Old Man and the sea","Wuthering Heights", "Jane Eyre"],
        answer: 1
    },
    {
        number: 3,
        question: "How old is Elon Musk?",
        choices: ["25", "49", "34", "55"],
        answer: 1
    },
    {
        number: 4,
        question: "Which of these is an Apple product",
        choices: ["Macbook", "Samsung", "Tablet", "Nexus"],
        answer: 0
    }
];



// set tracking variables
count = 0;
score = 0;
correctAnswer = false;
prevFlag = false;



// grab html elements
choices = document.querySelectorAll('.choices');
question = document.getElementsByTagName('h2')[0];
resultsPara = document.getElementsByTagName('p')[0];
choicesPara = document.getElementsByTagName('p')[1];

resetButton = document.getElementsByClassName('reset')[0];
prevButton = document.getElementsByClassName('prev')[0];
progress = document.getElementById('progress-track');
scoreDisplay = document.getElementById('score-display');



// add the event listeners
window.onload = renderQuestion();

prevButton.addEventListener('click', prevQuestion);
resetButton.addEventListener('click', resetQuiz);
choices.forEach(function(choice) {
    choice.addEventListener('click', scoring);
});



// functions used
function scoring() {
    var myTimeout;
    // grab the answer of the current question
    answer = questions[count].answer;
    // prevButton is visible when a choice is selected
    prevFlag = true;
    
    // This is the span.choice that the user clicked
    if (this.innerText === questions[count].choices[answer]) {
        // correctAnswer waves for prevButton use
        correctAnswer = true;
        this.classList.add('right');
        document.getElementById('tick').style.display = 'block'; 
        score++;
    } else {
            correctAnswer = false;
            this.classList.add('wrong');
            document.getElementById('x').style.display = 'block'; 
    }
    
    // then render next question
    setTimeout(()=> nextQuestion() , 1000);
    setTimeout(() => {this.classList.remove('right')}, 950);
    setTimeout(() => {this.classList.remove('wrong')}, 950);
    setTimeout(() => {document.getElementById('tick').style.display = 'none';}, 950);
    setTimeout(() => {document.getElementById('x').style.display = 'none';}, 950);
    console.log(this);
    
}



function nextQuestion() {
    // count goes up
    count++;
    
    if (count > 5) {
        count = 5;
    } else if (count !== 5) {
        // numbers between 0 and 4 have questions that can be rendered
        renderQuestion();
    } else if (count === 5) {
        // quiz is over when count reaches 4
        renderCompletion();
    }
}



// the prevButton will only be available to go back one question
function prevQuestion() {
    // when the previous question renders, remove the prevButton
    prevFlag = false;
    
    // if the user originally clicked the correctAnswer, remove score
    if (correctAnswer) {
        correctAnswer = false;
        score--;
    }
    
    // then go back and render the old question
    count--;
    renderQuestion();
}




function renderQuestion() {
    
    // prevButton is hidden on the first page
    // and if the user attempts to go back more than one question
    if (!prevFlag) {
        prevButton.classList.add('hide');
    } else if (prevButton.classList.contains('hide')) {
        prevButton.classList.remove('hide');
    }
    
    // update question div with current question
    question.innerText = questions[count].question;
    
    // update each choice with the choices available in current question
    choices.forEach(function(choice, i) {
        choice.innerText = questions[count].choices[i];
    });
    
    updateProgress();
}

function renderCompletion() {
    updateProgress();
    scorePercentage = Math.round(score/5 * 100) + '%';
    
    // update with a thank you note and the user's percentage
    question.innerText = 'Thank you for Completing the Quiz!';
    resultsPara.innerText = 'Your score is: ' + scorePercentage;
    
    // reset avail, prevButton and choicesPara are removed
    choicesPara.classList.add('hide');
    prevButton.classList.add('hide');
    resetButton.classList.remove('hide');
}



function updateProgress() {
    // progressCount will be updated as count increases
    progress.innerHTML = `${count}/${questions.length}`;
    scoreDisplay.innerHTML = score == 1 || score == 0 ? score +" point" : score +" points"
}


function resetQuiz() {
    // reset tracking variables
    count = 0;
    score = 0;
    correctAnswer = false;
    prevFlag = false;
    
    // resultsPara is hidden
    resultsPara.innerText = '';
    
    // choicesPara displays while resetButton is hidden
    choicesPara.classList.remove('hide');
    resetButton.classList.add('hide');
    
    renderQuestion();
}