import * as path from 'node:path'
import type { InlineConfig, UserConfig } from 'tsdown'
import { defineConfig } from 'tsdown'
import packageJson from './package.json' with { type: 'json' }

const tsdownConfig = defineConfig((cliOptions) => {
  const commonOptions = {
    cwd: import.meta.dirname,
    debug: {},
    dts: {
      emitDtsOnly: false,
      build: false,
      cwd: import.meta.dirname,
      dtsInput: false,
      eager: true,
      emitJs: false,
      incremental: false,
      oxc: false,
      newContext: true,
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
      name: `${packageJson.name} Modern ESM`,
      format: ['es'],
    },
    {
      ...commonOptions,
      name: `${packageJson.name} CJS Development`,
      format: ['cjs'],
    },
  ] as const satisfies UserConfig[]
})

export default tsdownConfig
