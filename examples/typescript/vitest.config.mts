import { createVitestConfig } from '@aryaemami59/vitest-config'
import packageJson from './package.json' with { type: 'json' }

const vitestConfig = createVitestConfig({
  test: {
    name: packageJson.name,
    dir: 'tests',
    root: import.meta.dirname,

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

    globalSetup: ['./tests/vitest.setup.mts'],

    sequence: {
      concurrent: true,
    },

    isolate: false,
  },
})

export default vitestConfig
