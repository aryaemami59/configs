import { createVitestConfig } from '@aryaemami59/vitest-config'
import packageJson from './package.json' with { type: 'json' }

export default createVitestConfig({
  test: {
    name: packageJson.name,
    root: import.meta.dirname,
    dir: 'tests',

    server: {
      deps: {
        fallbackCJS: false,
        external: ['@aryaemami59/prettier-config', 'prettier'],
      },
    },

    deps: {
      interopDefault: false,
      optimizer: {
        ssr: {
          exclude: ['@aryaemami59/prettier-config', 'prettier'],
        },
      },
    },

    globalSetup: ['./tests/vitest.setup.mts'],

    sequence: { concurrent: true },
    isolate: false,
  },
})
