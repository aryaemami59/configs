import { createESLintConfig, flatESLintConfig } from '@arya/eslint-config'

// console.log(flatESLintConfig.at(-1))

export default createESLintConfig([
  {
    // ...flatESLintConfig.at(-1),
    languageOptions: {
      ...flatESLintConfig.at(-1)?.languageOptions,
      parserOptions: {
        // ecmaVersion: 'latest',
        project: ['./packages/*/tsconfig.json'],
        // tsconfigRootDir: './packages/*',
      },
    },
  },
])
