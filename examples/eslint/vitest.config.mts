import { createVitestProject } from '@aryaemami59/vitest-config'
import packageJson from './package.json' with { type: 'json' }

const vitestConfig = createVitestProject({
  test: {
    dir: `${import.meta.dirname}/tests`,
    name: packageJson.name,
    root: import.meta.dirname,

    server: {
      deps: {
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

    testTimeout: process.env.CI ? 60_000 : undefined,

    sequence: {
      concurrent: true,
    },

    isolate: false,
  },
})

export default vitestConfig
