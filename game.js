// Game state
let currentPlayer = 'X';
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

// Winning combinations
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// DOM elements
const statusDisplay = document.getElementById('status');
const cells = document.querySelectorAll('.cell');
const restartBtn = document.getElementById('restartBtn');

// Update status message
function updateStatus(message) {
    statusDisplay.textContent = message;
}

// Handle cell click
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (boardState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

// Update cell with player symbol
function handleCellPlayed(clickedCell, clickedCellIndex) {
    boardState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());
}

// Check for win or draw
function handleResultValidation() {
    let roundWon = false;
    let winningCombo = [];

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            winningCombo = [a, b, c];
            break;
        }
    }

    if (roundWon) {
        updateStatus(`Player ${currentPlayer} Wins!`);
        gameActive = false;
        highlightWinningCells(winningCombo);
        return;
    }

    if (!boardState.includes('')) {
        updateStatus("It's a Draw!");
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

// Highlight winning cells
function highlightWinningCells(combo) {
    combo.forEach(index => {
        cells[index].classList.add('winning');
    });
}

// Switch player turn
function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus(`Player ${currentPlayer}'s Turn`);
}

// Restart the game
function handleRestartGame() {
    gameActive = true;
    currentPlayer = 'X';
    boardState = ['', '', '', '', '', '', '', '', ''];
    updateStatus("Player X's Turn");
    
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'winning');
    });
}

// Event listeners
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartBtn.addEventListener('click', handleRestartGame);

// Initialize game
updateStatus("Player X's Turn");
