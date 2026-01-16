import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    watch: false,
    passWithNoTests: true,
    coverage: {
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        '**/*.test.ts',
        '**/*.test-d.ts',
        './src/internal/test-utils',
        '**/*.d.ts',
        '**/types.ts',
        '**/index.ts',
        '**/constants.ts',
      ],
    },
    reporters: [
      [
        'default',
        {
          summary: false,
        },
      ],
    ],
  },
});
