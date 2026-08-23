import type { StringLiteralUnion } from './typeHelpers.ts'

/**
 * Options that control
 * {@linkcode https://www.typescriptlang.org/docs/handbook/project-references.html#tsc--b-commandline | tsc --build}
 * mode.
 */
export type BuildOptions = {
  /**
   * Have recompiles in projects that use
   * {@linkcode BuildOptions.incremental | incremental} and `watch` mode assume
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
   * Log paths used during the
   * {@linkcode CompilerOptions.moduleResolution | moduleResolution} process.
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

/**
 * The supported values for the
 * {@linkcode https://www.typescriptlang.org/tsconfig/#jsx | jsx} compiler
 * option.
 */
export type JSX =
  'preserve' | 'react-jsx' | 'react-jsxdev' | 'react-native' | 'react'

/**
 * The supported values for the
 * {@linkcode https://www.typescriptlang.org/tsconfig/#module | module}
 * compiler option.
 */
export type Module =
  /**
   * @deprecated Since v6.0.0.
   */
  | 'AMD'
  | 'CommonJS'
  | 'ES2015'
  | 'ES2020'
  | 'ES2022'
  | 'ES6'
  | 'ESNext'
  | 'Node16'
  | 'Node18'
  | 'Node20'
  | 'NodeNext'
  /**
   * @deprecated Since v6.0.0.
   */
  | 'None'
  | 'Preserve'
  /**
   * @deprecated Since v6.0.0.
   */
  | 'System'
  /**
   * @deprecated Since v6.0.0.
   */
  | 'UMD'
// Lowercase alternatives
// /**
//  * @deprecated Since v6.0.0.
//  */
// | 'amd'
// | 'commonjs'
// | 'es2015'
// | 'es2020'
// | 'es2022'
// | 'es6'
// | 'esnext'
// | 'node16'
// | 'node18'
// | 'node20'
// | 'nodenext'
// /**
//  * @deprecated Since v6.0.0.
//  */
// | 'none'
// | 'preserve'
// /**
//  * @deprecated Since v6.0.0.
//  */
// | 'system'
// /**
//  * @deprecated Since v6.0.0.
//  */
// | 'umd'

/**
 * The supported values for the
 * {@linkcode https://www.typescriptlang.org/tsconfig/#newLine | newLine}
 * compiler option.
 */
export type NewLine = 'CRLF' | 'LF'
// Lowercase alternatives
// | 'crlf'
// | 'lf'

/**
 * The supported values for the
 * {@linkcode https://www.typescriptlang.org/tsconfig/#target | target}
 * compiler option.
 */
export type Target =
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
  /**
   * @since 6.0.0
   */
  | 'ES2025'
  | 'ES3'
  /**
   * @deprecated Since v6.0.0.
   */
  | 'ES5'
  | 'ES6'
  | 'ESNext'
// Lowercase alternatives
// | 'es2015'
// | 'es2016'
// | 'es2017'
// | 'es2018'
// | 'es2019'
// | 'es2020'
// | 'es2021'
// | 'es2022'
// | 'es2023'
// | 'es2024'
// /**
//  * @since 6.0.0
//  */
// | 'es2025'
// | 'es3'
// /**
//  * @deprecated Since v6.0.0.
//  */
// | 'es5'
// | 'es6'
// | 'esnext'

/**
 * The library files that can be listed in the
 * {@linkcode https://www.typescriptlang.org/tsconfig/#lib | lib} compiler
 * option.
 */
export type Lib =
  | 'Decorators.Legacy'
  | 'Decorators'
  | 'DOM.AsyncIterable'
  | 'DOM.Iterable'
  | 'DOM'
  | 'ES2015.Collection'
  | 'ES2015.Core'
  | 'ES2015.Generator'
  | 'ES2015.Iterable'
  | 'ES2015.Promise'
  | 'ES2015.Proxy'
  | 'ES2015.Reflect'
  | 'ES2015.Symbol.WellKnown'
  | 'ES2015.Symbol'
  | 'ES2015'
  | 'ES2016.Array.Include'
  | 'ES2016.Intl'
  | 'ES2016'
  | 'ES2017.ArrayBuffer'
  | 'ES2017.Date'
  | 'ES2017.Intl'
  | 'ES2017.Object'
  | 'ES2017.SharedMemory'
  | 'ES2017.String'
  | 'ES2017.TypedArrays'
  | 'ES2017'
  | 'ES2018.AsyncGenerator'
  | 'ES2018.AsyncIterable'
  | 'ES2018.Intl'
  | 'ES2018.Promise'
  | 'ES2018.Regexp'
  | 'ES2018'
  | 'ES2019.Array'
  | 'ES2019.Intl'
  | 'ES2019.Object'
  | 'ES2019.String'
  | 'ES2019.Symbol'
  | 'ES2019'
  | 'ES2020.BigInt'
  | 'ES2020.Date'
  | 'ES2020.Intl'
  | 'ES2020.Number'
  | 'ES2020.Promise'
  | 'ES2020.SharedMemory'
  | 'ES2020.String'
  | 'ES2020.Symbol.WellKnown'
  | 'ES2020'
  | 'ES2021.Intl'
  | 'ES2021.Promise'
  | 'ES2021.String'
  | 'ES2021.WeakRef'
  | 'ES2021'
  | 'ES2022.Array'
  | 'ES2022.Error'
  | 'ES2022.Intl'
  | 'ES2022.Object'
  | 'ES2022.RegExp'
  // | 'ES2022.SharedMemory'
  | 'ES2022.String'
  | 'ES2022'
  | 'ES2023.Array'
  | 'ES2023.Collection'
  | 'ES2023.Intl'
  | 'ES2023'
  | 'ES2024.ArrayBuffer'
  | 'ES2024.Collection'
  | 'ES2024.Object'
  | 'ES2024.Promise'
  | 'ES2024.Regexp'
  | 'ES2024.SharedMemory'
  | 'ES2024.String'
  | 'ES2024'
  /**
   * @since 6.0.0
   */
  | 'ES2025.Collection'
  /**
   * @since 6.0.0
   */
  | 'ES2025.Float16'
  /**
   * @since 6.0.0
   */
  | 'ES2025.Intl'
  /**
   * @since 6.0.0
   */
  | 'ES2025.Iterator'
  /**
   * @since 6.0.0
   */
  | 'ES2025.Promise'
  /**
   * @since 6.0.0
   */
  | 'ES2025.Regexp'
  /**
   * @since 6.0.0
   */
  | 'ES2025'
  | 'ES5'
  | 'ES6'
  | 'ES7'
  | 'ESNext.Array'
  | 'ESNext.AsyncIterable'
  | 'ESNext.BigInt'
  | 'ESNext.Collection'
  | 'ESNext.Date'
  | 'ESNext.Decorators'
  | 'ESNext.Disposable'
  | 'ESNext.Error'
  | 'ESNext.Float16'
  | 'ESNext.Intl'
  | 'ESNext.Iterator'
  | 'ESNext.Object'
  | 'ESNext.Promise'
  | 'ESNext.Regexp'
  | 'ESNext.SharedMemory'
  | 'ESNext.String'
  | 'ESNext.Symbol'
  | 'ESNext.Temporal'
  | 'ESNext.TypedArrays'
  | 'ESNext.WeakRef'
  | 'ESNext'
  | 'ScriptHost'
  | 'WebWorker.AsyncIterable'
  | 'WebWorker.ImportScripts'
  | 'WebWorker.Iterable'
  | 'WebWorker'
// Lowercase alternatives
// | 'decorators.legacy'
// | 'decorators'
// | 'dom.asynciterable'
// | 'dom.iterable'
// | 'dom'
// | 'es2015.collection'
// | 'es2015.core'
// | 'es2015.generator'
// | 'es2015.iterable'
// | 'es2015.promise'
// | 'es2015.proxy'
// | 'es2015.reflect'
// | 'es2015.symbol.wellknown'
// | 'es2015.symbol'
// | 'es2015'
// | 'es2016.array.include'
// | 'es2016.intl'
// | 'es2016'
// | 'es2017.arraybuffer'
// | 'es2017.date'
// | 'es2017.intl'
// | 'es2017.object'
// | 'es2017.sharedmemory'
// | 'es2017.string'
// | 'es2017.typedarrays'
// | 'es2017'
// | 'es2018.asyncgenerator'
// | 'es2018.asynciterable'
// | 'es2018.intl'
// | 'es2018.promise'
// | 'es2018.regexp'
// | 'es2018'
// | 'es2019.array'
// | 'es2019.intl'
// | 'es2019.object'
// | 'es2019.string'
// | 'es2019.symbol'
// | 'es2019'
// | 'es2020.bigint'
// | 'es2020.date'
// | 'es2020.intl'
// | 'es2020.number'
// | 'es2020.promise'
// | 'es2020.sharedmemory'
// | 'es2020.string'
// | 'es2020.symbol.wellknown'
// | 'es2020'
// | 'es2021.intl'
// | 'es2021.promise'
// | 'es2021.string'
// | 'es2021.weakref'
// | 'es2021'
// | 'es2022.array'
// | 'es2022.error'
// | 'es2022.intl'
// | 'es2022.object'
// | 'es2022.regexp'
// // | 'es2022.sharedmemory'
// | 'es2022.string'
// | 'es2022'
// | 'es2023.array'
// | 'es2023.collection'
// | 'es2023.intl'
// | 'es2023'
// | 'es2024.arraybuffer'
// | 'es2024.collection'
// | 'es2024.object'
// | 'es2024.promise'
// | 'es2024.regexp'
// | 'es2024.sharedmemory'
// | 'es2024.string'
// | 'es2024'
// /**
//  * @since 6.0.0
//  */
// | 'es2025.collection'
// /**
//  * @since 6.0.0
//  */
// | 'es2025.float16'
// /**
//  * @since 6.0.0
//  */
// | 'es2025.intl'
// /**
//  * @since 6.0.0
//  */
// | 'es2025.iterator'
// /**
//  * @since 6.0.0
//  */
// | 'es2025.promise'
// /**
//  * @since 6.0.0
//  */
// | 'es2025.regexp'
// /**
//  * @since 6.0.0
//  */
// | 'es2025'
// | 'es5'
// | 'es6'
// | 'es7'
// | 'esnext.array'
// | 'esnext.asynciterable'
// | 'esnext.bigint'
// | 'esnext.collection'
// | 'esnext.date'
// | 'esnext.decorators'
// | 'esnext.disposable'
// | 'esnext.error'
// | 'esnext.float16'
// | 'esnext.intl'
// | 'esnext.iterator'
// | 'esnext.object'
// | 'esnext.promise'
// | 'esnext.regexp'
// | 'esnext.sharedmemory'
// | 'esnext.string'
// | 'esnext.symbol'
// | 'esnext.temporal'
// | 'esnext.typedarrays'
// | 'esnext.weakref'
// | 'esnext'
// | 'scripthost'
// | 'webworker.asynciterable'
// | 'webworker.importscripts'
// | 'webworker.iterable'
// | 'webworker'

/**
 * An entry of the {@linkcode CompilerOptions.plugins | plugins} compiler
 * option, describing a TypeScript language server plugin to load.
 */
export type Plugin = {
  /**
   * Plugin name.
   */
  name: string
}

/**
 * The supported values for the
 * {@linkcode CompilerOptions.importsNotUsedAsValues | importsNotUsedAsValues}
 * compiler option.
 */
export type ImportsNotUsedAsValues = 'error' | 'preserve' | 'remove'

/**
 * The supported values for the
 * {@linkcode CompilerOptions.fallbackPolling | fallbackPolling} compiler
 * option.
 *
 * @see {@linkcode PollingWatchKind} for the {@linkcode WatchOptions | watchOptions} equivalent.
 */
export type FallbackPolling =
  | 'dynamicPriority'
  | 'dynamicPriorityPolling'
  | 'fixedChunkSize'
  | 'fixedInterval'
  | 'fixedPollingInterval'
  | 'priorityInterval'
  | 'priorityPollingInterval'

/**
 * The supported values for the
 * {@linkcode CompilerOptions.watchDirectory | watchDirectory} compiler option.
 *
 * @see {@linkcode WatchDirectoryKind} for the {@linkcode WatchOptions | watchOptions} equivalent.
 */
export type WatchDirectory =
  | 'dynamicPriorityPolling'
  | 'fixedChunkSizePolling'
  | 'fixedPollingInterval'
  | 'useFsEvents'

/**
 * The supported values for the
 * {@linkcode CompilerOptions.watchFile | watchFile} compiler option.
 *
 * @see {@linkcode WatchFileKind} for the {@linkcode WatchOptions | watchOptions} equivalent.
 */
export type WatchFile =
  | 'dynamicPriorityPolling'
  | 'fixedChunkSizePolling'
  | 'fixedPollingInterval'
  | 'priorityPollingInterval'
  | 'useFsEvents'
  | 'useFsEventsOnParentDirectory'

/**
 * The supported values for the
 * {@linkcode CompilerOptions.moduleResolution | moduleResolution} compiler
 * option.
 */
export type ModuleResolution =
  // | 'bundler'
  // /**
  //  * @deprecated Since v6.0.0.
  //  */
  // | 'classic'
  // /**
  //  * @deprecated Since v5.0.0 - Use `'node10'` instead.
  //  */
  // | 'node'
  // /**
  //  * @deprecated Since v6.0.0.
  //  */
  // | 'node10'
  // | 'node16'
  // | 'nodenext'
  // Pascal-cased alternatives
  | 'Bundler'
  /**
   * @deprecated Since v6.0.0.
   */
  | 'Classic'
  /**
   * @deprecated Since v5.0.0 - Use `'node10'` instead.
   */
  | 'Node'
  /**
   * @deprecated Since v6.0.0.
   */
  | 'Node10'
  | 'Node16'
  | 'NodeNext'

/**
 * The supported values for the
 * {@linkcode CompilerOptions.moduleDetection | moduleDetection} compiler
 * option.
 */
export type ModuleDetection = 'auto' | 'force' | 'legacy'

/**
 * The supported values for the
 * {@linkcode CompilerOptions.ignoreDeprecations | ignoreDeprecations} compiler
 * option.
 */
export type IgnoreDeprecations =
  /**
   * @since 5.5.0
   */
  | '5.0'
  /**
   * @since 6.0.0
   */
  | '6.0'

/**
 * The options accepted by the
 * {@linkcode TsConfigJson.compilerOptions | compilerOptions} property of a
 * `tsconfig.json` file.
 */
export type CompilerOptions = {
  /**
   * Suppress errors for file formats that TypeScript does not understand.
   *
   * @default false
   * @since 5.0.0
   */
  allowArbitraryExtensions?: boolean

  /**
   * Allows TypeScript files to import each other with a
   * TypeScript-specific extension like `.ts`, `.mts`, or `.tsx`.
   *
   * @default false
   * @since 5.0.0
   */
  allowImportingTsExtensions?: boolean

  /**
   * Allow JavaScript files to be compiled.
   *
   * @default false
   * @since 1.8.0
   */
  allowJs?: boolean

  /**
   * Allow `default` imports from modules with no `default` export. This does
   * not affect code emit, just typechecking.
   *
   * @default module === "system" || esModuleInterop
   * @since 1.8.0
   */
  allowSyntheticDefaultImports?: boolean

  /**
   * Allow accessing UMD globals from modules.
   *
   * @default false
   * @since 3.5.0
   */
  allowUmdGlobalAccess?: boolean

  /**
   * Do not report errors on unreachable code.
   *
   * @default false
   * @since 1.8.0
   */
  allowUnreachableCode?: boolean

  /**
   * Do not report errors on unused labels.
   *
   * @default false
   * @since 1.8.0
   */
  allowUnusedLabels?: boolean

  /**
   * Parse in strict mode and emit `"use strict"` for each source file.
   *
   * @default false
   * @since 2.1.0
   */
  alwaysStrict?: boolean

  /**
   * Have recompiles in `--incremental` and `--watch` assume that changes
   * within a file will only affect files directly depending on it.
   *
   * @default false
   * @since 3.8.0
   */
  assumeChangesOnlyAffectDirectDependencies?: boolean

  /**
   * Base directory to resolve non-relative module names.
   *
   * @deprecated Since v6.0.0.
   * @since 2.0.0
   */
  baseUrl?: string

  /**
   * The character set of the input files.
   *
   * @default "utf8"
   * @deprecated This option will be removed in TypeScript v5.5.
   * @since 1.0.0
   */
  charset?: string

  /**
   * Report errors in `.js` files.
   *
   * @default false
   * @since 2.3.0
   */
  checkJs?: boolean

  /**
   * Enables building for project references.
   *
   * @default true
   * @since 3.0.0
   */
  composite?: boolean

  /**
   * List of additional conditions that should succeed when TypeScript
   * resolves from `package.json`.
   *
   * @since 5.0.0
   */
  customConditions?: string[]

  /**
   * Generates corresponding `d.ts` files.
   *
   * @default false
   * @since 1.0.0
   */
  declaration?: boolean

  /**
   * Specify output directory for generated declaration files.
   *
   * @since 2.0.0
   */
  declarationDir?: string

  /**
   * Generates a sourcemap for each corresponding `.d.ts` file.
   *
   * @default false
   * @since 2.3.0
   */
  declarationMap?: boolean

  /**
   * Show diagnostic information.
   *
   * @default false
   * @since 1.0.0
   */
  diagnostics?: boolean

  /**
   * Reduce the number of projects loaded automatically by TypeScript.
   *
   * @default false
   * @since 4.0.0
   */
  disableReferencedProjectLoad?: boolean

  /**
   * Disable size limit for JavaScript project.
   *
   * @default false
   * @since 2.0.0
   */
  disableSizeLimit?: boolean

  /**
   * Opt a project out of multi-project reference checking when editing.
   *
   * @default false
   * @since 3.8.0
   */
  disableSolutionSearching?: boolean

  /**
   * Disable preferring source files instead of declaration files when
   * referencing composite projects.
   *
   * @default true if composite, false otherwise
   * @since 3.7.0
   */
  disableSourceOfProjectReferenceRedirect?: boolean

  /**
   * Provide full support for iterables in `for-of`, spread, and
   * destructuring when targeting `ES5` or `ES3`.
   *
   * @default false
   * @deprecated Since v6.0.0.
   * @since 2.3.0
   */
  downlevelIteration?: boolean

  /**
   * Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files.
   *
   * @default false
   * @since 1.0.0
   */
  emitBOM?: boolean

  /**
   * Only emit `.d.ts` declaration files.
   *
   * @default false
   * @since 2.8.0
   */
  emitDeclarationOnly?: boolean

  /**
   * Emit design-type metadata for decorated declarations in source.
   *
   * @default false
   * @since 1.5.0
   */
  emitDecoratorMetadata?: boolean

  /**
   * Do not allow runtime constructs that are not part of ECMAScript.
   *
   * @default false
   * @since 5.8.0
   */
  erasableSyntaxOnly?: boolean

  /**
   * Emit `__importStar` and `__importDefault` helpers for runtime Babel
   * ecosystem compatibility and enable `--allowSyntheticDefaultImports` for
   * typesystem compatibility.
   *
   * @default false
   * @since 2.7.0
   */
  esModuleInterop?: boolean

  /**
   * Differentiate between `undefined` and not present when type checking.
   *
   * @default false
   * @since 4.4.0
   */
  exactOptionalPropertyTypes?: boolean

  /**
   * Enables experimental support for ES7 decorators.
   *
   * @default false
   * @since 1.5.0
   */
  experimentalDecorators?: boolean

  /**
   * Print names of files which TypeScript sees as a part of your project and
   * the reason they are part of the compilation.
   *
   * @default false
   * @since 4.2.0
   */
  explainFiles?: boolean

  /**
   * Output more detailed compiler performance information after building.
   *
   * @default false
   * @since 2.0.0
   */
  extendedDiagnostics?: boolean

  /**
   * Specify the polling strategy to use when the system runs out of or doesn't
   * support native file watchers.
   *
   * @deprecated Use {@linkcode WatchOptions.fallbackPolling | watchOptions.fallbackPolling} instead.
   * @since 3.8.0
   */
  fallbackPolling?: FallbackPolling

  /**
   * Disallow inconsistently-cased references to the same file.
   *
   * @default true
   * @since 1.8.0
   */
  forceConsistentCasingInFileNames?: boolean

  /**
   * Emit a v8 CPU profile of the compiler run for debugging.
   *
   * @default "profile.cpuprofile"
   * @since 3.7.0
   */
  generateCpuProfile?: StringLiteralUnion<'profile.cpuprofile'>

  /**
   * Generates an event trace and a list of types.
   *
   * @since 4.1.0
   */
  generateTrace?: boolean

  /**
   * Suppress deprecation warnings.
   *
   * @since 5.5.0
   */
  ignoreDeprecations?: IgnoreDeprecations

  /**
   * Import emit helpers (e.g. `__extends`, `__rest`, etc..) from `tslib`.
   *
   * @default false
   * @since 2.1.0
   */
  importHelpers?: boolean

  /**
   * Specify emit/checking behavior for imports that are only used for types.
   * This flag controls how `import` works, there are 3 different options:
   * - **`"remove"`**: The default behavior of dropping `import` statements which only reference types.
   * - **`"preserve"`**: Preserves all `import` statements whose values or types are never used. This can cause imports/side-effects to be preserved.
   * - **`"error"`**: This preserves all imports (the same as the preserve option), but will error when a value import is only used as a type. This might be useful if you want to ensure no values are being accidentally imported, but still make side-effect imports explicit.
   *
   * This flag works because you can use `import type` to explicitly create an
   * `import` statement which should never be emitted into JavaScript.
   *
   * @default "remove"
   * @deprecated Use {@linkcode CompilerOptions.verbatimModuleSyntax | verbatimModuleSyntax} instead.
   * @see {@link https://www.typescriptlang.org/tsconfig#importsNotUsedAsValues | **TSConfig Reference**}
   * @since 3.8.0
   */
  importsNotUsedAsValues?: ImportsNotUsedAsValues

  /**
   * Enable incremental compilation.
   *
   * @default composite === true
   * @since 3.4.0
   */
  incremental?: boolean

  /**
   * Emit a single file with source maps instead of having a separate file.
   *
   * @default false
   * @since 1.5.0
   */
  inlineSourceMap?: boolean

  /**
   * Emit the source alongside the sourcemaps within a single file. Requires
   * `--inlineSourceMap` to be set.
   *
   * @default false
   * @since 1.5.0
   */
  inlineSources?: boolean

  /**
   * Require sufficient annotation on exports so other tools can trivially
   * generate declaration files.
   *
   * @default false
   * @since 5.5.0
   */
  isolatedDeclarations?: boolean

  /**
   * Unconditionally emit imports for unresolved files.
   *
   * @default false
   * @since 1.5.0
   */
  isolatedModules?: boolean

  /**
   * Specify what JSX code is generated.
   *
   * @default "preserve"
   * @since 1.6.0
   */
  jsx?: JSX

  /**
   * Specify the JSX factory function to use when targeting React JSX emit,
   * e.g. `"React.createElement"` or `"h"`.
   *
   * @default "React.createElement"
   * @since 2.2.0
   */
  jsxFactory?: StringLiteralUnion<'React.createElement'>

  /**
   * Specify the JSX Fragment reference used for fragments when targeting React
   * JSX emit e.g. `"React.Fragment"` or `"Fragment"`.
   *
   * @default "React.Fragment"
   * @since 4.0.0
   */
  jsxFragmentFactory?: StringLiteralUnion<'React.Fragment'>

  /**
   * Specify module specifier used to import the JSX factory functions when
   * using `jsx: react-jsx*`.
   *
   * @default "react"
   * @since 4.1.0
   */
  jsxImportSource?: StringLiteralUnion<'preact' | 'react' | 'vue'>

  /**
   * Resolve `keyof` to string valued
   * property names only (no numbers or symbols).
   *
   * @default false
   * @deprecated This option will be removed in TypeScript v5.5.
   * @since 2.9.0
   */
  keyofStringsOnly?: boolean

  /**
   * List of library files to be included in the compilation.
   *
   * @since 2.0.0
   */
  lib?: (Lib | Lowercase<Lib>)[]

  /**
   * Enable lib replacement.
   * Prior to v6.0.0, this defaulted to **`true`**. Since v6.0.0, it defaults
   * to **`false`**.
   *
   * @default false
   * @since 5.8.0
   */
  libReplacement?: boolean

  /**
   * Enable to list all emitted files.
   *
   * @default false
   * @since 2.0.0
   */
  listEmittedFiles?: boolean

  /**
   * Print names of files part of the compilation.
   *
   * @default false
   * @since 1.5.0
   */
  listFiles?: boolean

  /**
   * Print names of files that are part of the compilation and
   * then stop processing.
   *
   * @default false
   */
  listFilesOnly?: boolean

  /**
   * Specifies the location where debugger should locate map files instead of
   * generated locations.
   *
   * @since 1.0.0
   */
  mapRoot?: string

  /**
   * The maximum dependency depth to search under `node_modules` and load
   * JavaScript files. Only applicable with `--allowJs`.
   *
   * @default 0
   * @since 2.0.0
   */
  maxNodeModuleJsDepth?: number

  /**
   * Specify module code generation:
   * - **`"AMD"`**
   * - **`"CommonJS"`**
   * - **`"ES2015"`**
   * - **`"ES6"`**
   * - **`"ESNext"`**
   * - **`"None"`**
   * - **`"System"`**
   * - **`"UMD"`**
   *
   * Only `"AMD"` and `"System"` can be used in conjunction with `--outFile`.
   * `"ES6"` and `"ES2015"` values may be used when targeting `"ES5"` or lower.
   * Since v6.0.0, this defaults to **`"esnext"`**. Prior to v6.0.0, it
   * defaulted to **`["ES3", "ES5"].includes(target) ? "CommonJS" : "ES6"`**.
   *
   * @default "esnext"
   * @since 1.0.0
   */
  module?: Lowercase<Module> | Module

  /**
   * This setting controls how TypeScript determines whether a file is a
   * {@link https://www.typescriptlang.org/docs/handbook/modules/theory.html#scripts-and-modules-in-javascript | **script or a module**}.
   * There are three choices:
   * - **`"auto"` (default)** - TypeScript will not only look for import and export statements, but it will also check whether the `"type"` field in a `package.json` is set to `"module"` when running with {@linkcode CompilerOptions.module | module}: `nodenext` or `node16`, and check whether the current file is a JSX file when running under {@linkcode CompilerOptions.jsx | jsx}: `react-jsx`.
   * - **`"legacy"`** - The same behavior as 4.6 and prior, usings import and export statements to determine whether a file is a module.
   * - **`"force"`** - Ensures that every non-declaration file is treated as a module.
   *
   * @default "auto"
   * @see {@link https://www.typescriptlang.org/tsconfig/#moduleDetection | **TSConfig Reference**}
   * @since 4.7.0
   */
  moduleDetection?: ModuleDetection

  /**
   * Specifies the module resolution strategy:
   * - **`"Bundler"`** - resolution as bundlers perform it.
   * - **`"Classic"`** - TypeScript pre 1.6 resolution.
   * - **`"Node10"`** (previously **`"Node"`**) - Node.js CommonJS resolution.
   * - **`"Node16"`** and **`"NodeNext"`** - Node.js resolution with ECMAScript module support.
   *
   * @default ["AMD", "System", "ES6"].includes(module) ? "classic" : "node"
   * @since 1.6.0
   */
  moduleResolution?: Lowercase<ModuleResolution> | ModuleResolution

  /**
   * List of file name suffixes to search when resolving a module.
   *
   * @since 4.7.0
   */
  moduleSuffixes?: string[]

  /**
   * Specifies the end of line sequence to be used when emitting files:
   * - **`"crlf"` (Windows)**
   * - **`"lf"` (Unix)**
   *
   * @default "lf"
   * @since 1.5.0
   */
  newLine?: Lowercase<NewLine> | NewLine

  /**
   * Disable full type checking
   * (only critical parse and emit errors will be reported).
   *
   * @default false
   * @since 5.6.0
   */
  noCheck?: boolean

  /**
   * Do not emit output.
   *
   * @default false
   * @since 1.5.0
   */
  noEmit?: boolean

  /**
   * Do not generate custom helper functions like `__extends` in compiled
   * output.
   *
   * @default false
   * @since 1.5.0
   */
  noEmitHelpers?: boolean

  /**
   * Do not emit outputs if any type checking errors were reported.
   *
   * @default false
   * @since 1.4.0
   */
  noEmitOnError?: boolean

  /**
   * Do not truncate error messages.
   *
   * @default false
   * @since 1.0.0
   */
  noErrorTruncation?: boolean

  /**
   * Report errors for fallthrough cases in `switch` statement.
   *
   * @default false
   * @since 1.8.0
   */
  noFallthroughCasesInSwitch?: boolean

  /**
   * Warn on expressions and declarations with an implied `any` type.
   *
   * @default false
   * @since 1.0.0
   */
  noImplicitAny?: boolean

  /**
   * Ensure overriding members in derived classes are marked with an `override`
   * modifier.
   *
   * @default false
   * @since 4.3.0
   */
  noImplicitOverride?: boolean

  /**
   * Report error when not all code paths in function return a value.
   *
   * @default false
   * @since 1.8.0
   */
  noImplicitReturns?: boolean

  /**
   * Raise error on `this` expressions with an implied `any` type.
   *
   * @default false
   * @since 2.0.0
   */
  noImplicitThis?: boolean

  /**
   * Do not emit `"use strict"` directives in module output.
   *
   * @default false
   * @deprecated This option will be removed in TypeScript v5.5.
   * @since 1.8.0
   */
  noImplicitUseStrict?: boolean

  /**
   * Do not include the default library file (`lib.d.ts`).
   *
   * @default false
   * @since 1.0.0
   */
  noLib?: boolean

  /**
   * Enforces using indexed accessors for keys declared using an indexed type.
   *
   * @default false
   * @since 4.2.0
   */
  noPropertyAccessFromIndexSignature?: boolean

  /**
   * Do not add triple-slash references or module import targets to the list of
   * compiled files.
   *
   * @default false
   * @since 1.0.0
   */
  noResolve?: boolean

  /**
   * Disable strict checking of generic signatures in function types.
   *
   * @default false
   * @deprecated This option will be removed in TypeScript v5.5.
   * @since 2.5.0
   */
  noStrictGenericChecks?: boolean

  /**
   * Add `undefined` to a type when accessed using an index.
   *
   * @default false
   * @since 4.1.0
   */
  noUncheckedIndexedAccess?: boolean

  /**
   * Report error if failed to find a source file for a side effect import.
   * Prior to v6.0.0, this defaulted to **`false`**. Since v6.0.0, it defaults
   * to **`true`**.
   *
   * @default true
   * @since 5.6.0
   */
  noUncheckedSideEffectImports?: boolean

  /**
   * Report errors on unused locals.
   *
   * @default false
   * @since 2.0.0
   */
  noUnusedLocals?: boolean

  /**
   * Report errors on unused parameters.
   *
   * @default false
   * @since 2.0.0
   */
  noUnusedParameters?: boolean

  /**
   * It computes the final file location in a way that is not predictable or
   * consistent.
   *
   * @deprecated Use {@linkcode CompilerOptions.outFile | outFile} instead.
   * @since 1.0.0
   */
  out?: string

  /**
   * Redirect output structure to the directory.
   *
   * @since 1.0.0
   */
  outDir?: string

  /**
   * Concatenate and emit output to single file.
   *
   * @deprecated Since v6.0.0.
   * @since 1.6.0
   */
  outFile?: string

  /**
   * Specify path mapping to be computed relative to
   * {@linkcode CompilerOptions.baseUrl | baseUrl} option.
   *
   * @since 2.0.0
   */
  paths?: Record<string, string[]>

  /**
   * List of TypeScript language server plugins to load.
   *
   * @since 2.2.0
   */
  plugins?: Plugin[]

  /**
   * Do not erase `const enum` declarations in generated code.
   *
   * @default false
   * @since 1.4.0
   */
  preserveConstEnums?: boolean

  /**
   * Do not resolve symlinks to their real path; treat a symlinked file like a
   * real one.
   *
   * @default false
   * @since 2.5.0
   */
  preserveSymlinks?: boolean

  /**
   * Preserve unused imported values in the JavaScript output that
   * would otherwise be removed.
   *
   * @default true
   * @deprecated Use {@linkcode CompilerOptions.verbatimModuleSyntax | verbatimModuleSyntax} instead.
   * @since 4.5.0
   */
  preserveValueImports?: boolean

  /**
   * Keep outdated console output in watch mode instead of clearing the screen.
   *
   * @default false
   * @since 2.8.0
   */
  preserveWatchOutput?: boolean

  /**
   * Stylize errors and messages using color and context (experimental).
   *
   * @default true // Unless piping to another program or redirecting output to a file.
   * @since 1.8.0
   */
  pretty?: boolean

  /**
   * Specifies the object invoked for `createElement` and `__spread` when
   * targeting `"react"` JSX emit.
   *
   * @default "React"
   * @since 1.8.0
   */
  reactNamespace?: StringLiteralUnion<'React'>

  /**
   * Do not emit comments to output.
   *
   * @default false
   * @since 1.0.0
   */
  removeComments?: boolean

  /**
   * Include modules imported with `.json` extension.
   *
   * @default false
   * @since 2.9.0
   */
  resolveJsonModule?: boolean

  /**
   * Forces TypeScript to consult the exports field of `package.json` files
   * if it ever reads from a package in `node_modules`.
   *
   * @default false
   * @since 5.0.0
   */
  resolvePackageJsonExports?: boolean

  /**
   * Forces TypeScript to consult the imports field of `package.json` files
   * when performing a lookup that starts with `#` from a file whose
   * ancestor directory contains a `package.json`.
   *
   * @default false
   * @since 5.0.0
   */
  resolvePackageJsonImports?: boolean

  /**
   * Rewrite `.ts`, `.tsx`, `.mts`, and `.cts` file extensions in
   * relative import paths to their JavaScript equivalent in output files.
   *
   * @default false
   * @since 5.7.0
   */
  rewriteRelativeImportExtensions?: boolean

  /**
   * Specifies the root directory of input files. Use to control the output
   * directory structure with `--outDir`. Defaults to **`"."`** since v6.0.0.
   *
   * @default "."
   * @since 1.5.0
   */
  rootDir?: string

  /**
   * Specify list of root directories to be used when resolving modules.
   *
   * @since 2.0.0
   */
  rootDirs?: string[]

  /**
   * Skip type checking of default library declaration files.
   *
   * @deprecated Use {@linkcode CompilerOptions.skipLibCheck | skipLibCheck} instead.
   * @since 1.6.0
   */
  skipDefaultLibCheck?: boolean

  /**
   * Skip type checking of declaration files.
   *
   * @default false
   * @since 2.0.0
   */
  skipLibCheck?: boolean

  /**
   * Generates corresponding `.map` file.
   *
   * @default false
   * @since 1.0.0
   */
  sourceMap?: boolean

  /**
   * Specifies the location where debugger should locate TypeScript files
   * instead of source locations.
   *
   * @since 1.0.0
   */
  sourceRoot?: string

  /**
   * Controls whether emitted types and properties use a more stable ordering.
   * TypeScript currently assigns internal type IDs in encounter order and uses
   * them to sort union members. A similar process applies to properties. This
   * can lead to declaration output changing based on declaration order in ways
   * that may be surprising.
   *
   * @default false
   * @since 6.0.0
   */
  stableTypeOrdering?: boolean

  /**
   * Enable all strict type checking options.
   * Prior to v6.0.0, this defaulted to **`false`**. Since v6.0.0, it defaults
   * to **`true`**.
   *
   * @default true
   * @since 2.3.0
   */
  strict?: boolean

  /**
   * Enable stricter checking of the `bind`, `call`, and `apply` methods on
   * functions.
   *
   * @default false
   * @since 3.2.0
   */
  strictBindCallApply?: boolean

  /**
   * Built-in iterators are instantiated with a `TReturn` type of `undefined`
   * instead of `any`.
   *
   * @default false
   * @since 5.6.0
   */
  strictBuiltinIteratorReturn?: boolean

  /**
   * Disable bivariant parameter checking for function types.
   *
   * @default false
   * @since 2.6.0
   */
  strictFunctionTypes?: boolean

  /**
   * Enable strict null checks.
   *
   * @default false
   * @since 2.0.0
   */
  strictNullChecks?: boolean

  /**
   * Ensure non-undefined class properties are initialized in the constructor.
   *
   * @default false
   * @since 2.7.0
   */
  strictPropertyInitialization?: boolean

  /**
   * Do not emit declarations for code that has an `@internal` annotation.
   *
   * @since 1.5.0
   */
  stripInternal?: boolean

  /**
   * Suppress excess property checks for object literals.
   *
   * @default false
   * @deprecated This option will be removed in TypeScript v5.5.
   * @since 1.6.0
   */
  suppressExcessPropertyErrors?: boolean

  /**
   * Suppress {@linkcode CompilerOptions.noImplicitAny | noImplicitAny}
   * errors for indexing objects lacking index signatures.
   *
   * @default false
   * @deprecated This option will be removed in TypeScript v5.5.
   * @since 1.4.0
   */
  suppressImplicitAnyIndexErrors?: boolean

  /**
   * Specify ECMAScript target version.
   * Before v6.0.0, this defaulted to **`"es3"`**. Since v6.0.0, it defaults to
   * the current year's ECMAScript version.
   *
   * @default "es2025"
   * @since 1.0.0
   */
  target?: Lowercase<Target> | Target

  /**
   * Enable tracing of the name resolution process.
   *
   * @default false
   * @since 2.0.0
   */
  traceResolution?: boolean

  /**
   * Specify file to store incremental compilation information.
   *
   * @default ".tsbuildinfo"
   * @since 3.4.0
   */
  tsBuildInfoFile?: StringLiteralUnion<'.tsbuildinfo'>

  /**
   * Specify list of directories for type definition files to be included.
   *
   * @since 2.0.0
   */
  typeRoots?: string[]

  /**
   * Type declaration files to be included in compilation.
   * Since v6.0.0, this defaults to **`[]`**. To achieve the previous default
   * behavior, use **`["*"]`**.
   *
   * @default []
   * @since 2.0.0
   */
  types?: StringLiteralUnion<'*' | 'node'>[]

  /**
   * Emit ECMAScript standard class fields.
   *
   * @default false
   * @since 3.7.0
   */
  useDefineForClassFields?: boolean

  /**
   * Default `catch` clause variables as `unknown` instead of `any`.
   *
   * @default false
   * @since 4.4.0
   */
  useUnknownInCatchVariables?: boolean

  /**
   * Anything that uses the type modifier is dropped entirely.
   *
   * @default false
   * @since 5.0.0
   */
  verbatimModuleSyntax?: boolean

  /**
   * Watch input files.
   *
   * @default false
   * @deprecated Use {@linkcode TsConfigJson.watchOptions | watchOptions} instead.
   */
  watch?: boolean

  /**
   * Specify the strategy for watching directories under systems that lack
   * recursive file-watching functionality.
   *
   * @default "useFsEvents"
   * @deprecated Use {@linkcode WatchOptions.watchDirectory | watchOptions.watchDirectory} instead.
   * @since 3.8.0
   */
  watchDirectory?: WatchDirectory

  /**
   * Specify the strategy for watching individual files.
   *
   * @default "useFsEvents"
   * @deprecated Use {@linkcode WatchOptions.watchFile | watchOptions.watchFile} instead.
   * @since 3.8.0
   */
  watchFile?: WatchFile
}

/**
 * The supported values for the
 * {@linkcode https://www.typescriptlang.org/tsconfig/#watch-watchFile | watchOptions.watchFile}
 * option.
 */
export type WatchFileKind =
  | 'DynamicPriorityPolling'
  | 'FixedChunkSizePolling'
  | 'FixedPollingInterval'
  | 'PriorityPollingInterval'
  | 'UseFsEvents'
  | 'UseFsEventsOnParentDirectory'

/**
 * The supported values for the
 * {@linkcode https://www.typescriptlang.org/tsconfig/#watch-watchDirectory | watchOptions.watchDirectory}
 * option.
 */
export type WatchDirectoryKind =
  | 'DynamicPriorityPolling'
  | 'FixedChunkSizePolling'
  | 'FixedPollingInterval'
  | 'UseFsEvents'

/**
 * The supported values for the
 * {@linkcode https://www.typescriptlang.org/tsconfig/#watch-fallbackPolling | watchOptions.fallbackPolling}
 * option.
 */
export type PollingWatchKind =
  'DynamicPriority' | 'FixedChunkSize' | 'FixedInterval' | 'PriorityInterval'

/**
 * Options that tell the TypeScript compiler how to watch files, corresponding
 * to the
 * {@linkcode https://www.typescriptlang.org/docs/handbook/tsconfig-json.html | watchOptions}
 * property of a
 * {@linkcode https://www.typescriptlang.org/docs/handbook/tsconfig-json.html | tsconfig.json}
 * file.
 */
export type WatchOptions = {
  /**
   * Specifies a list of directories to exclude from watch.
   *
   * @since 4.2.0
   */
  excludeDirectories?: string[]

  /**
   * Specifies a list of files to exclude from watch.
   *
   * @since 4.2.0
   */
  excludeFiles?: string[]

  /**
   * Specify the polling strategy to use when the system runs out of or doesn't
   * support native file watchers.
   *
   * @since 3.8.0
   */
  fallbackPolling?: Lowercase<PollingWatchKind> | PollingWatchKind

  /**
   * Enable synchronous updates on directory watchers for platforms that don't
   * support recursive watching natively.
   *
   * @since 3.8.0
   */
  synchronousWatchDirectory?: boolean

  /**
   * Specify the strategy for watching directories under systems that lack
   * recursive file-watching functionality.
   *
   * @default "UseFsEvents"
   * @since 3.8.0
   */
  watchDirectory?: Lowercase<WatchDirectoryKind> | WatchDirectoryKind

  /**
   * Specify the strategy for watching individual files.
   *
   * @default "UseFsEvents"
   * @since 3.8.0
   */
  watchFile?: Lowercase<WatchFileKind> | WatchFileKind
}

/**
 * Auto type (`.d.ts`) acquisition options for this project.
 */
export type TypeAcquisition = {
  /**
   * Disable inferring what types should be added based on filenames in a
   * project.
   *
   * @since 4.1.0
   */
  disableFilenameBasedTypeAcquisition?: boolean

  /**
   * Enable auto type acquisition.
   *
   * @default false
   */
  enable?: boolean

  /**
   * Specifies a list of type declarations to be excluded from auto type
   * acquisition. For example, `["jquery", "lodash"]`.
   */
  exclude?: string[]

  /**
   * Specifies a list of type declarations to be included in auto type
   * acquisition. For example, `["jquery", "lodash"]`.
   */
  include?: string[]
}

/**
 * An entry of the {@linkcode TsConfigJson.references | references} property,
 * describing a single referenced project.
 */
export type References = {
  /**
   * True if it is intended that this reference form a circularity.
   */
  circular?: boolean

  /**
   * The path as the user originally wrote it.
   */
  originalPath?: string

  /**
   * A normalized path on disk.
   */
  path: string

  /**
   * True if the output of this reference should be prepended to the
   * output of this project. Only valid for `--outFile` compilations.
   *
   * @deprecated This option will be removed in TypeScript v5.5.
   */
  prepend?: boolean
}

/**
 * Type for
 * {@link https://www.typescriptlang.org/docs/handbook/tsconfig-json.html | TypeScript's `tsconfig.json` file}
 * (TypeScript 3.7).
 */
export type TsConfigJson = {
  /**
   * URL of the JSON schema used to validate this file.
   */
  $schema?: StringLiteralUnion<'https://www.schemastore.org/tsconfig'>

  /**
   * Options that control `tsc --build` mode.
   */
  buildOptions?: BuildOptions

  /**
   * Enable Compile-on-Save for this project.
   */
  compileOnSave?: boolean

  /**
   * Instructs the TypeScript compiler how to compile `.ts` files.
   */
  compilerOptions?: CompilerOptions

  /**
   * Human-readable name shown for this configuration when it is used as a
   * base config.
   */
  display?: string

  /**
   * Specifies a list of files to be excluded from compilation. The
   * {@linkcode TsConfigJson.exclude | exclude} property only affects the files
   * included via the {@linkcode TsConfigJson.include | include} property and
   * not the {@linkcode TsConfigJson.files | files} property. Glob patterns
   * require TypeScript version 2.0 or later.
   *
   * @since 2.0.0
   */
  exclude?: string[]

  /**
   * Path to base configuration file to inherit from.
   *
   * @since 2.1.0
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
   * @since 1.5.0
   */
  files?: string[]

  /**
   * Specifies a list of glob patterns that match files to be included in
   * compilation. If no {@linkcode TsConfigJson.files | files} or
   * {@linkcode TsConfigJson.include | include} property is present in a
   * `tsconfig.json`, the compiler defaults to including all files in the
   * containing directory and subdirectories except those specified by
   * {@linkcode TsConfigJson.exclude | exclude}.
   *
   * @since 2.0.0
   */
  include?: string[]

  /**
   * Referenced projects.
   *
   * @since 3.0.0
   */
  references?: References[]

  /**
   * Auto type (`.d.ts`) acquisition options for this project.
   *
   * @since 2.1.0
   */
  typeAcquisition?: TypeAcquisition

  /**
   * Instructs the TypeScript compiler how to watch files.
   *
   * @since 3.8.0
   */
  watchOptions?: WatchOptions
}

export {}
