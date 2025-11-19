import js from '@eslint/js'
import prettierConfig from 'eslint-config-prettier/flat'
import globalIdentifiers from 'globals'
export { config, configs, parser, plugin } from 'typescript-eslint'
export type {
  Config,
  ConfigArray,
  ConfigWithExtends,
  FlatConfig,
  InfiniteDepthConfigWithExtends,
} from 'typescript-eslint'
export { js, prettierConfig }
export const { browser, node, nodeBuiltin, vitest } = globalIdentifiers
