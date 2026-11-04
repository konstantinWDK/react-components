import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { readdirSync, existsSync } from 'node:fs';

// One entry per category so consumers can import `react-component-kit/buttons`.
const libDir = resolve(__dirname, 'src/components/lib');
const categories = readdirSync(libDir).filter((d) => existsSync(resolve(libDir, d, 'index.ts')));

export default defineConfig(({ mode }) =>
  mode === 'lib'
    ? {
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
          },
        },
      }
    : {
        // Playground / docs app
        root: 'playground',
        plugins: [react()],
        build: { outDir: resolve(__dirname, 'dist-playground'), emptyOutDir: true },
      },
);
