// src/main.js

import GridManager from './core/GridManager.js';
import { renderGrid } from './components/Grid.js';
import { renderControls } from './components/Controls.js';

let manager = new GridManager();

/** This is called when user focuses a cell that is not read-only. */
function onCellFocus(row, col) {
  // If the cell is already filled with a digit (not 0),
  // remove any old hint so it doesn't remain on screen
  if (manager.getGrid()[row][col] !== 0) {
    clearHint();
    return;
  }

  // Otherwise, show the correct digit
  const correctDigit = manager.getSolutionValue(row, col);
  const hintBox = document.getElementById('hint-container');
  if (hintBox) {
    hintBox.textContent = `Hint: ${correctDigit}`;
  }
}

/** Called whenever user types in an editable cell. */
function onCellChange(row, col, valStr) {
  // If empty, interpret as 0; else parse the digit
  const numVal = (valStr === '') ? 0 : parseInt(valStr, 10);
  manager.updateGridCell(row, col, numVal);

  // Clear the hint once the user types anything
  clearHint();
}

function clearHint() {
  const hintBox = document.getElementById('hint-container');
  if (hintBox) {
    hintBox.textContent = '';
  }
}

function renderPuzzle() {
  renderGrid({
    grid: manager.getGrid(),
    onCellChange: onCellChange,
    onCellFocus: onCellFocus
  });
}

/** Solve / Clear / New Puzzle, etc. remain as your existing logic. */
function handleSolve() {
  try {
    const solution = manager.solvePuzzle();
    renderGrid({
      grid: solution,
      onCellChange: () => {},
      onCellFocus: () => {}
    });
    clearHint();
  } catch (err) {
    alert(err.message);
  }
}

function handleClear() {
  manager.clearGrid();
  renderPuzzle();
  clearHint();
}

function handleNewPuzzle() {
  manager = new GridManager();
  renderPuzzle();
  clearHint();
}

renderPuzzle();
renderControls({
  onSolve: handleSolve,
  onClear: handleClear,
  onNewPuzzle: handleNewPuzzle
});
