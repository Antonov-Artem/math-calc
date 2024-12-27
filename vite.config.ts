import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      app: resolve(__dirname, './src/app'),
      pages: resolve(__dirname, './src/pages'),
      widgets: resolve(__dirname, './src/widgets'),
      shared: resolve(__dirname, './src/shared'),
    },
  },
});
