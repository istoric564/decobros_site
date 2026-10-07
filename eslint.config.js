import astro from 'eslint-plugin-astro';
import tsParser from '@typescript-eslint/parser';

export default [
  { ignores: ['dist/', '.astro/', 'node_modules/', 'playwright-report/', 'test-results/'] },
  ...astro.configs.recommended,
  { files: ['**/*.ts'], languageOptions: { parser: tsParser } },
];
