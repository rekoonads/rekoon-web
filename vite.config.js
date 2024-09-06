import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://backend-ruddy-phi.vercel.app',
    },
  },
  mimeTypes: {
    '.js': 'application/javascript',
  },
});
