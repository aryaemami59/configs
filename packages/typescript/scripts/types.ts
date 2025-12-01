import type { StringLiteralUnion } from './typeHelpers.ts'

export type BuildOptions = {
  /**
   * Have recompiles in projects that use `incremental` and `watch` mode assume
   * that changes within a file will only affect files directly depending on it.
   *
   * @default false
   */
  assumeChangesOnlyAffectDirectDependencies?: boolean

  /**
   * Show what would be built (or deleted, if specified with `--clean`).
   *
   * @default false
   */
  dry?: boolean

  /**
   * Build all projects, including those that appear to be up to date.
   *
   * @default false
   */
  force?: boolean

  /**
   * Save `.tsbuildinfo` files to allow for incremental compilation of projects.
   *
   * @default false
   */
  incremental?: boolean

  /**
   * Log paths used during the `moduleResolution` process.
   *
   * @default false
   */
  traceResolution?: boolean

  /**
   * Enable verbose logging.
   *
   * @default false
   */
  verbose?: boolean
}

export type JSX =
  | 'preserve'
  | 'react'
  | 'react-jsx'
  | 'react-jsxdev'
  | 'react-native'

export type Module =
  | 'CommonJS'
  | 'AMD'
  | 'System'
  | 'UMD'
  | 'ES6'
  | 'ES2015'
  | 'ES2020'
  | 'ES2022'
  | 'ESNext'
  | 'Node16'
  | 'Node18'
  | 'Node20'
  | 'NodeNext'
  | 'Preserve'
  | 'None'
  // Lowercase alternatives
  | 'commonjs'
  | 'amd'
  | 'system'
  | 'umd'
  | 'es6'
  | 'es2015'
  | 'es2020'
  | 'es2022'
  | 'esnext'
  | 'node16'
  | 'node18'
  | 'node20'
  | 'nodenext'
  | 'preserve'
  | 'none'

export type NewLine =
  | 'CRLF'
  | 'LF'
  // Lowercase alternatives
  | 'crlf'
  | 'lf'

export type Target =
  | 'ES3'
  | 'ES5'
  | 'ES6'
  | 'ES2015'
  | 'ES2016'
  | 'ES2017'
  | 'ES2018'
  | 'ES2019'
  | 'ES2020'
  | 'ES2021'
  | 'ES2022'
  | 'ES2023'
  | 'ES2024'
  | 'ESNext'
  // Lowercase alternatives
  | 'es3'
  | 'es5'
  | 'es6'
  | 'es2015'
  | 'es2016'
  | 'es2017'
  | 'es2018'
  | 'es2019'
  | 'es2020'
  | 'es2021'
  | 'es2022'
  | 'es2023'
  | 'es2024'
  | 'esnext'

