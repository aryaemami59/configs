import { createVitestConfig, vitestConfig } from '@aryaemami59/vitest-config'
import { cpus } from 'node:os'

export default createVitestConfig({
  test: {
    server: {
      deps: { external: ['@aryaemami59/eslint-config', 'eslint', 'jiti'] },
    },
    deps: {
      optimizer: {
        web: { exclude: ['@aryaemami59/eslint-config', 'eslint', 'jiti'] },
      },
    },
    globalSetup: ['./tests/vitest.setup.mts'],
    dir: 'tests',
    poolOptions: {
      forks: {
        isolate: false,
        maxForks: cpus().length,
        minForks: cpus().length,
      },
    },
    maxConcurrency: cpus().length,
    reporters: ['verbose'],
    testTimeout: process.env.CI ? 30_000 : vitestConfig.test?.testTimeout,
    sequence: { concurrent: true },
    isolate: false,
    fileParallelism: true,
  },
})
