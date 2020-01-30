//Start quiz menu.

setMain();
function setMain() {
    
    var startQuizHTML = "<h1><center>Welcome to the quiz!</center></h1>";
    startQuizHTML += "<p><center>Press the button to start</center></p><p><center><button class= 'btn btn-danger'>Start</button></center></p>";
    var element = document.getElementById("quiz");
    element.innerHTML = startQuizHTML;

    
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

setTime();
//When timer reaches 0.
function timeout() { 
    var timeOutHTML = "<h1><center>Result</center></h1>";
    timeOutHTML += "<h2 id='score'><center> Your scores: " + quiz.score + "</center></h2><p><center><button class='btn btn-danger'>Restart Quiz</button></center</p>";
    var element = document.getElementById("quiz");
    element.innerHTML = timeOutHTML;

    mainCounter.appendChild();
    
}

//Scoring on questions.
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex= function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess= function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
        this.secondsLeft++;
    }
    else{
        this.score--;
        this.secondsLeft--;
    }

    this.questionIndex++;
    }

Quiz.prototype.isEnded= function() {
    return this.questionIndex === this.questions.length;
}

function Question(text, options, answer) {
    this.text = text;
    this.options = options;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer= function(option) {
    return this.answer === option;
}

function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        //Shows question prompt.
        var element = document.getElementById("question-prompt");
        element.innerHTML = quiz.getQuestionIndex().text;

        //Shows options for the question.
        var options = quiz.getQuestionIndex().options;
        for(var i = 0; i < options.length; i++) {
            var element = document.getElementById("option" + i);
            element.innerHTML = options[i];
            guess("button" + i, options[i]);
        }
        showProgress();
    }
}


function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
}

//The question, options, and answer.
var questions = [
    new Question("1. Who said <i>'Hello there'</i> in the Star Wars prequels?", ["General Skywalker", "General Grivous", "Count Dooku", "General Kenobi"], "General Kenobi"),
    new Question("2. <i>'All your base are belong to us.'</i> Which video game did this quote come from?", ["Star Fox", "Zero Wing", "Star Trek: Bridge Crew", "Mass Effect: Andromeda"], "Zero Wing"),
    new Question("3. <i>Remember, you are the one who will open the door.</i> Which game did this quote come from?", ["<i>Kingdom Hearts</i>", "<i>Final Fantasy XV</i>", "<i>Life is Strange</i>", "<i>Rise of the Tomb Raider</i>"], "<i>Kingdom Hearts</i>"),
    new Question("4. Which of Robin Williams' film did this quote come from? <i>'You're a good man. I know that. Even if you've forgotten it.'</i>", ["<i>The Final Cut</i>", "<i>Dead Again</i>", "<i>Insomnia</i>", "<i>World's Greatest Dad</i>"], "<i>Insomnia</i>"),
    new Question("5. <i>'A sword wields no strength unless the hands that holds it has courage.'</i>", ["Flemeth,<i> Dragon Age Origins</i>","The Hero's Shade,<i> Legend of Zelda: Twilight Princess</i>","Clay Kaczmarek,<i> Assassin's Creed Brotherhood</i>","Ingun Black-Briar,<i> Elder Scrolls V: Skyrim</i>"], "The Hero's Shade,<i> Legend of Zelda: Twilight Princess</i>"),
];

//End result at the end of quiz.
function showScores() {
    var gameOverHTML = "<h1><center>Result</center></h1>";
    gameOverHTML += "<h2 id='score'><center> Your scores: " + quiz.score + "</center></h2><p><center><button class='btn btn-danger'>Restart Quiz</button></center</p>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
    
}
    //Store name function isn't quite working, will look for a solution.
    //function storeNames() {
    //var names = "<div class='names'>";
    //var nameForm = "<form id='nameInput' method='POST'>";
    //var labelForm = "<label for= 'inputName'>" + "Enter name:" + "</label>";
    //var inputName = "<input type= placeholder='Initials only' name='text-name' id='text-name'/>"
    //var nameList = "<ul id= 'name-list'></ul>"
    
    //localStorage.setItem("names", JSON.stringify(names));
    //}
    //nameForm.addEventListener("submit", function(event) {
    //    event.preventDefault();

    //    nameList = inputName.valueOf.trim();
    //    if(nameList === "") {
    //        return;
    //    }

    //    names.push(nameList);
    //    inputName.value = "";

    //    storeNames();
    //})
    


//Tab on the bottom of questions and answers.
function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
}

var quiz = new Quiz(questions);

populate();
