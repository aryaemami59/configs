import prettierConfigPackageJson from '@aryaemami59/prettier-config/package.json' with { type: 'json' }
import { createVitestProject } from '@aryaemami59/vitest-config'
import * as path from 'node:path'
import packageJson from './package.json' with { type: 'json' }

const vitestConfig = createVitestProject({
  root: import.meta.dirname,

  test: {
    dir: path.join(import.meta.dirname, 'tests'),
    name: packageJson.name,
    root: import.meta.dirname,

    server: {
      deps: {
        external: [prettierConfigPackageJson.name, 'prettier'],
      },
    },

    deps: {
      interopDefault: false,

      optimizer: {
        ssr: {
          exclude: [prettierConfigPackageJson.name, 'prettier'],
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
