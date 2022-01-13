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
let selectedChoice = "";

let resultParagraph;
let buttonDiv;

let timerSection = document.getElementById("time");
let timer = document.getElementById("timer");
let containerSection = document.getElementById("container");

// Add event listener for the start quiz button click
document.getElementById("start").addEventListener("click", startQuiz);

// This function starts the quiz
function startQuiz() {
    clearContainer();
    displayQuestion();
    startTimer();
}

// This clears the container section
function clearContainer() {
    containerSection.innerHTML = "";
}

// This displays each question.
function displayQuestion() {
    getCurrentQuestion();

    // Creates the question
    let title = document.createElement("h2");
    title.textContent = question;

    // Creates the multiple choices for each question as radio buttons
    let fieldSet = document.createElement("fieldset");

    let choice;
    for (let i = 0; i < choices.length; i++) {
        let option = document.createElement("input");
        let label = document.createElement("label");
        let newLine = document.createElement("br");

        choice = choices[i];
        option.type = "radio";
        option.id = choice;
        option.name = "options";
        option.value = choice;
        fieldSet.appendChild(option);
        option.addEventListener("click", selectOption);

        label.textContent = choice;
        label.for = option.id;
        fieldSet.appendChild(label);

        fieldSet.appendChild(newLine);
    }

    containerSection.appendChild(title);
    containerSection.appendChild(fieldSet);

    // Creates the check button
    createCheckButton();
}

// Gets the current question, choices and answers
function getCurrentQuestion() {
    question = questions[currentQuestionNumber].title;
    choices = questions[currentQuestionNumber].choices;
    answer = questions[currentQuestionNumber].answer;
}

// Creates the check button
function createCheckButton() {
    buttonDiv = document.createElement("div");
    let checkButton = document.createElement("button");
    checkButton.textContent = "Check answer";
    buttonDiv.appendChild(checkButton);
    containerSection.appendChild(buttonDiv);
    checkButton.addEventListener("click", checkAnswer);

    // Creates the paragraph element to show the result
    createResultParagraphElement();
}

function createResultParagraphElement() {
    resultParagraph = document.createElement("p");
    containerSection.appendChild(resultParagraph);
}

// Event handler for option selection
function selectOption(event) {
    selectedChoice = event.target.value;
}

function startTimer() {

}

function checkAnswer() {
    // If user did not select any option, the function returns
    if (!validateUserInput())
    {
        return;
    }

    let result;
    if (selectedChoice === answer)
    {
        result = "Correct answer!";
    }
    else {
        result = "Wrong answer";
    }

    // Displays the result.
    showResult(result);
    
    // Once user selects an option, they cannot select another option.
    disableUserInputs();

    // Adds the next button after user answers the current question.
    addNextButton();
}

// Validates whether user selected any option
function validateUserInput() {
    if (selectedChoice)
    {
        return true;
    }
    else {
        showResult("Please select your answer");
        return false;
    }
}

// Shows the result when user checks the answer.
function showResult(value) {
    resultParagraph.textContent = value;
}

// Disables the user inputs
function disableUserInputs() {
    // Diables the field set containing radio buttons.
    containerSection.children[1].setAttribute("disabled", "");
    // Disables the check answer button
    containerSection.children[2].firstChild.setAttribute("disabled", "");
}

// Adds the Next button
function addNextButton() {
    let nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    buttonDiv.appendChild(nextButton);  
    nextButton.addEventListener("click", nextQuestion());
}






