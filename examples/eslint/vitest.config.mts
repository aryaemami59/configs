import eslintConfigPackageJson from '@aryaemami59/eslint-config/package.json' with { type: 'json' }
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
        external: [eslintConfigPackageJson.name, 'eslint', 'jiti'],
      },
    },

    deps: {
      interopDefault: false,

      optimizer: {
        ssr: {
          exclude: [eslintConfigPackageJson.name, 'eslint', 'jiti'],
        },
      },
    },

    globalSetup: ['./tests/vitest.setup.mts'],

    testTimeout: process.env.CI ? 60_000 : undefined,

    sequence: {
      concurrent: true,
    },

    isolate: false,
  },
})

export default vitestConfig
