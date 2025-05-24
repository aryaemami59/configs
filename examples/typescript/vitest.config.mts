import tsConfigPackageJson from '@aryaemami59/tsconfig/package.json' with { type: 'json' }
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
          exclude: [tsConfigPackageJson.name, 'typescript'],
        },
      },
    },

    dir: path.join(import.meta.dirname, 'tests'),
    globalSetup: ['./vitest.global.setup.mts'],
    name: packageJson.name,
    root: import.meta.dirname,

    server: {
      deps: {
        external: [tsConfigPackageJson.name, 'typescript'],
      },
    },

    typecheck: {
      tsconfig: path.join(import.meta.dirname, 'tsconfig.json'),
    },
  },
})

export default vitestConfig