export type Lib =
  | 'ES5'
  | 'ES6'
  | 'ES7'
  | 'ES2015'
  | 'ES2015.Collection'
  | 'ES2015.Core'
  | 'ES2015.Generator'
  | 'ES2015.Iterable'
  | 'ES2015.Promise'
  | 'ES2015.Proxy'
  | 'ES2015.Reflect'
  | 'ES2015.Symbol.WellKnown'
  | 'ES2015.Symbol'
  | 'ES2016'
  | 'ES2016.Array.Include'
  | 'ES2017'
  | 'ES2017.ArrayBuffer'
  | 'ES2017.Date'
  | 'ES2017.Intl'
  | 'ES2017.Object'
  | 'ES2017.SharedMemory'
  | 'ES2017.String'
  | 'ES2017.TypedArrays'
  | 'ES2018'
  | 'ES2018.AsyncGenerator'
  | 'ES2018.AsyncIterable'
  | 'ES2018.Intl'
  | 'ES2018.Promise'
  | 'ES2018.Regexp'
  | 'ES2019'
  | 'ES2019.Array'
  | 'ES2019.Intl'
  | 'ES2019.Object'
  | 'ES2019.String'
  | 'ES2019.Symbol'
  | 'ES2020'
  | 'ES2020.BigInt'
  | 'ES2020.Date'
  | 'ES2020.Intl'
  | 'ES2020.Number'
  | 'ES2020.Promise'
  | 'ES2020.SharedMemory'
  | 'ES2020.String'
  | 'ES2020.Symbol.WellKnown'
  | 'ES2021'
  | 'ES2021.Intl'
  | 'ES2021.Promise'
  | 'ES2021.String'
  | 'ES2021.WeakRef'
  | 'ES2022'
  | 'ES2022.Array'
  | 'ES2022.Error'
  | 'ES2022.Intl'
  | 'ES2022.Object'
  | 'ES2022.RegExp'
  | 'ES2022.SharedMemory'
  | 'ES2022.String'
  | 'ES2023'
  | 'ES2023.Array'
  | 'ES2023.Collection'
  | 'ES2023.Intl'
  | 'ES2024'
  | 'ES2024.ArrayBuffer'
  | 'ES2024.Collection'
  | 'ES2024.Object'
  | 'ES2024.Promise'
  | 'ES2024.Regexp'
  | 'ES2024.SharedMemory'
  | 'ES2024.String'
  | 'ESNext'
  | 'ESNext.Array'
  | 'ESNext.AsyncIterable'
  | 'ESNext.BigInt'
  | 'ESNext.Collection'
  | 'ESNext.Decorators'
  | 'ESNext.Disposable'
  | 'ESNext.Error'
  | 'ESNext.Intl'
  | 'ESNext.Iterator'
  | 'ESNext.Object'
  | 'ESNext.Promise'
  | 'ESNext.Regexp'
  | 'ESNext.String'
  | 'ESNext.Symbol'
  | 'ESNext.WeakRef'
  | 'DOM'
  | 'DOM.AsyncIterable'
  | 'DOM.Iterable'
  | 'Decorators'
  | 'Decorators.Legacy'
  | 'ScriptHost'
  | 'WebWorker'
  | 'WebWorker.AsyncIterable'
  | 'WebWorker.ImportScripts'
  | 'WebWorker.Iterable'
  // Lowercase alternatives
  | 'es5'
  | 'es6'
  | 'es7'
  | 'es2015'
  | 'es2015.collection'
  | 'es2015.core'
  | 'es2015.generator'
  | 'es2015.iterable'
  | 'es2015.promise'
  | 'es2015.proxy'
  | 'es2015.reflect'
  | 'es2015.symbol.wellknown'
  | 'es2015.symbol'
  | 'es2016'
  | 'es2016.array.include'
  | 'es2017'
  | 'es2017.arraybuffer'
  | 'es2017.date'
  | 'es2017.intl'
  | 'es2017.object'
  | 'es2017.sharedmemory'
  | 'es2017.string'
  | 'es2017.typedarrays'
  | 'es2018'
  | 'es2018.asyncgenerator'
  | 'es2018.asynciterable'
  | 'es2018.intl'
  | 'es2018.promise'
  | 'es2018.regexp'
  | 'es2019'
  | 'es2019.array'
  | 'es2019.intl'
  | 'es2019.object'
  | 'es2019.string'
  | 'es2019.symbol'
  | 'es2020'
  | 'es2020.bigint'
  | 'es2020.date'
  | 'es2020.intl'
  | 'es2020.number'
  | 'es2020.promise'
  | 'es2020.sharedmemory'
  | 'es2020.string'
  | 'es2020.symbol.wellknown'
  | 'es2021'
  | 'es2021.intl'
  | 'es2021.promise'
  | 'es2021.string'
  | 'es2021.weakref'
  | 'es2022'
  | 'es2022.array'
  | 'es2022.error'
  | 'es2022.intl'
  | 'es2022.object'
  | 'es2022.regexp'
  | 'es2022.sharedmemory'
  | 'es2022.string'
  | 'es2023'
  | 'es2023.array'
  | 'es2023.collection'
  | 'es2023.intl'
  | 'es2024'
  | 'es2024.arraybuffer'
  | 'es2024.collection'
  | 'es2024.object'
  | 'es2024.promise'
  | 'es2024.regexp'
  | 'es2024.sharedmemory'
  | 'es2024.string'
  | 'esnext'
  | 'esnext.array'
  | 'esnext.asynciterable'
  | 'esnext.bigint'
  | 'esnext.collection'
  | 'esnext.decorators'
  | 'esnext.disposable'
  | 'esnext.error'
  | 'esnext.intl'
  | 'esnext.iterator'
  | 'esnext.object'
  | 'esnext.promise'
  | 'esnext.regexp'
  | 'esnext.string'
  | 'esnext.symbol'
  | 'esnext.weakref'
  | 'dom'
  | 'dom.asynciterable'
  | 'dom.iterable'
  | 'decorators'
  | 'decorators.legacy'
  | 'scripthost'
  | 'webworker'
  | 'webworker.asynciterable'
  | 'webworker.importscripts'
  | 'webworker.iterable'

export type Plugin = {
  /**
   * Plugin name.
   */
  name: string
}

export type ImportsNotUsedAsValues = 'remove' | 'preserve' | 'error'

export type FallbackPolling =
  | 'fixedPollingInterval'
  | 'priorityPollingInterval'
  | 'dynamicPriorityPolling'
  | 'fixedInterval'
  | 'priorityInterval'
  | 'dynamicPriority'
  | 'fixedChunkSize'

export type WatchDirectory =
  | 'useFsEvents'
  | 'fixedPollingInterval'
  | 'dynamicPriorityPolling'
  | 'fixedChunkSizePolling'

export type WatchFile =
  | 'fixedPollingInterval'
  | 'priorityPollingInterval'
  | 'dynamicPriorityPolling'
  | 'useFsEvents'
  | 'useFsEventsOnParentDirectory'
  | 'fixedChunkSizePolling'

