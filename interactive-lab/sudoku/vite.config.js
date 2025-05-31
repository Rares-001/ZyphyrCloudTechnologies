import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    // repo root is now the root
    base: '/interactive-lab/sudoku/',        // keep absolute prefix
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            input: { sudoku: resolve(__dirname, 'interactive-lab/sudoku/index.html') }
        }
    }
});
