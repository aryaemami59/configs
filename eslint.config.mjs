import { createESLintConfig } from '@aryaemami59/eslint-config'
import vitestPlugin from '@vitest/eslint-plugin'
// import { jsdoc } from 'eslint-plugin-jsdoc'
import perfectionistPlugin from 'eslint-plugin-perfectionist'
import packageJson from './package.json' with { type: 'json' }

const eslintConfig = createESLintConfig([
  vitestPlugin.configs.recommended,
  vitestPlugin.configs.env,

  {
    name: `${perfectionistPlugin.meta?.name}/recommended-natural`,
    ...perfectionistPlugin.configs['recommended-natural'],
  },

  // jsdoc({
  //   config: 'flat/recommended-typescript-error',
  //   rules: {
  //     'jsdoc/require-template': [2],
  //     'jsdoc/tag-lines': [
  //       2,
  //       'any',
  //       {
  //         startLines: 1,
  //       },
  //     ],
  //   },
  // }),

  {
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
    name: `${packageJson.name}/overrides`,

    rules: {
      'perfectionist/sort-array-includes': [2],
      'perfectionist/sort-imports': [0],
      'perfectionist/sort-interfaces': [2],
      'perfectionist/sort-intersection-types': [0],
      'perfectionist/sort-modules': [0],
      'perfectionist/sort-object-types': [2],
      'perfectionist/sort-objects': [
        2,
        {
          order: 'asc',
          type: 'alphabetical',
        },
      ],
      'perfectionist/sort-sets': [2],
      'perfectionist/sort-switch-case': [2],
      'perfectionist/sort-union-types': [
        2,
        {
          order: 'asc',
          partitionByComment: true,
          type: 'alphabetical',
        },
      ],
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
