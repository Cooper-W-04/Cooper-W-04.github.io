//Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);

//Global variables
let randomNumber;
let attempts = 0;
let wins = 0;
let losses = 0;

initializeGame();

function updateUI() {
  document.querySelector("#attemptsLeft").textContent = String(7 - attempts);
  document.querySelector("#wins").textContent = String(wins);
  document.querySelector("#losses").textContent = String(losses);
}

function initializeGame() {
  randomNumber = Math.floor(Math.random() * 99) + 1;
  console.log("randomNumber: " + randomNumber);
  attempts = 0;

  //showing the Guess button & hiding Reset button
  document.querySelector("#guessBtn").style.display = "inline";
  document.querySelector("#resetBtn").style.display = "none";

  //adding focus to textbox + clearing it
  let playerGuess = document.querySelector("#playerGuess");
  playerGuess.focus();
  playerGuess.value = "";

  let feedback = document.querySelector("#feedback");
  feedback.textContent = "";

  //clearing previous guesses
  document.querySelector("#guesses").textContent = "";

  updateUI();
}

function checkGuess() {
  let feedback = document.querySelector("#feedback");
  feedback.textContent = "";

  if (attempts >= 7) return;

  let guessValue = document.querySelector("#playerGuess").value.trim();
  let guess = parseInt(guessValue, 10);
  console.log("Player guess: " + guessValue);

  if (Number.isNaN(guess) || guess < 1 || guess > 99) {
    feedback.textContent = "Enter a number between 1 and 99";
    feedback.style.color = "red";
    return;
  }

  attempts++;
  updateUI();

  feedback.style.color = "orange";

  if (guess === randomNumber) {
    feedback.textContent = "You guessed it! You won!";
    feedback.style.color = "darkgreen";
    wins++;
    updateUI();
    gameOver();
    return;
  }

  document.querySelector("#guesses").textContent += guess + " ";

  if (attempts === 7) {
    feedback.textContent = "Sorry, you lost! The number was " + randomNumber + ".";
    feedback.style.color = "red";
    losses++;
    updateUI();
    gameOver();
  } else if (guess > randomNumber) {
    feedback.textContent = "Your guess was too high";
  } else {
    feedback.textContent = "Your guess was too low";
  }
}

function gameOver() {
  let guessBtn = document.querySelector("#guessBtn");
  let resetBtn = document.querySelector("#resetBtn");
  guessBtn.style.display = "none";
  resetBtn.style.display = "inline";
}