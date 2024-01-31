import { defineConfig } from "vite"
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        setupFiles: ['./src/tests/setup.ts'],
        testMatch: ['./src/tests/**/*.test.tsx'],
        globals: true
    }
});
