import tsConfigPackageJson from '@aryaemami59/tsconfig/package.json' with { type: 'json' }
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
        external: [tsConfigPackageJson.name, 'typescript'],
      },
    },

    deps: {
      interopDefault: false,

      optimizer: {
        ssr: {
          exclude: [tsConfigPackageJson.name, 'typescript'],
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
