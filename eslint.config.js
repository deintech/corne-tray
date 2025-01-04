// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    // TODO: ignores are not working
    files: ['src/**/*.js', 'src/**/*.ts'],
    ignores: [
      'node_modules/', 'build/', 'bin/', 'out/', 'coverage/',
    ],
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type']
    },
  }
);