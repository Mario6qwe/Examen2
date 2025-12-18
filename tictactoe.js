let boardState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const statusDisplay = document.getElementById('status');
const boardElement = document.getElementById('board');

function createBoard() {
    boardElement.innerHTML = "";
    boardState.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        if (cell !== "") cellElement.classList.add('occupied');
        if (cell === "X") cellElement.classList.add('x-player');
        if (cell === "O") cellElement.classList.add('o-player');
        
        cellElement.innerText = cell;
        cellElement.onclick = () => handleCellClick(index);
        boardElement.appendChild(cellElement);
    });
    updateStatus();
}

function handleCellClick(index) {
    if (boardState[index] !== "" || !gameActive) return;
    boardState[index] = currentPlayer;
    if (checkWinner()) {
        const nameX = document.getElementById('nameX').value || "X";
        const nameO = document.getElementById('nameO').value || "O";
        const winnerName = currentPlayer === "X" ? nameX : nameO;
        statusDisplay.innerHTML = `<span class="text-success">¡Ganó ${winnerName}!</span>`;
        gameActive = false;
    } else if (!boardState.includes("")) {
        statusDisplay.innerText = "¡Empate!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        updateStatus();
    }
    createBoard();
}

function checkWinner() {
    const patterns = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    return patterns.some(p => p.every(i => boardState[i] === currentPlayer));
}

function updateStatus() {
    if (gameActive) {
        const nameX = document.getElementById('nameX').value || "X";
        const nameO = document.getElementById('nameO').value || "O";
        statusDisplay.innerText = `Turno de: ${currentPlayer === "X" ? nameX : nameO}`;
    }
}

function resetGame() {
    boardState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    createBoard();
}

createBoard();