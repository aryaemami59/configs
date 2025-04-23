import eslintConfigPackageJson from '@aryaemami59/eslint-config/package.json' with { type: 'json' }
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
          exclude: [eslintConfigPackageJson.name, 'eslint', 'jiti'],
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
        external: [eslintConfigPackageJson.name, 'eslint', 'jiti'],
      },
    },

    testTimeout: process.env.CI ? 60_000 : undefined,
  },
})

export default vitestConfig
