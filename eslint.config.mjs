import { createESLintConfig } from '@aryaemami59/eslint-config'
import vitestPlugin from '@vitest/eslint-plugin'

const eslintConfig = createESLintConfig([
  vitestPlugin.configs.recommended,

  {
    name: '@aryaemami59/overrides',
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: [
            'examples/vitest/vitest.config.js',
            'examples/vitest/vitest.config.mjs',
            'examples/vitest/vitest.config.cjs',
            'examples/eslint/eslint.config.js',
            'examples/eslint/eslint.config.mjs',
            'examples/eslint/eslint.config.cjs',
          ],
        },
      },
    },

    rules: {
      'vitest/no-alias-methods': [2],
      'vitest/no-disabled-tests': [2],
      'vitest/no-focused-tests': [2],
      'vitest/no-test-prefixes': [2],
      'vitest/no-test-return-statement': [2],
      'vitest/prefer-each': [2],
      'vitest/prefer-spy-on': [2],
      'vitest/prefer-to-be': [2],
      'vitest/prefer-to-contain': [2],
      'vitest/prefer-to-have-length': [2],
      'vitest/prefer-describe-function-title': [2],
    },

    settings: {
      vitest: {
        typecheck: true,
      },
    },
  },
])

export default eslintConfig
