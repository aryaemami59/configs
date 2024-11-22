import eslintConfigModule = require('@aryaemami59/eslint-config')
import createESLintConfig = eslintConfigModule.createESLintConfig

const eslintConfig = createESLintConfig([
  { ignores: ['!temp/'] },
  {
    rules: {
      'no-console': [2],
    },
  },
  {
    // ...Other additional overrides
  },
])

export = eslintConfig
