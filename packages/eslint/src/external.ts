import js from '@eslint/js'
import prettierConfig from 'eslint-config-prettier/flat'
import globals from 'globals'
export type { ESLint, Linter } from 'eslint'
export { defineConfig } from 'eslint/config'
export type { Config } from 'eslint/config'
export {
  config as tseslintConfig,
  configs as tseslintConfigs,
  parser as tseslintParser,
  plugin as tseslintPlugin,
} from 'typescript-eslint'
export type {
  Config as TSESLintConfig,
  ConfigArray as TSESLintConfigArray,
  ConfigWithExtends as TSESLintConfigWithExtends,
  FlatConfig as TSESLintFlatConfig,
  InfiniteDepthConfigWithExtends as TSESLintInfiniteDepthConfigWithExtends,
} from 'typescript-eslint'
export { js, prettierConfig }
export const {
  browser: browserGlobals,
  node: nodeGlobals,
  nodeBuiltin: nodeBuiltinGlobals,
  vitest: vitestTestGlobals,
} = globals
