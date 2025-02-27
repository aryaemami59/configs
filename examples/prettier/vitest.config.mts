import { createVitestConfig } from '@aryaemami59/vitest-config'
import packageJson from './package.json' with { type: 'json' }

const vitestConfig = createVitestConfig({
  test: {
    dir: `${import.meta.dirname}/tests`,
    name: packageJson.name,
    root: import.meta.dirname,

    server: {
      deps: {
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

    sequence: {
      concurrent: true,
    },

    isolate: false,
  },
})

export default vitestConfig
