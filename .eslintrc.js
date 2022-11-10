module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
  ],

  overrides: [
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
   '@typescript-eslint',
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: path.join(__dirname, './bin/index.js'),
      },
    },
  },
  rules: {
  },
};
