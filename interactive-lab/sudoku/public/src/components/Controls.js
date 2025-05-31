// src/components/Controls.js

export function renderControls({ onSolve, onClear, onNewPuzzle }) {
    const container = document.getElementById('controls-container');
    if (!container) return;

    // Insert three buttons
    container.innerHTML = `
    <button id="solve-btn">Solve</button>
    <button id="clear-btn">Clear</button>
    <button id="new-puzzle-btn">New Puzzle</button>
  `;

    const solveBtn = document.getElementById('solve-btn');
    const clearBtn = document.getElementById('clear-btn');
    const newPuzzleBtn = document.getElementById('new-puzzle-btn');

    // Attach event listeners
    solveBtn.addEventListener('click', onSolve);
    clearBtn.addEventListener('click', onClear);
    newPuzzleBtn.addEventListener('click', onNewPuzzle);
}
