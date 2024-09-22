import { createESLintConfig } from '@aryaemami59/eslint-config'

export default createESLintConfig([
  {
    name: '@aryaemami59/overrides',
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
