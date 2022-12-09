module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: 'standard-with-typescript',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    semi: [2, 'never'],
    indent: ['error', 2],
    quotes: [2, 'single']
  }
}
