import { defineConfig } from 'tsdown';

export default defineConfig([
  {
    entry: ['./src/index.ts'],
    outDir: './dist',
    format: ['esm', 'cjs'],
    clean: true,
    minify: true,
    dts: true,
    sourcemap: true,
  },
]);
