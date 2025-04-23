import { createESLintConfig } from '@aryaemami59/eslint-config'
import vitestPlugin from '@vitest/eslint-plugin'
import packageJson from './package.json' with { type: 'json' }

const eslintConfig = createESLintConfig([
  vitestPlugin.configs.recommended,
  vitestPlugin.configs.env,

  {
    name: `${packageJson.name}/overrides`,
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
      'vitest/prefer-comparison-matcher': [2],
      'vitest/prefer-describe-function-title': [2],
      'vitest/prefer-each': [2],
      'vitest/prefer-equality-matcher': [2],
      'vitest/prefer-expect-resolves': [2],
      'vitest/prefer-mock-promise-shorthand': [2],
      'vitest/prefer-spy-on': [2],
      'vitest/prefer-strict-boolean-matchers': [2],
      'vitest/prefer-strict-equal': [2],
      'vitest/prefer-to-be': [2],
      'vitest/prefer-to-contain': [2],
      'vitest/prefer-to-have-length': [2],
      'vitest/prefer-vi-mocked': [2],
      'vitest/require-mock-type-parameters': [
        2,
        { checkImportFunctions: true },
      ],
    },

    settings: {
      vitest: {
        typecheck: true,
      },
    },
  },
])

export default eslintConfig
