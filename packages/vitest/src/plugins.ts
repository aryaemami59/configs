import type { Plugin, PluginOptions } from './external.js'
import { tsconfigPaths } from './external.js'

/**
 * Default configuration for {@linkcode tsconfigPaths}.
 *
 * @since 0.0.5
 * @public
 */
export const tsconfigPathsOptions = {
  configNames: ['tsconfig.json'],
  projects: ['./tsconfig.json'],
} as const satisfies PluginOptions

/**
 * plugins for {@linkcode vitestProjectDefaults}.
 *
 * @since 0.0.5
 * @public
 */
export const plugins = [
  // FIXME: this is a workaround for the `tsconfigPaths` type.
  /* @__PURE__ */ tsconfigPaths(tsconfigPathsOptions) as Plugin,
] as const satisfies [Plugin]