export type ModuleResolution =
  | 'classic'
  /**
   * @deprecated since v5.0.0 - Use `'node10'` instead.
   */
  | 'node'
  | 'node10'
  | 'node16'
  | 'nodenext'
  | 'bundler'
  // Pascal-cased alternatives
  | 'Classic'
  /**
   * @deprecated since v5.0.0 - Use `'node10'` instead.
   */
  | 'Node'
  | 'Node10'
  | 'Node16'
  | 'NodeNext'
  | 'Bundler'

export type ModuleDetection = 'auto' | 'legacy' | 'force'

export type IgnoreDeprecations =
  /**
   * @since v5.5.0
   */
  | '5.0'
  /**
   * @since v6.0.0
   */
  | '6.0'

export type CompilerOptions = {
  /**
   * The character set of the input files.
   *
   * @default 'utf8'
   * @since v1.0.0
   * @deprecated This option will be removed in TypeScript 5.5.
   */
  charset?: string

  /**
   * Enables building for project references.
   *
   * @since v3.0.0
   * @default true
   */
  composite?: boolean

  /**
   * Generates corresponding `d.ts` files.
   *
   * @since v1.0.0
   * @default false
   */
  declaration?: boolean

  /**
   * Specify output directory for generated declaration files.
   *
   * @since v2.0.0
   */
  declarationDir?: string

  /**
   * Show diagnostic information.
   *
   * @since v1.0.0
   * @default false
   */
  diagnostics?: boolean

  /**
   * Reduce the number of projects loaded automatically by TypeScript.
   *
   * @since v4.0.0
   * @default false
   */
  disableReferencedProjectLoad?: boolean

  /**
   * Enforces using indexed accessors for keys declared using an indexed type.
   *
   * @since v4.2.0
   * @default false
   */
  noPropertyAccessFromIndexSignature?: boolean

  /**
   * Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files.
   *
   * @since v1.0.0
   * @default false
   */
  emitBOM?: boolean

  /**
   * Only emit `.d.ts` declaration files.
   *
   * @since v2.8.0
   * @default false
   */
  emitDeclarationOnly?: boolean

  /**
   * Differentiate between `undefined` and not present when export type
   * checking.
   *
   * @since v4.4.0
   * @default false
   */
  exactOptionalPropertyTypes?: boolean

  /**
   * Enable incremental compilation.
   *
   * @since v3.4.0
   * @default compilerOptions.composite === true
   */
  incremental?: boolean

  /**
   * Specify file to store incremental compilation information.
   *
   * @since v3.4.0
   * @default '.tsbuildinfo'
   */
  tsBuildInfoFile?: StringLiteralUnion<'.tsbuildinfo'>

  /**
   * Emit a single file with source maps instead of having a separate file.
   *
   * @since v1.5.0
   * @default false
   */
  inlineSourceMap?: boolean

  /**
   * Emit the source alongside the sourcemaps within a single file. Requires
   * `--inlineSourceMap` to be set.
   *
   * @since v1.5.0
   * @default false
   */
  inlineSources?: boolean

  /**
   * Specify what JSX code is generated.
   *
   * @since v1.6.0
   * @default 'preserve'
   */
  jsx?: JSX

  /**
   * Specifies the object invoked for `createElement` and `__spread` when
   * targeting `'react'` JSX emit.
   *
   * @since v1.8.0
   * @default 'React'
   */
  reactNamespace?: StringLiteralUnion<'React'>

  /**
   * Specify the JSX factory function to use when targeting React JSX emit,
   * e.g. `'React.createElement'` or `'h'`.
   *
   * @since v2.2.0
   * @default 'React.createElement'
   */
  jsxFactory?: StringLiteralUnion<'React.createElement'>

  /**
   * Specify the JSX Fragment reference used for fragments when targeting React
   * JSX emit e.g. `'React.Fragment'` or `'Fragment'`.
   *
   * @since v4.0.0
   * @default 'React.Fragment'
   */
  jsxFragmentFactory?: StringLiteralUnion<'React.Fragment'>

  /**
   * Specify module specifier used to import the JSX factory functions when
   * using `jsx: react-jsx*`.
   *
   * @since v4.1.0
   * @default 'react'
   */
  jsxImportSource?: StringLiteralUnion<'react'>

  /**
   * Print names of files part of the compilation.
   *
   * @since v1.5.0
   * @default false
   */
  listFiles?: boolean

  /**
   * Specifies the location where debugger should locate map files instead of
   * generated locations.
   *
   * @since v1.0.0
   */
  mapRoot?: string

  /**
   * Specify module code generation:
   * - **`'None'`**
   * - **`'CommonJS'`**
   * - **`'AMD'`**
   * - **`'System'`**
   * - **`'UMD'`**
   * - **`'ES6'`**
   * - **`'ES2015'`**
   * - **`'ESNext'`**
   *
   * Only `'AMD'` and `'System'` can be used in conjunction with `--outFile`.
   * `'ES6'` and `'ES2015'` values may be used when targeting `'ES5'` or lower.
   *
   * @since v1.0.0
   * @default ['ES3', 'ES5'].includes(target) ? 'CommonJS' : 'ES6'
   */
  module?: Module

  /**
   * Specifies module resolution. Strategy:
   * - **`'node'` (Node)**
   * - **`'classic'` (TypeScript pre 1.6)**
   *
   * @since v1.6.0
   * @default ['AMD', 'System', 'ES6'].includes(module) ? 'classic' : 'node'
   */
  moduleResolution?: ModuleResolution

  /**
   * Specifies the end of line sequence to be used when emitting files:
   * - **`'crlf'` (Windows)**
   * - **`'lf'` (Unix)**
   *
   * @since v1.5.0
   * @default 'lf'
   */
  newLine?: NewLine

  /**
   * Disable full export type checking
   * (only critical parse and emit errors will be reported).
   *
   * @since v5.6.0
   * @default false
   */
  noCheck?: boolean

  /**
   * Do not emit output.
   *
   * @since v1.5.0
   * @default false
   */
  noEmit?: boolean

  /**
   * Do not generate custom helper functions like `__extends` in compiled
   * output.
   *
   * @since v1.5.0
   * @default false
   */
  noEmitHelpers?: boolean

  /**
   * Do not emit outputs if any export type checking errors were reported.
   *
   * @since v1.4.0
   * @default false
   */
  noEmitOnError?: boolean

  /**
   * Warn on expressions and declarations with an implied `any` type.
   *
   * @since v1.0.0
   * @default false
   */
  noImplicitAny?: boolean

  /**
   * Raise error on `this` expressions with an implied `any` type.
   *
   * @since v2.0.0
   * @default false
   */
  noImplicitThis?: boolean

  /**
   * Report errors on unused locals.
   *
   * @since v2.0.0
   * @default false
   */
  noUnusedLocals?: boolean

  /**
   * Report errors on unused parameters.
   *
   * @since v2.0.0
   * @default false
   */
  noUnusedParameters?: boolean

  /**
   * Do not include the default library file (`lib.d.ts`).
   *
   * @since v1.0.0
   * @default false
   */
  noLib?: boolean

  /**
   * Do not add triple-slash references or module import targets to the list of
   * compiled files.
   *
   * @since v1.0.0
   * @default false
   */
  noResolve?: boolean

  /**
   * Disable strict checking of generic signatures in function types.
   *
   * @since v2.5.0
   * @default false
   * @deprecated This option will be removed in TypeScript 5.5.
   */
  noStrictGenericChecks?: boolean

  /**
   * It computes the final file location in a way that is not predictable or
   * consistent.
   *
   * @since v1.0.0
   * @deprecated Use {@linkcode CompilerOptions.outFile | outFile} instead.
   */
  out?: string

  /**
   * Skip type checking of default library declaration files.
   *
   * @since v1.6.0
   * @deprecated Use {@linkcode CompilerOptions.skipLibCheck | skipLibCheck} instead.
   */
  skipDefaultLibCheck?: boolean

  /**
   * Skip export type checking of declaration files.
   *
   * @since v2.0.0
   * @default false
   */
  skipLibCheck?: boolean

  /**
   * Concatenate and emit output to single file.
   *
   * @since v1.6.0
   */
  outFile?: string

  /**
   * Redirect output structure to the directory.
   *
   * @since v1.0.0
   */
  outDir?: string

  /**
   * Do not erase `const enum` declarations in generated code.
   *
   * @since v1.4.0
   * @default false
   */
  preserveConstEnums?: boolean

  /**
   * Do not resolve symlinks to their real path; treat a symlinked file like a
   * real one.
   *
   * @since v2.5.0
   * @default false
   */
  preserveSymlinks?: boolean

  /**
   * Keep outdated console output in watch mode instead of clearing the screen.
   *
   * @since v2.8.0
   * @default false
   */
  preserveWatchOutput?: boolean

  /**
   * Stylize errors and messages using color and context (experimental).
   *
   * @since v1.8.0
   * @default true // Unless piping to another program or redirecting output to a file.
   */
  pretty?: boolean

  /**
   * Do not emit comments to output.
   *
   * @since v1.0.0
   * @default false
   */
  removeComments?: boolean

  /**
   * Rewrite `'.ts'`, `'.tsx'`, `'.mts'`, and `'.cts'` file extensions in
   * relative import paths to their JavaScript equivalent in output files.
   *
   * @since v5.7.0
   * @default false
   */
  rewriteRelativeImportExtensions?: boolean

  /**
   * Specifies the root directory of input files. Use to control the output
   * directory structure with `--outDir`.
   *
   * @since v1.5.0
   */
  rootDir?: string

  /**
   * Unconditionally emit imports for unresolved files.
   *
   * @since v1.5.0
   * @default false
   */
  isolatedModules?: boolean

  /**
   * Require sufficient annotation on exports so other tools can trivially
   * generate declaration files.
   *
   * @since v5.5.0
   * @default false
   */
  isolatedDeclarations?: boolean

  /**
   * Generates corresponding `'.map'` file.
   *
   * @since v1.0.0
   * @default false
   */
  sourceMap?: boolean

  /**
   * Specifies the location where debugger should locate TypeScript files
   * instead of source locations.
   *
   * @since v1.0.0
   */
  sourceRoot?: string

  /**
   * Suppress excess property checks for object literals.
   *
   * @since v1.6.0
   * @default false
   * @deprecated This option will be removed in TypeScript 5.5.
   */
  suppressExcessPropertyErrors?: boolean

  /**
   * Suppress {@linkcode CompilerOptions.noImplicitAny | noImplicitAny}
   * errors for indexing objects lacking index signatures.
   *
   * @since v1.4.0
   * @default false
   * @deprecated This option will be removed in TypeScript 5.5.
   */
  suppressImplicitAnyIndexErrors?: boolean

  /**
   * Do not emit declarations for code that has an `@internal` annotation.
   *
   * @since v1.5.0
   */
  stripInternal?: boolean

  /**
   * Specify ECMAScript target version.
   *
   * @since v1.0.0
   * @default 'es3'
   */
  target?: Target

  /**
   * Default `catch` clause variables as `unknown` instead of `any`.
   *
   * @since v4.4.0
   * @default false
   */
  useUnknownInCatchVariables?: boolean

  /**
   * Watch input files.
   *
   * @default false
   * @deprecated Use {@linkcode TsConfigJson.watchOptions | watchOptions} instead.
   */
  watch?: boolean

  /**
   * Specify the polling strategy to use when the system runs out of or doesn't
   * support native file watchers.
   *
   * @since v3.8.0
   * @deprecated Use {@linkcode WatchOptions.fallbackPolling | watchOptions.fallbackPolling} instead.
   */
  fallbackPolling?: FallbackPolling

  /**
   * Specify the strategy for watching directories under systems that lack
   * recursive file-watching functionality.
   *
   * @since v3.8.0
   * @default 'useFsEvents'
   * @deprecated Use {@linkcode WatchOptions.watchDirectory | watchOptions.watchDirectory} instead.
   */
  watchDirectory?: WatchDirectory

  /**
   * Specify the strategy for watching individual files.
   *
   * @since v3.8.0
   * @default 'useFsEvents'
   * @deprecated Use {@linkcode WatchOptions.watchFile | watchOptions.watchFile} instead.
   */
  watchFile?: WatchFile

  /**
   * Enables experimental support for ES7 decorators.
   *
   * @since v1.5.0
   * @default false
   */
  experimentalDecorators?: boolean

  /**
   * Emit design-export type metadata for decorated declarations in source.
   *
   * @since v1.5.0
   * @default false
   */
  emitDecoratorMetadata?: boolean

  /**
   * Do not report errors on unused labels.
   *
   * @since v1.8.0
   * @default false
   */
  allowUnusedLabels?: boolean

  /**
   * Report error when not all code paths in function return a value.
   *
   * @since v1.8.0
   * @default false
   */
  noImplicitReturns?: boolean

  /**
   * Add `undefined` to a export type when accessed using an index.
   *
   * @since v4.1.0
   * @default false
   */
  noUncheckedIndexedAccess?: boolean

  /**
   * Report error if failed to find a source file for a side effect import.
   *
   * @since v5.6.0
   * @default false
   */
  noUncheckedSideEffectImports?: boolean

  /**
   * Report errors for fallthrough cases in `switch` statement.
   *
   * @since v1.8.0
   * @default false
   */
  noFallthroughCasesInSwitch?: boolean

  /**
   * Ensure overriding members in derived classes are marked with an `override`
   * modifier.
   *
   * @since v4.3.0
   * @default false
   */
  noImplicitOverride?: boolean

  /**
   * Do not report errors on unreachable code.
   *
   * @since v1.8.0
   * @default false
   */
  allowUnreachableCode?: boolean

  /**
   * Disallow inconsistently-cased references to the same file.
   *
   * @since v1.8.0
   * @default true
   */
  forceConsistentCasingInFileNames?: boolean

  /**
   * Emit a v8 CPU profile of the compiler run for debugging.
   *
   * @since v3.7.0
   * @default 'profile.cpuprofile'
   */
  generateCpuProfile?: StringLiteralUnion<'profile.cpuprofile'>

  /**
   * Generates an event trace and a list of types.
   *
   * @since v4.1.0
   */
  generateTrace?: boolean

  /**
   * Base directory to resolve non-relative module names.
   *
   * @since v2.0.0
   */
  baseUrl?: string

  /**
   * Specify path mapping to be computed relative to
   * {@linkcode CompilerOptions.baseUrl | baseUrl} option.
   *
   * @since v2.0.0
   */
  paths?: Record<string, string[]>

  /**
   * List of TypeScript language server plugins to load.
   *
   * @since v2.2.0
   */
  plugins?: Plugin[]

  /**
   * Specify list of root directories to be used when resolving modules.
   *
   * @since v2.0.0
   */
  rootDirs?: string[]

  /**
   * Specify list of directories for export type definition files to be
   * included.
   *
   * @since v2.0.0
   */
  typeRoots?: string[]

  /**
   * Type declaration files to be included in compilation.
   *
   * @since v2.0.0
   */
  types?: string[]

  /**
   * Enable tracing of the name resolution process.
   *
   * @since v2.0.0
   * @default false
   */
  traceResolution?: boolean

  /**
   * Allow JavaScript files to be compiled.
   *
   * @since v1.8.0
   * @default false
   */
  allowJs?: boolean

  /**
   * Do not truncate error messages.
   *
   * @since v1.0.0
   * @default false
   */
  noErrorTruncation?: boolean

  /**
   * Allow `default` imports from modules with no `default` export. This does
   * not affect code emit, just typechecking.
   *
   * @since v1.8.0
   * @default module === 'system' || esModuleInterop
   */
  allowSyntheticDefaultImports?: boolean

  /**
   * Do not emit `'use strict'` directives in module output.
   *
   * @since v1.8.0
   * @default false
   * @deprecated This option will be removed in TypeScript 5.5.
   */
  noImplicitUseStrict?: boolean

  /**
   * Enable to list all emitted files.
   *
   * @since v2.0.0
   * @default false
   */
  listEmittedFiles?: boolean

  /**
   * Disable size limit for JavaScript project.
   *
   * @since v2.0.0
   * @default false
   */
  disableSizeLimit?: boolean

  /**
   * List of library files to be included in the compilation.
   *
   * @since v2.0.0
   */
  lib?: Lib[]

  /**
   * Enable strict null checks.
   *
   * @since v2.0.0
   * @default false
   */
  strictNullChecks?: boolean

  /**
   * The maximum dependency depth to search under `node_modules` and load
   * JavaScript files. Only applicable with `--allowJs`.
   *
   * @since v2.0.0
   * @default 0
   */
  maxNodeModuleJsDepth?: number

  /**
   * Import emit helpers (e.g. `__extends`, `__rest`, etc..) from `tslib`.
   *
   * @since v2.1.0
   * @default false
   */
  importHelpers?: boolean

  /**
   * Specify emit/checking behavior for imports that are only used for types.
   *
   * @since v3.8.0
   * @default 'remove'
   * @deprecated Use {@linkcode CompilerOptions.verbatimModuleSyntax | verbatimModuleSyntax} instead.
   */
  importsNotUsedAsValues?: ImportsNotUsedAsValues

  /**
   * Parse in strict mode and emit `'use strict'` for each source file.
   *
   * @since v2.1.0
   * @default false
   */
  alwaysStrict?: boolean

  /**
   * Enable all strict export type checking options.
   *
   * @since v2.3.0
   * @default false
   */
  strict?: boolean

  /**
   * Enable stricter checking of of the `bind`, `call`, and `apply` methods on
   * functions.
   *
   * @since v3.2.0
   * @default false
   */
  strictBindCallApply?: boolean

  /**
   * Provide full support for iterables in `for-of`, spread, and
   * destructuring when targeting `ES5` or `ES3`.
   *
   * @since v2.3.0
   * @default false
   */
  downlevelIteration?: boolean

  /**
   * Report errors in `.js` files.
   *
   * @since v2.3.0
   * @default false
   */
  checkJs?: boolean

  /**
   * Built-in iterators are instantiated with a `TReturn` export type of
   * `undefined` instead of `any`.
   *
   * @since v5.6.0
   * @default false
   */
  strictBuiltinIteratorReturn?: boolean

  /**
   * Disable bivariant parameter checking for function types.
   *
   * @since v2.6.0
   * @default false
   */
  strictFunctionTypes?: boolean

  /**
   * Ensure non-undefined class properties are initialized in the constructor.
   *
   * @since v2.7.0
   * @default false
   */
  strictPropertyInitialization?: boolean

  /**
   * Emit `__importStar` and `__importDefault` helpers for runtime Babel
   * ecosystem compatibility and enable `--allowSyntheticDefaultImports` for
   * typesystem compatibility.
   *
   * @since v2.7.0
   * @default false
   */
  esModuleInterop?: boolean

  /**
   * Allow accessing UMD globals from modules.
   *
   * @since v3.5.0
   * @default false
   */
  allowUmdGlobalAccess?: boolean

  /**
   * Resolve `keyof` to string valued
   * property names only (no numbers or symbols).
   *
   * @since v2.9.0
   * @default false
   * @deprecated This option will be removed in TypeScript 5.5.
   */
  keyofStringsOnly?: boolean

  /**
   * Emit ECMAScript standard class fields.
   *
   * @since v3.7.0
   * @default false
   */
  useDefineForClassFields?: boolean

  /**
   * Generates a sourcemap for each corresponding `.d.ts` file.
   *
   * @since v2.3.0
   * @default false
   */
  declarationMap?: boolean

  /**
   * Include modules imported with `.json` extension.
   *
   * @since v2.9.0
   * @default false
   */
  resolveJsonModule?: boolean

  /**
   * Have recompiles in `--incremental` and `--watch` assume that changes
   * within a file will only affect files directly depending on it.
   *
   * @since v3.8.0
   * @default false
   */
  assumeChangesOnlyAffectDirectDependencies?: boolean

  /**
   * Output more detailed compiler performance information after building.
   *
   * @since v2.0.0
   * @default false
   */
  extendedDiagnostics?: boolean

  /**
   * Print names of files that are part of the compilation and
   * then stop processing.
   *
   * @default false
   */
  listFilesOnly?: boolean

  /**
   * Disable preferring source files instead of declaration files when
   * referencing composite projects.
   *
   * @since v3.7.0
   * @default true if composite, false otherwise
   */
  disableSourceOfProjectReferenceRedirect?: boolean

  /**
   * Opt a project out of multi-project reference checking when editing.
   *
   * @since v3.8.0
   * @default false
   */
  disableSolutionSearching?: boolean

  /**
   * Print names of files which TypeScript sees as a part of your project and
   * the reason they are part of the compilation.
   *
   * @since v4.2.0
   * @default false
   */
  explainFiles?: boolean

  /**
   * Preserve unused imported values in the JavaScript output that
   * would otherwise be removed.
   *
   * @since v4.5.0
   * @default true
   * @deprecated Use {@linkcode CompilerOptions.verbatimModuleSyntax | verbatimModuleSyntax} instead.
   */
  preserveValueImports?: boolean

  /**
   * List of file name suffixes to search when resolving a module.
   *
   * @since v4.7.0
   */
  moduleSuffixes?: string[]

  /**
   * Control what method is used to detect module-format JS files.
   *
   * @since v4.7.0
   * @default 'auto'
   */
  moduleDetection?: ModuleDetection

  /**
   * Allows TypeScript files to import each other with a
   * TypeScript-specific extension like `.ts`, `.mts`, or `.tsx`.
   *
   * @since v5.0.0
   * @default false
   */
  allowImportingTsExtensions?: boolean

  /**
   * Forces TypeScript to consult the exports field of `package.json` files
   * if it ever reads from a package in `node_modules`.
   *
   * @since v5.0.0
   * @default false
   */
  resolvePackageJsonExports?: boolean

  /**
   * Forces TypeScript to consult the imports field of `package.json` files
   * when performing a lookup that starts with `#` from a file whose
   * ancestor directory contains a `package.json`.
   *
   * @since v5.0.0
   * @default false
   */
  resolvePackageJsonImports?: boolean

  /**
   * Suppress errors for file formats that TypeScript does not understand.
   *
   * @since v5.0.0
   * @default false
   */
  allowArbitraryExtensions?: boolean

  /**
   * List of additional conditions that should succeed when TypeScript
   * resolves from `package.json`.
   *
   * @since v5.0.0
   */
  customConditions?: string[]

  /**
   * Anything that uses the export type modifier is dropped entirely.
   *
   * @since v5.0.0
   * @default false
   */
  verbatimModuleSyntax?: boolean

  /**
   * Suppress deprecation warnings
   *
   * @since v5.5.0
   */
  ignoreDeprecations?: IgnoreDeprecations

  /**
   * Do not allow runtime constructs that are not part of ECMAScript.
   *
   * @since v5.8.0
   * @default false
   */
  erasableSyntaxOnly?: boolean

  /**
   * Enable lib replacement.
   *
   * @since v5.8.0
   * @default true
   */
  libReplacement?: boolean
}

