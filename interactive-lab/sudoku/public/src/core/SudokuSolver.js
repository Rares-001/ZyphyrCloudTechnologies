// src/core/SudokuSolver.js

export default class SudokuSolver {
    constructor(grid) {
        this.grid = grid; // 9x9 array
    }

    isValid(num, row, col) {
        for (let i = 0; i < 9; i++) {
            // row/column check
            if (this.grid[row][i] === num || this.grid[i][col] === num) {
                return false;
            }
            // 3x3 subgrid check
            const boxRow = Math.floor(row / 3) * 3 + Math.floor(i / 3);
            const boxCol = Math.floor(col / 3) * 3 + (i % 3);
            if (this.grid[boxRow][boxCol] === num) {
                return false;
            }
        }
        return true;
    }

    solve() {
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (this.grid[r][c] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (this.isValid(num, r, c)) {
                            this.grid[r][c] = num;
                            if (this.solve()) {
                                return this.grid;
                            }
                            // backtrack
                            this.grid[r][c] = 0;
                        }
                    }
                    return null; // no valid num
                }
            }
        }
        // no empty cells => solved
        return this.grid;
    }
}
