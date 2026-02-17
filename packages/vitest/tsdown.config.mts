import * as path from 'node:path'
import type { InlineConfig, Rolldown, UserConfig } from 'tsdown'
import { defineConfig } from 'tsdown'
import packageJson from './package.json' with { type: 'json' }

const tsdownConfig = defineConfig((cliOptions) => {
  const commonOptions = {
    clean: false,
    cwd: import.meta.dirname,
    devtools: {
      clean: false,
    },
    dts: {
      build: false,
      cwd: import.meta.dirname,
      dtsInput: false,
      eager: true,
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
    inputOptions: (options) =>
      ({
        ...options,
        experimental: {
          ...options.experimental,
          lazyBarrel: true,
        },
      }) as const satisfies Rolldown.InputOptions,
    nodeProtocol: true,
    outputOptions: (options, format, context) =>
      ({
        ...options,
        codeSplitting: false,
        // comments: {
        //   annotation: true,
        //   jsdoc: false,
        //   legal: true,
        // },
        legalComments: 'none',
        ...(format === 'cjs' && !context.cjsDts
          ? {
              externalLiveBindings: false,
              intro: '"use strict";',
            }
          : {}),
      }) as const satisfies Rolldown.OutputOptions,
    platform: 'node',
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
      // external: ['debug', 'globrex', 'tsconfck'],
      format: ['cjs'],

      name: `${packageJson.name} CJS Development`,
      // Causes `ERR_REQUIRE_ESM` error in CommonJS modules since
      // it is an ESM module (has `"type": "module"` in its `package.json`),
      // and cannot be imported using the `require` syntax,
      // we can inline it to get around this problem.
      // inlineOnly: ['vite-tsconfig-paths'],
    },
  ] as const satisfies UserConfig[]
})

export default tsdownConfig
