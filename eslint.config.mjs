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
      /**
       * @todo Re-enable this when
       * {@link https://github.com/vitest-dev/eslint-plugin-vitest/pull/584 | PR #584 }
       * gets merged.
       */
      'vitest/valid-title': [
        0,
        { ignoreTypeOfDescribeName: false, allowArguments: false },
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
