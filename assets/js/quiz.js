/*
 * questions.js is loaded in the HTML before quiz.js
 * It creates a global variable called questions that contains starter questions.
 * Take a look at the structure and familiarize yourself with each part
 * then, add some of your own questions!
 * Use this data to populate your quiz questions, choices, and answers.
 */

let totalQuestions = questions.length;
let currentQuestionNumber = 0;
let question = "";
let choices = [];
let answer = "";
let selectedChoice = "";
let score = 0;
let initials = "";
// Gets the high score from the local storage
let highScore = localStorage.getItem("highScore") || 0;

let resultParagraph;
let buttonDiv;

let timerSection = document.getElementById("time");
let timer = document.getElementById("timer");
let containerSection = document.getElementById("container");

// Saves the initial html content of container section
let initialContent = containerSection.innerHTML;

// Add event listener for the start quiz button click
document.getElementById("start").addEventListener("click", startQuiz);

// This function starts the quiz
function startQuiz() {
    clearContainer();
    displayQuestion();
    timerSection.style.visibility = "visible";
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

function stopTimer() {

}

function checkAnswer() {
    // If user did not select any option, the function returns
    if (!validateUserInput()) {
        return;
    }

    let result;
    if (selectedChoice === answer) {
        result = "Correct answer!";
        score++;
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
    if (selectedChoice) {
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
    containerSection.getElementsByTagName("fieldset")[0].setAttribute("disabled", "");
    // Disables the check answer button
    containerSection.getElementsByTagName("div")[0].firstChild.setAttribute("disabled", "");
}

// Adds the Next button
function addNextButton() {
    let nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    buttonDiv.appendChild(nextButton);
    nextButton.addEventListener("click", nextQuestion);
}

// Event handler for next button
function nextQuestion() {
    // Increments the question number
    currentQuestionNumber++;
    selectedChoice = "";
    clearContainer();

    if (currentQuestionNumber < questions.length) {
        displayQuestion();
    }
    else {
        // If all questions are done, complete the test
        stopTimer();
        finishTest();
    }
}

// Completes the exam and shows the scores.
function finishTest() {
    // Displays that the test is done
    let title = document.createElement("h2");
    title.textContent = "All done!";
    containerSection.appendChild(title);

    // Displays the score
    let scoreDetails = document.createElement("p");
    scoreDetails.textContent = "Your final score is: " + score;
    containerSection.appendChild(scoreDetails);

    // Displays a form for submitting the initials of the user
    let formGroup = document.createElement("fieldset");
    let labelInitials = document.createElement("label");
    labelInitials.textContent = "Your initials: ";
    labelInitials.for = "initials";
    formGroup.appendChild(labelInitials);

    let inputInitials = document.createElement("input");
    inputInitials.id = labelInitials.for;
    inputInitials.type = "text";
    inputInitials.name = "initials";
    formGroup.appendChild(inputInitials);
    inputInitials.addEventListener("input", getInitials);

    let buttonSubmit = document.createElement("button");
    buttonSubmit.textContent = "Submit";
    formGroup.appendChild(buttonSubmit);
    buttonSubmit.addEventListener("click", submit);

    containerSection.appendChild(formGroup);
}

// Event handler for textbox to enter user initials
function getInitials(event) {
    initials = event.target.value;
}

// Checks if the current score is the highest score
function checkHighScore() {
    let isHighScore = false;

    if (score >= highScore) {
        highScore = score;
        isHighScore = true;
    }

    return isHighScore;
}

// Event handler for submit button.
// This sets and displays the high score
function submit() {
    // If current score is the high score, then set the local storage
    if (checkHighScore()) {
        if(!initials)
        {
            return;
        }
        localStorage.setItem("name", initials);
        localStorage.setItem("highScore", highScore);
    }

    // Displays the high score
    clearContainer();
    displayHighScores();
}

// Displays the high scores
function displayHighScores() {
    let title = document.createElement("h2");
    title.textContent = "High scores";
    containerSection.appendChild(title);

    let highScoreDetails = document.createElement("p");
    highScoreDetails.textContent = localStorage.getItem("name") + ": " + localStorage.getItem("highScore");
    let style = getComputedStyle(document.body);  
    highScoreDetails.style.color = style.getPropertyValue("--background-color");
    containerSection.appendChild(highScoreDetails);

    let backbutton = document.createElement("button");
    backbutton.textContent = "Take test again";
    containerSection.appendChild(backbutton);
    backbutton.addEventListener("click", takeTestAgain);
}

// Goes to initial state to start test again
function takeTestAgain() {
    clearContainer();
    // Resets the container section to initial Html content
    containerSection.innerHTML = initialContent;

    // Attatches the event handler of start quiz button
    document.getElementById("start").addEventListener("click", startQuiz);

    score = 0;
    currentQuestionNumber = 0;  
}
 