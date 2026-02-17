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
  Linter,
  TSESlintConfig,
  TSESlintConfigArray,
  TSESlintConfigWithExtends,
  TSESlintFlatConfig,
  TSESlintInfiniteDepthConfigWithExtends,
} from './external.js'
export { globalIgnores } from './globalIgnores.js'
export { sharedEnvironmentGlobals, vitestGlobals } from './globals.js'
export { flatESLintConfig } from './shareableConfigs.js'
export { createESLintConfig } from './utils.js'
