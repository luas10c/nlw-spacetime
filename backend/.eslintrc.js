module.exports = {
  env: {
    es2022: true,
    node: true
  },
  extends: ['prettier'],
  plugins: ['prettier', '@typescript-eslint/eslint-plugin'],
  parser: '@typescript-eslint/parser',
  rules: {
    'prettier/prettier': 'error'
  }
}
