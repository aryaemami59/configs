import * as path from 'node:path'
import type { Options } from 'tsup'
import { defineConfig } from 'tsup'
import packageJson from './package.json' with { type: 'json' }

const tsupConfig = defineConfig((overrideOptions): Options[] => {
  const commonOptions = {
    clean: true,
    entry: {
      index: path.join(import.meta.dirname, 'src', 'index.ts'),
    },
    removeNodeProtocol: false,
    shims: true,
    sourcemap: true,
    splitting: false,
    target: ['esnext', 'node22'],
    tsconfig: path.join(import.meta.dirname, 'tsconfig.build.json'),
    ...overrideOptions,
  } as const satisfies Options

  return [
    {
      ...commonOptions,
      name: `${packageJson.name} Modern ESM`,
      format: ['esm'],
    },
    {
      ...commonOptions,
      name: `${packageJson.name} CJS Development`,
      format: ['cjs'],
    },
    {
      ...commonOptions,
      name: `${packageJson.name} ESM Type definitions`,
      dts: {
        only: true,
      },
      format: ['esm'],
    },
    {
      ...commonOptions,
      name: `${packageJson.name} CJS Type definitions`,
      dts: {
        only: true,
      },
      format: ['cjs'],
    },
  ]
})

export default tsupConfig
