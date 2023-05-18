module.exports = {
  env: {
    browser: true,
    node: true,
    es2020: true
  },
  extends: ['prettier'],
  plugins: ['prettier', '@typescript-eslint/eslint-plugin'],
  parser: '@typescript-eslint/parser',
  rules: {
    'prettier/prettier': 'error'
  }
}
