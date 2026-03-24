import * as path from 'node:path'
import type { InlineConfig, Rolldown, UserConfig } from 'tsdown'
import { defineConfig } from 'tsdown'
import packageJson from './package.json' with { type: 'json' }

const tsdownConfig = defineConfig((cliOptions) => {
  const commonOptions = {
    clean: false,
    cwd: import.meta.dirname,
    deps: {
      onlyBundle: [],
    },
    devtools: {
      clean: true,
      enabled: true,
    },
    dts: {
      build: false,
      cwd: import.meta.dirname,
      dtsInput: false,
      eager: false,
      emitDtsOnly: false,
      emitJs: false,
      enabled: true,
      incremental: false,
      newContext: true,
      oxc: false,
      parallel: false,
      resolver: 'tsc',
      sideEffects: false,
      sourcemap: true,
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
    inputOptions: (options) =>
      ({
        ...options,
        experimental: {
          ...options.experimental,
          lazyBarrel: true,
          nativeMagicString: true,
        },
      }) as const satisfies Rolldown.InputOptions,
    minify: false,
    nodeProtocol: true,
    outputOptions: (options, format, context) =>
      ({
        ...options,
        codeSplitting: false,
        comments: {
          annotation: true,
          jsdoc: false,
          legal: true,
        },
        strict: true,
        ...(format === 'cjs' && !context.cjsDts
          ? {
              externalLiveBindings: false,
            }
          : {}),
      }) as const satisfies Rolldown.OutputOptions,
    platform: 'node',
    root: 'src',
    shims: true,
    sourcemap: true,
    target: ['esnext'],
    treeshake: {
      moduleSideEffects: false,
    },
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
