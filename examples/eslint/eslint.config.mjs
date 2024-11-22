import { createESLintConfig } from '@aryaemami59/eslint-config'

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

export default eslintConfig
