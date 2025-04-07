import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      src: resolve(__dirname, 'src'),
    },
  },
  // Configure environment variables
  // Vite automatically loads .env files - similar behavior to CRA
  // https://vitejs.dev/guide/env-and-mode.html
  envPrefix: 'REACT_APP_', // Match CRA's env prefix for backward compatibility
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
  },
});
