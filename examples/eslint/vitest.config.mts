import { createVitestConfig, vitestConfig } from '@aryaemami59/vitest-config'
import { cpus } from 'node:os'
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
    poolOptions: {
      forks: {
        isolate: false,
        maxForks: cpus().length,
        minForks: cpus().length,
      },
    },

    maxConcurrency: cpus().length,

    reporters: process.env.GITHUB_ACTIONS
      ? [['github-actions'], ['verbose']]
      : [['verbose']],

    testTimeout: process.env.CI ? 30_000 : vitestConfig.test?.testTimeout,
    sequence: { concurrent: true },
    isolate: false,
  },
})
