/*
 * questions.js is loaded in the HTML before quiz.js
 * It creates a global variable called questions that contains starter questions.
 * Take a look at the structure and familiarize yourself with each part
 * then, add some of your own questions!
 * Use this data to populate your quiz questions, choices, and answers.
 */
console.log(questions);

let totalQuestions = questions.length;
let currentQuestionNumber = 0;
let question = "";
let choices = [];
let answer = "";

let timerSection = document.getElementById("time");
let timer = document.getElementById("timer");
let containerSection = document.getElementById("container");

document.getElementById("start").addEventListener("click", startQuiz);

function startQuiz()
{
    clearContainer();
    displayQuestion();
    startTimer();
}

function clearContainer() {
    containerSection.innerHTML = "";   
}

function displayQuestion() {
    question = questions[currentQuestionNumber].title;
    choices = questions[currentQuestionNumber].choices;

    let title = document.createElement("h2");
    title.textContent = question;

    let fieldSet = document.createElement("fieldset");

    let choice;
    for (let i = 0; i < choices.length; i++)
    {
        let option = document.createElement("input");
        let label = document.createElement("label");
        let newLine = document.createElement("br");

        choice = choices[i];
        option.type = "radio";
        option.id = choice;
        option.name = "options";
        option.value = choice;
        fieldSet.appendChild(option);

        label.textContent = choice;
        label.for = option.id;
        fieldSet.appendChild(label);

        fieldSet.appendChild(newLine);
    }

    containerSection.appendChild(title);
    containerSection.appendChild(fieldSet);
}

function startTimer() {

}




