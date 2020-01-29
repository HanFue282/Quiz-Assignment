//Time counter for quiz.
var timeCounter = document.querySelector(".time");
var mainCounter = document.getElementById("main");

//Seconds for timer.
var secondsLeft = 60;

function setTime() {

    var timerInterval = setInterval(function() {
        secondsLeft--;
        timeCounter.textContent = secondsLeft + " seconds left";

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            sendMessage();
        }
    }, 1000)
}

//When timer reaches 0.
function sendMessage() {
    timeCounter.textContent = " ";

    var failQuiz = document.createElement("main");
    var seeResults = document.createElement("button");

    failQuiz.setAttribute("h1", ("You failed the quiz..."));
    seeResults.setAttribute("button", "btn btn-danger");
    mainCounter.appendChild(failQuiz + seeResults);
}

setTime();

//Questions and answers
var questionPrompt = document.querySelector("#question-prompt");


var questions = [
    new Question("1. Who said <i>'Hello there'</i> in the Star Wars prequels?", ["General Skywalker", "General Grivous", "Count Dooku", "General Kenobi"], "General Kenobi");
    new Question("2. 'All your base are belong to us.' Which video game did this quote come from?", ["Star Fox", "Zero Wing", "Star Trek: Bridge Crew", "Mass Effect: Andromeda"], "Zero Wing");
    new Question("3. Remember, ______, you are the one who will open the door.", ["Sora from <i>Kingdom Hearts</i>", "Noctis from <i>Final Fantasy XV</i>", "Max from <i>Life is Strange</i>", "Lara from <i>Rise of the Tomb Raider</i>"], "Sora from <i>Kingdom Hearts</i>");
    new Question("4. Which Robin William film did this quote come from? <i>'You're a good man. I know that. Even if you've forgotten it.'</i>", ["<i>The Final Cut</i>", "<i>Dead Again</i>", "<i>Insomnia</i>", "<i>World's Greatest Dad</i>"], "<i>Insomnia</i>");
    new Question("5. <i>'A sword wields no strength unless the hands that holds it has courage.'</i>", ["Flemeth,<i>Dragon Age Origins</i>","The Hero's Shade,<i>Legend of Zelda: Twilight Princess</i>","Clay Kaczmarek,<i>Assassin's Creed Brotherhood</i>","Ingun Black-Briar,<i>Elder Scrolls V: Skyrim</i>"], "The Hero's Shade,<i>Legend of Zelda: Twilight Princess</i>");
];

function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}
