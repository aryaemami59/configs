export { disabledRules } from './disabledRules.js'
export {
  defineConfig,
  js,
  prettierConfig,
  tseslintConfig,
  tseslintConfigs,
  tseslintParser,
  tseslintPlugin,
} from './external.js'
export type {
  Config,
  ESLint,
  Linter,
  TSESLintCompatibleConfig,
  TSESLintCompatibleConfigArray,
  TSESLintCompatibleParser,
  TSESLintCompatiblePlugin,
  TSESLintConfig,
  TSESLintConfigArray,
  TSESLintConfigWithExtends,
  TSESLintFlatConfig,
  TSESLintInfiniteDepthConfigWithExtends,
} from './external.js'
export { globalIgnoresConfig } from './globalIgnores.js'
export { sharedEnvironmentGlobals, vitestGlobals } from './globals.js'
export { flatESLintConfig } from './shareableConfigs.js'
export { createESLintConfig } from './utils.js'
