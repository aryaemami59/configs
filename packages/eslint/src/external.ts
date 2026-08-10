import js from '@eslint/js'
import prettierConfig from 'eslint-config-prettier/flat'
import globals from 'globals'
export type { AST, ESLint, Linter } from 'eslint'
export { defineConfig } from 'eslint/config'
export type { Config, ConfigObject } from 'eslint/config'
export {
  config as tseslintConfig,
  configs as tseslintConfigs,
  parser as tseslintParser,
  plugin as tseslintPlugin,
} from 'typescript-eslint'
export type {
  CompatibleConfig as TSESLintCompatibleConfig,
  CompatibleConfigArray as TSESLintCompatibleConfigArray,
  CompatibleParser as TSESLintCompatibleParser,
  CompatiblePlugin as TSESLintCompatiblePlugin,
  Config as TSESLintConfig,
  ConfigArray as TSESLintConfigArray,
  ConfigWithExtends as TSESLintConfigWithExtends,
  FlatConfig as TSESLintFlatConfig,
  InfiniteDepthConfigWithExtends as TSESLintInfiniteDepthConfigWithExtends,
} from 'typescript-eslint'
export { js, prettierConfig }

/**
 * The global variable definitions provided by the `globals` package, renamed
 * so they can be referenced unambiguously across the package.
 *
 * @since 0.0.8
 * @internal
 */
export const {
  browser: browserGlobals,
  node: nodeGlobals,
  nodeBuiltin: nodeBuiltinGlobals,
  vitest: vitestTestGlobals,
} = globals

/**
 * The type of {@linkcode browserGlobals}.
 *
 * @since 0.0.8
 * @internal
 */
export type GlobalsBrowser = typeof browserGlobals

/**
 * The type of {@linkcode nodeGlobals}.
 *
 * @since 0.0.8
 * @internal
 */
export type GlobalsNode = typeof nodeGlobals

/**
 * The type of {@linkcode nodeBuiltinGlobals}.
 *
 * @since 0.0.8
 * @internal
 */
export type GlobalsNodeBuiltin = typeof nodeBuiltinGlobals

/**
 * The type of {@linkcode vitestTestGlobals}.
 *
 * @since 0.0.8
 * @internal
 */
export type GlobalsVitest = typeof vitestTestGlobals
