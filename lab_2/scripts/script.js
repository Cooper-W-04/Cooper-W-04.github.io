let correctNumber;
let guessCounter = 0;
let guessesBefore7 = [];
let wins = 0;
let losses = 0;

let guessInput = document.querySelector("#guessInput");
let guessButton = document.querySelector("#guessButton");
let resetButton = document.querySelector("#resetButton");
let guessResult = document.querySelector("#guessResult");
let numberGuessDisplay = document.querySelector("#numberGuessDisplay");
let attemptsLeftDisplay = document.querySelector("#attemptsLeft");
let winsDisplay = document.querySelector("#wins");
let lossesDisplay = document.querySelector("#losses");

initializeGame();

guessButton.addEventListener("click", function () {

    if (guessCounter >= 7) {
        return;
    }

    let currentGuess = parseInt(guessInput.value);

    if (isNaN(currentGuess) || currentGuess < 1 || currentGuess > 99) {
        guessResult.textContent = "Enter a number between 1 and 99";
        guessResult.style.color = "red";
        return;
    }

    // increment attempts and store guess immediately
    guessCounter++;
    guessesBefore7.push(currentGuess);

    // update guesses display right away
    numberGuessDisplay.textContent = "Guesses so far: " + guessesBefore7.join(", ");

    if (currentGuess === correctNumber) {
        guessResult.textContent = "Congrats, you got it!";
        guessResult.style.color = "green";
        wins++;
        updateScore();
        endGame();
    } else {

        if (guessCounter === 7) {
            guessResult.textContent = "Out of guesses. The number was " + correctNumber;
            guessResult.style.color = "red";
            losses++;
            updateScore();
            endGame();
        } else if (currentGuess > correctNumber) {
            guessResult.textContent = "Too high";
            guessResult.style.color = "orange";
        } else {
            guessResult.textContent = "Too low";
            guessResult.style.color = "orange";
        }
    }

    attemptsLeftDisplay.textContent = 7 - guessCounter;
    guessInput.value = "";
    guessInput.focus();
});

resetButton.addEventListener("click", initializeGame);

function initializeGame() {
    correctNumber = Math.floor((Math.random() * 99) + 1);
    console.log(correctNumber);

    guessCounter = 0;
    guessesBefore7 = [];

    guessResult.textContent = "";
    numberGuessDisplay.textContent = "";
    guessInput.value = "";
    guessInput.focus();

    guessButton.style.display = "inline";
    resetButton.style.display = "none";

    attemptsLeftDisplay.textContent = "7";
    updateScore();
}

function endGame() {
    guessButton.style.display = "none";
    resetButton.style.display = "inline";
}

function updateScore() {
    winsDisplay.textContent = wins;
    lossesDisplay.textContent = losses;
}