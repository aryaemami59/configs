import js from '@eslint/js'
import prettierConfig from 'eslint-config-prettier/flat'
import globalIdentifiers from 'globals'
export type { Linter } from 'eslint'
export { defineConfig } from 'eslint/config'
export type { Config } from 'eslint/config'
export { config, configs, parser, plugin } from 'typescript-eslint'
export type {
  ConfigArray,
  ConfigWithExtends,
  FlatConfig,
  InfiniteDepthConfigWithExtends,
  Config as TSESlintConfig,
} from 'typescript-eslint'
export { js, prettierConfig }
export const { browser, node, nodeBuiltin, vitest } = globalIdentifiers
