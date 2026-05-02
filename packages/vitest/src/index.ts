export { vitestConfigDefaults, vitestProjectDefaults } from './defaults.js'
export {
  configDefaults,
  coverageConfigDefaults,
  defaultBrowserPort,
  defaultExclude,
  defaultInclude,
  defineConfig,
  defineProject,
  mergeConfig,
  tsconfigPaths,
} from './external.js'
export type {
  Plugin,
  PluginOptions,
  UserWorkspaceConfig,
  ViteUserConfig,
} from './external.js'
export { plugins, tsconfigPathsOptions } from './plugins.js'
export { vitestConfig, vitestProject } from './shareableConfigs.js'
export { createVitestConfig, createVitestProject } from './utils.js'
