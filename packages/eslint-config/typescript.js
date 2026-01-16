/* eslint sort/object-properties: warn */

import tsParser from '@typescript-eslint/parser';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import importPlugin from 'eslint-plugin-import';
import { configs as tseslintConfigs } from 'typescript-eslint';
import baseConfig from './base.js';

export default defineConfig(
  ...baseConfig,
  tseslintConfigs.recommendedTypeChecked,
  tseslintConfigs.stylisticTypeChecked,
  {
    extends: [
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
    ],
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    languageOptions: {
      parserOptions: {
        parser: tsParser,
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      'import/resolver': {
        node: true,
        typescript: true,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/consistent-generic-constructors': [
        'error',
        'type-annotation',
      ],
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/dot-notation': [
        'error',
        {
          allowPrivateClassPropertyAccess: true,
          allowProtectedClassPropertyAccess: true,
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          format: ['StrictPascalCase'],
          selector: 'typeLike',
        },
        {
          format: ['StrictPascalCase'],
          prefix: ['T'],
          selector: 'typeParameter',
        },
      ],
      '@typescript-eslint/no-empty-object-type': [
        'error',
        { allowInterfaces: 'with-single-extends' },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_',
        },
      ],
      'import/consistent-type-specifier-style': ['warn', 'prefer-inline'],
      'import/extensions': ['error', 'always', { ignorePackages: true }],
      'import/no-cycle': 'error',
    },
  },
  {
    files: ['**/*.test.ts', '**/*.spec.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
    },
  },
  eslintConfigPrettier,
);
