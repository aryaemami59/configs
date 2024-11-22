import { createVitestConfig, vitestConfig } from '@aryaemami59/vitest-config'
import packageJson from './package.json' with { type: 'json' }

export default createVitestConfig({
  test: {
    name: packageJson.name,
    root: import.meta.dirname,
    dir: 'tests',

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

    testTimeout: process.env.CI ? 60_000 : vitestConfig.test?.testTimeout,
    sequence: { concurrent: true },
    isolate: false,
  },
})
