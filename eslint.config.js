import globals from 'globals';
import js from '@eslint/js';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.node, // Enables Node.js global variables
    },
    rules: {
      'semi': ['error', 'always'], // Enforce semicolons
      'quotes': ['error', 'single'], // Enforce single quotes
      'no-console': 'off', // Allow console.log()
    },
  },
  js.configs.recommended, // Extends recommended ESLint rules
];
