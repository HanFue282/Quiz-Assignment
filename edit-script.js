//Using prototype method can bring the quiz together.

//Quiz main start.
//function setMain() {
//    var startQuizHTML = "<h1><center>Welcome to the quiz!</center></h1>";
//    startQuizHTML += "<p><center>Press the button to start</center></p><p><center><button class= 'btn btn-danger' a onclick= 'quizContent()'>Start</button></center></p>";
//    var element = document.getElementById("quiz");
//    element.innerHTML = startQuizHTML;
//}
//setMain();

//Questions and options shall be shown.
function quizContent(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionPromptIndex = 0;
}

//Time counter for quiz.
var timeCounter = document.querySelector(".time");

//Seconds for timer.
var secondsLeft = 60;

function setTime() {

    var timerInterval = setInterval(function() {
        secondsLeft--;
        timeCounter.textContent = secondsLeft + " seconds left";

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            timeout();
        }
    }, 1000)
}

function timeout() {
    var timeOutHTML = "<h1><center>Time out</center></h1>";
    timeOutHTML += "<h2 id='score'><center> Your scores: " + quiz.score + "</center></h2><p><center><button class='btn btn-danger'>Restart Quiz</button></center</p>";
    var element = document.getElementById("quiz");
    element.innerHTML = timeOutHTML;
}

quizContent.prototype.getQuestionPrompt = function () {
    return this.questions[this.questionPromptIndex];
}

//When answers are picked from user.
//If user pick correct answer then time will go up.
//If user picked wrong answer then time will go down.
quizContent.prototype.corrIncorr = function (answer) {
    if(this.getQuestionPrompt().isCorrectAnswer(answer)) {
        this.score++;
        this.secondsLeft++;
    }
    else {
        this.score--;
        this.secondsLeft--;
    }

    this.questionPromptIndex++;
}

quizContent.prototype.quizEnded = function () {
    return this.questionPromptIndex === this.questions.length;
}

//The question will show first, followed by the options of answers.
function promptQnA(text, options, answer) {
    this.text = text;
    this.options = options;
    this.answer = answer;
}

//Then for each question, the answer will be detected from the option.
promptQnA.prototype.isCorrectAnswer = function (option) {
    return this.answer === option;
}

//For when the quiz has ended or quiz is still being taken.
function contentQuiz() {
    if(quiz.quizEnded()) {
        showScores();
    }
    else {
        //Shows question.
        var element = document.getElementById("question-prompt");
        element.innerHTML = quiz.getQuestionPrompt().text;

        //Shows options for the question.
        var options = quiz.getQuestionPrompt().options;
        for (let i = 0; i < options.length; i++) {
            var element = document.getElementById("option" + i);
            element.innerHTML = options[i];
            corrIncorr("button" + i, options[i]);
            
        }
        showProgress();
    }
}

//Buttons will have assigned options by id. User will guess answer.
function corrIncorr(id,corrIncorr) {
    var button = document.getElementById(id);
    
    button.onclick = function() {
        quiz.corrIncorr(corrIncorr);
        contentQuiz();
    }
}

//The question, option, and answer are listed ans labeled down.
var questions = [
    new promptQnA("1. Who said <i>'Hello there'</i> in the Star Wars prequels?", ["General Skywalker", "General Grivous", "Count Dooku", "General Kenobi"], "General Kenobi"),
    new promptQnA("2. <i>'All your base are belong to us.'</i> Which video game did this quote come from?", ["Star Fox", "Zero Wing", "Star Trek: Bridge Crew", "Mass Effect: Andromeda"], "Zero Wing"),
    new promptQnA("3. <i>Remember, you are the one who will open the door.</i> Which game did this quote come from?", ["<i>Kingdom Hearts</i>", "<i>Final Fantasy XV</i>", "<i>Life is Strange</i>", "<i>Rise of the Tomb Raider</i>"], "<i>Kingdom Hearts</i>"),
    new promptQnA("4. Which of Robin Williams' film did this quote come from? <i>'You're a good man. I know that. Even if you've forgotten it.'</i>", ["<i>The Final Cut</i>", "<i>Dead Again</i>", "<i>Insomnia</i>", "<i>World's Greatest Dad</i>"], "<i>Insomnia</i>"),
    new promptQnA("5. <i>'A sword wields no strength unless the hands that holds it has courage.'</i>", ["Flemeth,<i> Dragon Age Origins</i>","The Hero's Shade,<i> Legend of Zelda: Twilight Princess</i>","Clay Kaczmarek,<i> Assassin's Creed Brotherhood</i>","Ingun Black-Briar,<i> Elder Scrolls V: Skyrim</i>"], "The Hero's Shade,<i> Legend of Zelda: Twilight Princess</i>"),
];

//This will appear at the end of the quiz when all questions are answered.
function showScores() {
    var gameOverHTML = "<h1><center>Result</center></h1>";
    gameOverHTML += "<h2 id='score'><center> Your scores: " + quiz.score + "</center></h2><p><center><button class='btn btn-danger'>Restart Quiz</button></center</p>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
}

//The content on the bottom of the quiz will show how many questions out of the quiz.
function showProgress() {
    var currentQuestionNumber = quiz.questionPromptIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " +currentQuestionNumber + " of " +quiz.questions.length;
}

var quiz = new quizContent(questions);
setTime();
contentQuiz();
