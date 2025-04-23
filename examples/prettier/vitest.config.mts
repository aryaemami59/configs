import prettierConfigPackageJson from '@aryaemami59/prettier-config/package.json' with { type: 'json' }
import { createVitestProject } from '@aryaemami59/vitest-config'
import * as path from 'node:path'
import packageJson from './package.json' with { type: 'json' }

const vitestConfig = createVitestProject({
  root: import.meta.dirname,

  test: {
    deps: {
      interopDefault: false,

      optimizer: {
        ssr: {
          exclude: [prettierConfigPackageJson.name, 'prettier'],
        },
      },
    },

    dir: path.join(import.meta.dirname, 'tests'),
    globalSetup: ['./tests/vitest.setup.mts'],
    isolate: false,
    name: packageJson.name,
    root: import.meta.dirname,

    sequence: {
      concurrent: true,
    },

    server: {
      deps: {
        external: [prettierConfigPackageJson.name, 'prettier'],
      },
    },
  },
})

export default vitestConfig