export type WatchFileKind =
  | 'FixedPollingInterval'
  | 'PriorityPollingInterval'
  | 'DynamicPriorityPolling'
  | 'FixedChunkSizePolling'
  | 'UseFsEvents'
  | 'UseFsEventsOnParentDirectory'

export type WatchDirectoryKind =
  | 'UseFsEvents'
  | 'FixedPollingInterval'
  | 'DynamicPriorityPolling'
  | 'FixedChunkSizePolling'

export type PollingWatchKind =
  | 'FixedInterval'
  | 'PriorityInterval'
  | 'DynamicPriority'
  | 'FixedChunkSize'

export type WatchOptions = {
  /**
   * Specify the strategy for watching individual files.
   *
   * @since v3.8.0
   * @default 'UseFsEvents'
   */
  watchFile?: WatchFileKind | Lowercase<WatchFileKind>

  /**
   * Specify the strategy for watching directories under systems that lack
   * recursive file-watching functionality.
   *
   * @since v3.8.0
   * @default 'UseFsEvents'
   */
  watchDirectory?: WatchDirectoryKind | Lowercase<WatchDirectoryKind>

  /**
   * Specify the polling strategy to use when the system runs out of or doesn't
   * support native file watchers.
   *
   * @since v3.8.0
   */
  fallbackPolling?: PollingWatchKind | Lowercase<PollingWatchKind>

  /**
   * Enable synchronous updates on directory watchers for platforms that don't
   * support recursive watching natively.
   *
   * @since v3.8.0
   */
  synchronousWatchDirectory?: boolean

  /**
   * Specifies a list of directories to exclude from watch.
   *
   * @since v4.2.0
   */
  excludeDirectories?: string[]

  /**
   * Specifies a list of files to exclude from watch.
   *
   * @since v4.2.0
   */
  excludeFiles?: string[]
}

