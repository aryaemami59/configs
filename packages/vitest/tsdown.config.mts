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
      cjsDefault: true,
      cjsReexport: false,
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
      tsconfig: 'tsconfig.build.json',
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
    tsconfig: 'tsconfig.build.json',
    ...cliOptions,
  } as const satisfies InlineConfig

  return [
    {
      ...commonOptions,
      format: ['es'],
      name: `${packageJson.name} ESM`,
    },
    {
      ...commonOptions,
      // Causes `ERR_REQUIRE_ESM` error in CommonJS modules since
      // it is an ESM module (has `"type": "module"` in its `package.json`),
      // and cannot be imported using the `require` syntax,
      // we can inline it to get around this problem.
      // deps: {
      //   neverBundle: ['debug', 'globrex', 'tsconfck'],
      //   onlyBundle: ['vite-tsconfig-paths'],
      // },

      format: ['cjs'],
      name: `${packageJson.name} CJS`,
    },
  ] as const satisfies UserConfig[]
})

export default tsdownConfig
