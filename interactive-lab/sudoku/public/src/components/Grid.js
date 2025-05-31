// src/components/Grid.js

export function renderGrid({ grid, onCellChange, onCellFocus }) {
    const container = document.getElementById('sudoku-container');
    if (!container) return;

    let html = '<table><tbody>';
    for (let r = 0; r < 9; r++) {
        html += '<tr>';
        for (let c = 0; c < 9; c++) {
            const val = grid[r][c];
            const displayVal = val === 0 ? '' : val;
            const readOnlyAttr = val !== 0 ? 'readonly' : '';

            html += `
        <td>
          <input
            type="text"
            data-row="${r}"
            data-col="${c}"
            maxlength="1"
            value="${displayVal}"
            ${readOnlyAttr}
          />
        </td>
      `;
        }
        html += '</tr>';
    }
    html += '</tbody></table>';
    container.innerHTML = html;

    // Attach event listeners for non-readonly cells
    const inputs = container.querySelectorAll('input');
    inputs.forEach(input => {
        const row = parseInt(input.getAttribute('data-row'), 10);
        const col = parseInt(input.getAttribute('data-col'), 10);

        // If read-only (prefilled puzzle cell), skip
        if (input.hasAttribute('readonly')) {
            return;
        }

        // Filter out anything not [1-9], no zero
        input.addEventListener('input', () => {
            let v = input.value.replace(/[^1-9]/g, '');
            input.value = v;
            onCellChange(row, col, v); // triggers logic in main.js
        });

        // Show hint if empty cell
        input.addEventListener('focus', () => {
            onCellFocus(row, col);
        });
    });
}
