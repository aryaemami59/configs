const { createESLintConfig } = require('@aryaemami59/eslint-config')

module.exports = createESLintConfig([
  {
    rules: {
      'no-console': [2],
    },
  },
  {
    // ...Other additional overrides
  },
])
