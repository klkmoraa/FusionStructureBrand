import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { resolve } from 'node:path';

const base = process.env.NEXT_PUBLIC_BASE_PATH || '/fusionstructure-web/';

export default defineConfig({
  root: resolve(__dirname, 'pages'),
  publicDir: resolve(__dirname, 'public'),
  base,
  plugins: [react()],
  define: {
    'process.env.NEXT_PUBLIC_BASE_PATH': JSON.stringify(base.replace(/\/$/, '')),
  },
  build: {
    outDir: resolve(__dirname, 'dist-pages'),
    emptyOutDir: true,
  },
});
