// src/core/GridManager.js
import SudokuSolver from './SudokuSolver.js';

export default class GridManager {
    constructor() {
        // Generate a random puzzle at construction
        const puzzle = this.generateRandomPuzzle();
        this.grid = puzzle;

        // Solve the puzzle behind the scenes for hints
        const copy = this.grid.map(r => [...r]);
        const solver = new SudokuSolver(copy);
        const solved = solver.solve();
        if (!solved) {
            throw new Error('Failed to generate a solvable puzzle. Try again.');
        }
        this.solution = solved;
    }

    // Return the puzzle
    getGrid() {
        return this.grid;
    }

    // Return correct digit from the solved puzzle
    getSolutionValue(row, col) {
        return this.solution[row][col];
    }

    // Called when user types in a cell
    updateGridCell(row, col, valStr) {
        const val = parseInt(valStr, 10);
        this.grid[row][col] = Number.isNaN(val) ? 0 : val;
    }

    // Clears puzzle to all empty
    clearGrid() {
        this.grid = Array.from({ length: 9 }, () => Array(9).fill(0));
    }

    // Solve the current puzzle fully
    solvePuzzle() {
        const copy = this.grid.map(r => [...r]);
        const solver = new SudokuSolver(copy);
        const result = solver.solve();
        if (!result) {
            throw new Error('No solution for the current puzzle state.');
        }
        this.grid = result;
        return result;
    }

    // Generates a brand-new random puzzle (9x9, solvable).
    // Returns a 9x9 array with zeroes representing blanks.
    generateRandomPuzzle() {
        // 1) Start from a known solved Sudoku (simple row permutations).
        let grid = [
            [1,2,3,4,5,6,7,8,9],
            [4,5,6,7,8,9,1,2,3],
            [7,8,9,1,2,3,4,5,6],
            [2,3,4,5,6,7,8,9,1],
            [5,6,7,8,9,1,2,3,4],
            [8,9,1,2,3,4,5,6,7],
            [3,4,5,6,7,8,9,1,2],
            [6,7,8,9,1,2,3,4,5],
            [9,1,2,3,4,5,6,7,8],
        ];

        // Shuffle digits 1..9
        const digits = [1,2,3,4,5,6,7,8,9];
        shuffleArray(digits);
        // Map old -> new digit
        const digitMap = {};
        for (let i = 0; i < 9; i++) {
            digitMap[i+1] = digits[i];
        }
        // Replace digits in grid
        grid = grid.map(row => row.map(val => digitMap[val]));

        // Shuffle rows within each 3-row band
        for (let rowStart = 0; rowStart < 9; rowStart += 3) {
            shuffleWithinBand(grid, rowStart, rowStart+2);
        }

        // Shuffle columns within each 3-col band
        grid = transpose(grid);
        for (let colStart = 0; colStart < 9; colStart += 3) {
            shuffleWithinBand(grid, colStart, colStart+2);
        }
        grid = transpose(grid);

        // Now remove ~45 cells randomly, checking solvability
        let cellsToRemove = 45; // adjust for difficulty
        while (cellsToRemove > 0) {
            const r = Math.floor(Math.random() * 9);
            const c = Math.floor(Math.random() * 9);
            if (grid[r][c] !== 0) {
                const backup = grid[r][c];
                grid[r][c] = 0;

                const testCopy = grid.map(row => [...row]);
                const solver = new SudokuSolver(testCopy);
                if (!solver.solve()) {
                    // revert if not solvable
                    grid[r][c] = backup;
                } else {
                    cellsToRemove--;
                }
            }
        }
        return grid;
    }
}

/** Helper: Shuffle an array in place (Fisher-Yates) */
function shuffleArray(arr) {
    for (let i = arr.length-1; i>0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

/** Shuffle rows in [startRow..endRow] range */
function shuffleWithinBand(grid, start, end) {
    const subRows = [];
    for (let r = start; r <= end; r++) {
        subRows.push(r);
    }
    shuffleArray(subRows);
    const temp = grid.slice();
    for (let i = 0; i < subRows.length; i++) {
        grid[start + i] = temp[subRows[i]];
    }
}

/** Transpose a 9x9 matrix */
function transpose(matrix) {
    const result = Array.from({ length: 9 }, () => Array(9).fill(0));
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            result[r][c] = matrix[c][r];
        }
    }
    return result;
}
