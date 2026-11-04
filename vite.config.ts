import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { readdirSync, existsSync } from 'node:fs';

// Library build only (the website is built with Next.js — see next.config.mjs).
// One entry per category so consumers can import `react-component-kit-ui/buttons`.
const libDir = resolve(__dirname, 'src/components/lib');
const categories = readdirSync(libDir).filter((d) => existsSync(resolve(libDir, d, 'index.ts')));

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    cssCodeSplit: false,
    lib: {
      entry: {
        index: resolve(__dirname, 'src/components/index.ts'),
        ...Object.fromEntries(categories.map((c) => [c, resolve(libDir, c, 'index.ts')])),
      },
      formats: ['es'],
      cssFileName: 'styles',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: { banner: "'use client';", chunkFileNames: 'chunks/[name]-[hash].js' },
      // Library sources carry 'use client' themselves; the banner re-adds it per output file.
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;
        warn(warning);
      },
    },
  },
});
