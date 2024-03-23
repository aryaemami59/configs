import { createESLintConfig } from '@aryaemami/eslint-config'

export default createESLintConfig([
  {
    rules: {
      'no-console': [2],
    },
  },
  {
    // ...Other additional overrides
  },
])
