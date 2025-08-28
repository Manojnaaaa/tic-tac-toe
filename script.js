// 1. DOM Selection using getElementById
const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

let currentPlayer = "X"; // Start with X
let cells = Array(9).fill(""); // 9 empty cells
let gameOver = false;

// 2. Win combinations
const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

// 3. Render the board and attach events
function drawBoard() {
  board.innerHTML = ""; // Use innerHTML to clear board

  // Looping with forEach and creating each cell
  cells.forEach((value, index) => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.setAttribute("data-index", index);
    cell.textContent = value; // Using textContent to show player moves

    cell.addEventListener("click", handleMove);
    board.appendChild(cell); // DOM manipulation using appendChild
  });
}

// 4. Handle player moves
function handleMove(event) {
  const index = event.target.getAttribute("data-index");

  if (cells[index] !== "" || gameOver) return;

  cells[index] = currentPlayer;
  drawBoard();

  if (checkWinner()) {
    statusText.innerText = `🎉 Player ${currentPlayer} wins!`; // innerText to show result
    gameOver = true;
    saveResultToLocalStorage(`${currentPlayer} won`);
  } else if (!cells.includes("")) {
    statusText.innerText = "It's a draw!";
    gameOver = true;
    saveResultToLocalStorage("Draw");
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

// 5. Check win logic
function checkWinner() {
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return cells[a] === currentPlayer &&
           cells[a] === cells[b] &&
           cells[b] === cells[c];
  });
}

// 6. Reset function
function resetGame() {
  cells = Array(9).fill(""); // Reset array
  currentPlayer = "X";
  gameOver = false;
  statusText.innerText = "Player X's turn";
  drawBoard();
}

// 7. Save result using localStorage.setItem()
function saveResultToLocalStorage(result) {
  let history = localStorage.getItem("tttHistory");

  if (history) {
    history = JSON.parse(history);
  } else {
    history = [];
  }

  history.push(result); // push() method
  localStorage.setItem("tttHistory", JSON.stringify(history));
}

// 8. Get result from localStorage
function getResults() {
  let history = localStorage.getItem("tttHistory");
  return history ? JSON.parse(history) : [];
}

// 9. Add event using addEventListener
resetBtn.addEventListener("click", resetGame);

// Initial board render
drawBoard();
