import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Options } from 'tsup'
import { defineConfig } from 'tsup'
import packageJson from './package.json' with { type: 'json' }

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const tsconfig = path.join(
  __dirname,
  'tsconfig.build.json',
) satisfies Options['tsconfig']

const tsupConfig = defineConfig((overrideOptions): Options[] => {
  const commonOptions = {
    clean: true,
    entry: {
      index: 'src/index.ts',
    },
    removeNodeProtocol: false,
    shims: true,
    sourcemap: true,
    splitting: false,
    target: ['esnext', 'node20'],
    tsconfig,
    ...overrideOptions,
  } satisfies Options

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
      dts: { only: true },
      format: ['esm'],
    },
    {
      ...commonOptions,
      name: `${packageJson.name} CJS Type definitions`,
      dts: { only: true },
      format: ['cjs'],
    },
  ]
})

export default tsupConfig
