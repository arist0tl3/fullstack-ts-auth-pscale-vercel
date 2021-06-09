module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'jest', '@typescript-eslint', 'import'],
  rules: {
    '@typescript-eslint/no-use-before-define': ['error'],
    'import/extensions': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 2,
    'max-len': 0,
    'no-confusing-arrow': 0,
    'no-nested-ternary': 0,
    'no-return-assign': 0,
    'no-tabs': 0,
    'no-underscore-dangle': 0,
    'no-use-before-define': 'off',
    'object-curly-newline': 0,
    'operator-linebreak': 0,
    'react/jsx-curly-brace-presence': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-indent': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-wrap-multilines': 0,
    'react/react-in-jsx-scope': 0,
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        alwaysTryTypes: true,
        project: './',
      },
    },
  },
};
