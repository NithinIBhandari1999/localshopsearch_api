module.exports = {
  'parserOptions': {
    'ecmaVersion': 2020
  },
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['plugin:node/recommended', 'eslint:recommended'],
  rules: {
    'no-unused-vars': 'warn',
    'spaced-comment': 'warn',
    quotes: ['warn', 'single'],
    semi: ['warn', 'always']
  },
};
