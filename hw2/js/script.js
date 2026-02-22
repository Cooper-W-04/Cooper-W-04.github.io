// Tracks if a square is already used
let filled = [
	[false, false, false],
	[false, false, false],
	[false, false, false],
];

// Tracks what is in each square (0 empty, 1 player, 2 bot)
let board = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0],
];

let playerLetter = "x";
let botLetter = "o";

let turnAmount = 9;
let turnIndex = 0;
let gameStarted = false;
let gameOver = false;

// DOM references
let gridOverlay, statusEl, startBtn, restartBtn, boardImage;

document.addEventListener("DOMContentLoaded", () => {
	gridOverlay = document.getElementById("gridOverlay");
	statusEl = document.getElementById("status");
	startBtn = document.getElementById("startBtn");
	restartBtn = document.getElementById("restartBtn");
	boardImage = document.getElementById("boardImage");

	buildClickableGrid();

	boardImage.addEventListener("load", () => {
		syncOverlayToImage();
	});

	window.addEventListener("resize", () => {
		syncOverlayToImage();
	});

	syncOverlayToImage();

	startBtn.addEventListener("click", startNewGame);
	restartBtn.addEventListener("click", startNewGame);
});

function syncOverlayToImage() {
	if (!boardImage || !gridOverlay) {
		return;
	}

	gridOverlay.style.width = boardImage.clientWidth + "px";
	gridOverlay.style.height = boardImage.clientHeight + "px";
}

function buildClickableGrid() {
	gridOverlay.innerHTML = "";

	for (let r = 0; r < 3; r++) {
		for (let c = 0; c < 3; c++) {
			const cell = document.createElement("button");
			cell.dataset.row = String(r);
			cell.dataset.col = String(c);

			cell.style.width = "100%";
			cell.style.height = "100%";
			cell.style.background = "transparent";
			cell.style.border = "1px solid transparent";
			cell.style.padding = "0";
			cell.style.margin = "0";
			cell.style.cursor = "pointer";

			cell.addEventListener("click", () => onCellClick(r, c, cell));
			gridOverlay.appendChild(cell);
		}
	}
}

function onCellClick(row, col, cellEl) {
	if (!gameStarted || gameOver) {
		return;
	}

	let playersTurn = false;

	if (playerLetter === "x") {
		if (turnIndex % 2 === 0) {
			playersTurn = true;
		}
	} else {
		if (turnIndex % 2 === 1) {
			playersTurn = true;
		}
	}

	if (!playersTurn) {
		return;
	}

	const didPlace = playerGuess(row, col, playerLetter);

	if (!didPlace) {
		return;
	}

	renderPiece(cellEl, playerLetter);

	if (checkForWin(1)) {
		statusEl.textContent = "Player wins!";
		endGame();
		return;
	}

	if (turnIndex >= turnAmount) {
		statusEl.textContent = "Tie game!";
		endGame();
		return;
	}

	opponentGuess(botLetter);

	if (checkForWin(2)) {
		statusEl.textContent = "Bot wins!";
		endGame();
		return;
	}

	if (turnIndex >= turnAmount) {
		statusEl.textContent = "Tie game!";
		endGame();
		return;
	}

	statusEl.textContent = "Turn: " + playerLetter.toUpperCase();
}

function playerGuess(row, col, letter) {
	if (gameOver) {
		return false;
	}

	if (filled[row][col]) {
		return false;
	}

	fill_in(row, col, letter);
	return true;
}

function opponentGuess(letter) {
	if (gameOver) {
		return;
	}

	if (turnIndex >= turnAmount) {
		return;
	}

	let row;
	let col;

	do {
		row = Math.floor(Math.random() * 3);
		col = Math.floor(Math.random() * 3);
	} while (filled[row][col] === true);

	fill_in(row, col, letter);

	const botBtn = findButtonAt(row, col);

	if (botBtn) {
		renderPiece(botBtn, letter);
	}
}

function fill_in(row, col, letter) {
	filled[row][col] = true;

	if (letter === playerLetter) {
		board[row][col] = 1;
	} else {
		board[row][col] = 2;
	}

	turnIndex += 1;
}

function startNewGame() {
	filled = [
		[false, false, false],
		[false, false, false],
		[false, false, false],
	];

	board = [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
	];

	const chosen = document.querySelector('input[name="letter"]:checked')?.value || "x";
	playerLetter = chosen;

	if (chosen === "x") {
		botLetter = "o";
	} else {
		botLetter = "x";
	}

	turnIndex = 0;
	gameStarted = true;
	gameOver = false;

	clearGridPieces();
	syncOverlayToImage();

	if (playerLetter === "x") {
		statusEl.textContent = "Game started. Player = X.";
	} else {
		statusEl.textContent = "Game started. Player = O. Bot first...";
		opponentGuess(botLetter);

		if (checkForWin(2)) {
			statusEl.textContent = "Bot wins!";
			endGame();
			return;
		}

		if (turnIndex >= turnAmount) {
			statusEl.textContent = "Tie game!";
			endGame();
			return;
		}

		statusEl.textContent = "Turn: O";
	}

	if (restartBtn) {
		restartBtn.disabled = false;
	}
}

function clearGridPieces() {
	const buttons = gridOverlay.querySelectorAll("button");

	buttons.forEach((btn) => {
		btn.innerHTML = "";
	});
}

function renderPiece(cellButton, letter) {
	cellButton.innerHTML = "";

	const img = document.createElement("img");

	if (letter === "x") {
		img.src = "img/x.png";
	} else {
		img.src = "img/o.png";
	}

	img.alt = letter.toUpperCase();
	img.style.transform = "scale(0.3)";
	img.style.transformOrigin = "center center";
	img.style.display = "block";
	img.style.margin = "auto";
	img.style.maxWidth = "100%";
	img.style.maxHeight = "100%";
	img.style.pointerEvents = "none";

	cellButton.appendChild(img);
}

function findButtonAt(row, col) {
	return gridOverlay.querySelector(`button[data-row="${row}"][data-col="${col}"]`);
}

function checkForWin(who) {
	for (let r = 0; r < 3; r++) {
		if (board[r][0] === who && board[r][1] === who && board[r][2] === who) {
			return true;
		}
	}

	for (let c = 0; c < 3; c++) {
		if (board[0][c] === who && board[1][c] === who && board[2][c] === who) {
			return true;
		}
	}

	if (board[0][0] === who && board[1][1] === who && board[2][2] === who) {
		return true;
	}

	if (board[0][2] === who && board[1][1] === who && board[2][0] === who) {
		return true;
	}

	return false;
}

function endGame() {
    gameOver = true;
	gameStarted = false;
}