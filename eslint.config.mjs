import { createESLintConfig } from '@aryaemami59/eslint-config'

export default createESLintConfig([
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: [
            'examples/vitest/vitest.config.cjs',
            'examples/eslint/eslint.config.cjs',
          ],
        },
      },
    },
  },
])
