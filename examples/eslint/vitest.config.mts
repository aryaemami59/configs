import eslintConfigPackageJson from '@aryaemami59/eslint-config/package.json' with { type: 'json' }
import { createVitestProject } from '@aryaemami59/vitest-config'
import * as path from 'node:path'
import packageJson from './package.json' with { type: 'json' }

const vitestConfig = createVitestProject({
  json: {
    namedExports: false,
    stringify: 'auto',
  },

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
    globalSetup: ['./vitest.global.setup.mts'],

    name: {
      label: packageJson.name,
    },

    root: import.meta.dirname,

    testTimeout: process.env.CI ? 60_000 : 10_000,

    typecheck: {
      tsconfig: path.join(import.meta.dirname, 'tsconfig.json'),
    },
  },
})

export default vitestConfig