/**
 * Auto export type (`.d.ts`) acquisition options for this project.
 */
export type TypeAcquisition = {
  /**
   * Enable auto export type acquisition.
   *
   * @default false
   */
  enable?: boolean

  /**
   * Specifies a list of export type declarations to be included in
   * auto export type acquisition. For example, `['jquery', 'lodash']`.
   */
  include?: string[]

  /**
   * Specifies a list of export type declarations to be excluded from
   * auto export type acquisition. For example, `['jquery', 'lodash']`.
   */
  exclude?: string[]

  /**
   * Disable inferring what types should be added based on filenames in a
   * project.
   *
   * @since v4.1.0
   */
  disableFilenameBasedTypeAcquisition?: boolean
}

export type References = {
  /**
   * A normalized path on disk.
   */
  path: string

  /**
   * The path as the user originally wrote it.
   */
  originalPath?: string

  /**
   * True if the output of this reference should be prepended to the
   * output of this project. Only valid for `--outFile` compilations.
   *
   * @deprecated This option will be removed in TypeScript 5.5.
   */
  prepend?: boolean

  /**
   * True if it is intended that this reference form a circularity.
   */
  circular?: boolean
}

/**
 * Type for
 * {@link https://www.typescriptlang.org/docs/handbook/tsconfig-json.html | TypeScript's `tsconfig.json` file}
 * (TypeScript 3.7).
 */
