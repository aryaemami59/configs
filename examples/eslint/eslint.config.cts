import eslintConfigModule = require('@aryaemami59/eslint-config')
import createESLintConfig = eslintConfigModule.createESLintConfig

export = createESLintConfig([
  {
    rules: {
      'no-console': [2],
    },
  },
  {
    // ...Other additional overrides
  },
])
