import * as path from 'node:path'
import type { InlineConfig, UserConfig } from 'tsdown'
import { defineConfig } from 'tsdown'
import packageJson from './package.json' with { type: 'json' }

const tsdownConfig = defineConfig((cliOptions) => {
  const commonOptions = {
    cwd: import.meta.dirname,
    debug: {},
    dts: {
      build: false,
      cwd: import.meta.dirname,
      dtsInput: false,
      eager: true,
      emitDtsOnly: false,
      emitJs: false,
      incremental: false,
      newContext: true,
      oxc: false,
      parallel: false,
      resolver: 'tsc',
      sideEffects: false,
      sourcemap: true,
      tsconfig: path.join(import.meta.dirname, 'tsconfig.build.json'),
      tsgo: false,
      tsMacro: false,
      vue: false,
    },
    entry: {
      index: 'src/index.ts',
    },
    failOnWarn: true,
    fixedExtension: false,
    hash: false,
    inlineOnly: [],
    nodeProtocol: true,
    platform: 'node',
    shims: true,
    sourcemap: true,
    target: ['esnext', 'node22'],
    tsconfig: path.join(import.meta.dirname, 'tsconfig.build.json'),
    ...cliOptions,
  } as const satisfies InlineConfig

  return [
    {
      ...commonOptions,
      format: ['es'],
      name: `${packageJson.name} Modern ESM`,
    },
    {
      ...commonOptions,
      format: ['cjs'],
      name: `${packageJson.name} CJS Development`,
    },
  ] as const satisfies UserConfig[]
})

export default tsdownConfig
