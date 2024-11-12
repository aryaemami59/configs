import { createVitestConfig } from '@aryaemami59/vitest-config'
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
        external: ['@aryaemami59/tsconfig', 'typescript'],
      },
    },

    deps: {
      interopDefault: false,
      optimizer: {
        ssr: {
          exclude: ['@aryaemami59/tsconfig', 'typescript'],
        },
      },
    },

    reporters: process.env.GITHUB_ACTIONS
      ? [['github-actions'], ['verbose']]
      : [['verbose']],

    poolOptions: {
      forks: {
        isolate: false,
        maxForks: cpus().length,
        minForks: cpus().length,
      },
    },

    maxConcurrency: cpus().length,
    sequence: { concurrent: true },
    isolate: false,
  },
})
