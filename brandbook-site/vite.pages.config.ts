import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { resolve } from 'node:path';

const base = process.env.NEXT_PUBLIC_BASE_PATH || '/FusionStructureBrand/';

export default defineConfig({
  root: resolve(__dirname, 'pages'),
  publicDir: resolve(__dirname, 'public'),
  base,
  plugins: [react()],
  define: {
    __FS_PUBLIC_BASE_PATH__: JSON.stringify(base.replace(/\/$/, '')),
    'process.env.NEXT_PUBLIC_BASE_PATH': JSON.stringify(
      base.replace(/\/$/, ''),
    ),
  },
  build: {
    outDir: resolve(__dirname, 'dist-pages'),
    emptyOutDir: true,
  },
});