export type TsConfigJson = {
  $schema?: 'https://json.schemastore.org/tsconfig'

  display?: string

  buildOptions?: BuildOptions

  /**
   * Instructs the TypeScript compiler how to compile `.ts` files.
   */
  compilerOptions?: CompilerOptions

  /**
   * Instructs the TypeScript compiler how to watch files.
   *
   * @since v3.8.0
   */
  watchOptions?: WatchOptions

  /**
   * Auto export type (.d.ts) acquisition options for this project.
   *
   * @since v2.1.0
   */
  typeAcquisition?: TypeAcquisition

  /**
   * Enable Compile-on-Save for this project.
   */
  compileOnSave?: boolean

  /**
   * Path to base configuration file to inherit from.
   *
   * @since v2.1.0
   */
  extends?: string | string[]

  /**
   * If no {@linkcode TsConfigJson.files | files} or
   * {@linkcode TsConfigJson.include | include} property is present in a
   * `tsconfig.json`, the compiler defaults to including all files in the
   * containing directory and subdirectories except those specified by
   * {@linkcode TsConfigJson.exclude | exclude}. When a
   * {@linkcode TsConfigJson.files | files} property is specified, only those
   * files and those specified by {@linkcode TsConfigJson.include | include}
   * are included.
   *
   * @since v1.5.0
   */
  files?: string[]

  /**
   * Specifies a list of files to be excluded from compilation. The
   * {@linkcode TsConfigJson.exclude | exclude} property only affects the files
   * included via the {@linkcode TsConfigJson.include | include} property and
   * not the {@linkcode TsConfigJson.files | files} property. Glob patterns
   * require TypeScript version 2.0 or later.
   *
   * @since v2.0.0
   */
  exclude?: string[]

  /**
   * Specifies a list of glob patterns that match files to be included in
   * compilation. If no {@linkcode TsConfigJson.files | files} or
   * {@linkcode TsConfigJson.include | include} property is present in a
   * `tsconfig.json`, the compiler defaults to including all files in the
   * containing directory and subdirectories except those specified by
   * {@linkcode TsConfigJson.exclude | exclude}.
   *
   * @since v2.0.0
   */
  include?: string[]

  /**
   * Referenced projects.
   *
   * @since v3.0.0
   */
  references?: References[]
}

export {}
