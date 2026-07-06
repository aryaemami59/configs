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
} from './external.js'
export type {
  Plugin,
  ProjectConfig,
  TestProjectInlineConfiguration,
  UserWorkspaceConfig,
  ViteUserConfig,
} from './external.js'
export { vitestConfig, vitestProject } from './shareableConfigs.js'
export { createVitestConfig, createVitestProject } from './utils.js'
