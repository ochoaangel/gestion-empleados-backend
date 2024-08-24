import { ESLint } from 'eslint';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      'no-console': 'warn', // Advertir sobre el uso de console.log
      'no-unused-vars': 'warn', // Advertir sobre variables no utilizadas
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Ignorar variables de argumentos que comienzan con _
      '@typescript-eslint/explicit-function-return-type': 'off', // No requerir tipos de retorno explícitos
      '@typescript-eslint/no-explicit-any': 'warn', // Advertir sobre el uso de 'any'
      '@typescript-eslint/consistent-type-imports': 'warn', // Usar importaciones de tipos consistentes
      '@typescript-eslint/no-namespace': 'off', // Desactivar la regla no-namespace
    },
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-console': 'warn', // Advertir sobre el uso de console.log
      'no-unused-vars': 'warn', // Advertir sobre variables no utilizadas
    },
  },
];
