import {
  createVitestConfig,
  vitestConfigDefaults,
} from '@aryaemami59/vitest-config'
import packageJson from './package.json' with { type: 'json' }

const vitestConfig = createVitestConfig({
  test: {
    dir: `${import.meta.dirname}/tests`,
    name: packageJson.name,
    root: import.meta.dirname,

    server: {
      deps: {
        fallbackCJS: false,

        external: ['@aryaemami59/eslint-config', 'eslint', 'jiti'],
      },
    },

    deps: {
      interopDefault: false,

      optimizer: {
        ssr: {
          exclude: ['@aryaemami59/eslint-config', 'eslint', 'jiti'],
        },
      },
    },

    globalSetup: ['./tests/vitest.setup.mts'],

    testTimeout: process.env.CI
      ? 60_000
      : vitestConfigDefaults.test.testTimeout,

    sequence: {
      concurrent: true,
    },

    isolate: false,
  },
})

export default vitestConfig
