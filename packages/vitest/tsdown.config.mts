import type {
  InlineConfig,
  Rolldown,
  TsdownPlugin,
  UserConfig,
  UserConfigFn,
} from 'tsdown'
import { defineConfig } from 'tsdown'
import packageJson from './package.json' with { type: 'json' }

/**
 * Matches declaration file extensions (`.d.ts`, `.d.cts` and `.d.mts`).
 *
 * @internal
 */
const RE_DTS = /\.d\.([cm]?)ts$/

/**
 * A {@linkcode TsdownPlugin | Tsdown plugin} to remove generated CommonJS
 * (`.cjs`) JavaScript outputs from DTS-only builds. When generating type
 * definition builds we may still emit stray `.cjs` files; this plugin deletes
 * those entries from the generated bundle to ensure only declaration artifacts
 * remain.
 *
 * @returns A {@linkcode TsdownPlugin | Tsdown plugin} that prunes `.cjs` files from the bundle.
 * @internal
 */
const removeCJSOutputsFromDTSBuilds = (): TsdownPlugin => ({
  generateBundle: {
    handler(outputOptions, bundle, isWrite) {
      if (outputOptions.format === 'cjs' && isWrite) {
        Object.values(bundle).forEach((outputChunk) => {
          if (
            outputChunk.type === 'chunk' &&
            outputChunk.isEntry &&
            !RE_DTS.test(outputChunk.fileName)
          ) {
            delete bundle[outputChunk.fileName]
            delete bundle[`${outputChunk.fileName}.map`]
          }
        })
      }
    },
  },
  name: `${packageJson.name}:remove-cjs-outputs-from-dts-builds`,
})

const tsdownConfig: UserConfigFn = defineConfig((cliOptions) => {
  const commonOptions = {
    checks: {
      circularDependency: true,
    },
    cjsDefault: false,
    clean: false,
    cwd: import.meta.dirname,
    deps: {
      onlyBundle: [],
    },
    devtools: {
      clean: true,
      enabled: true,
    },
    dts: false,
    entry: {
      index: 'src/index.ts',
    },
    failOnWarn: true,
    fixedExtension: false,
    format: ['cjs', 'esm'],
    hash: false,
    inputOptions: (options) =>
      ({
        ...options,
        experimental: {
          ...options.experimental,
          lazyBarrel: true,
          nativeMagicString: true,
        },
        transform: {
          ...options.transform,
          typescript: {
            ...options.transform?.typescript,
            optimizeConstEnums: true,
            optimizeEnums: true,
          },
        },
      }) as const satisfies Rolldown.InputOptions,
    minify: false,
    name: packageJson.name,
    nodeProtocol: true,
    outDir: 'dist',
    outputOptions: (options, format, context) =>
      ({
        ...options,
        codeSplitting: false,
        comments: {
          annotation: true,
          jsdoc: false,
          legal: true,
        },
        ...(format === 'cjs' && !context.cjsDts
          ? {
              externalLiveBindings: false,
            }
          : {}),
        strict: true,
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
      format: ['esm'],
      name: `${packageJson.name}-ESM`,
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
      name: `${packageJson.name}-CJS`,
    },
    {
      ...commonOptions,
      dts: {
        build: false,
        cjsDefault: false,
        cwd: commonOptions.cwd,
        dtsInput: false,
        eager: false,
        emitDtsOnly: true,
        emitJs: false,
        enabled: true,
        generator: 'tsc',
        incremental: false,
        logger: console,
        newContext: false,
        oxc: {},
        parallel: false,
        resolver: 'tsc',
        sideEffects: false,
        sourcemap: true,
        tsconfig: commonOptions.tsconfig,
        tsgo: {},
        vue: false,
      },
      name: `${packageJson.name}-DTS`,
      plugins: [removeCJSOutputsFromDTSBuilds()],
    },
  ] as const satisfies UserConfig[]
})

export default tsdownConfig
