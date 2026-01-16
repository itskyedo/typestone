/* eslint sort/object-properties: warn */

import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import jsdocPlugin from 'eslint-plugin-jsdoc';
import promisePlugin from 'eslint-plugin-promise';
import redosPlugin from 'eslint-plugin-redos';
import * as regexpPlugin from 'eslint-plugin-regexp';
import securityPlugin from 'eslint-plugin-security';
import sortPlugin from 'eslint-plugin-sort';

export default defineConfig(
  globalIgnores(['**/dist/', '**/build/', '**/node_modules/']),
  js.configs.recommended,
  promisePlugin.configs['flat/recommended'],
  regexpPlugin.configs['flat/recommended'],
  {
    plugins: { redos: redosPlugin },
    rules: { 'redos/no-vulnerable': 'error' },
  },
  securityPlugin.configs.recommended,
  sortPlugin.configs['flat/recommended'],
  jsdocPlugin.configs['flat/recommended-typescript'],
  {
    rules: {
      'jsdoc/check-param-names': ['error', { checkDestructured: false }],
      'jsdoc/require-description-complete-sentence': 'error',
      'jsdoc/require-hyphen-before-param-description': [
        'error',
        'always',
        { tags: { '*': 'always', returns: 'never', yields: 'never' } },
      ],
      'jsdoc/require-jsdoc': 'off',
      'jsdoc/require-param': ['error', { checkDestructuredRoots: false }],
      'jsdoc/require-returns': ['error', { checkGetters: false }],
      'jsdoc/tag-lines': ['error', 'always', { count: 0, startLines: 1 }],
    },
  },
  {
    rules: {
      'no-warning-comments': 'warn',
      'require-yield': 'off',
      'security/detect-object-injection': 'off',
      'security/detect-unsafe-regex': 'off',
      'sort/object-properties': 'off',
    },
  },
);
