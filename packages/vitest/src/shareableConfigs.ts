import type { UserWorkspaceConfig, ViteUserConfig } from 'vitest/config'
import { defineConfig, defineProject } from 'vitest/config'
import { vitestConfigDefaults } from './defaults.js'

/**
 * Shareable **{@link https://vitest.dev | Vitest}**
 * configuration tailored for projects using TypeScript.
 *
 * @example
 * <caption>#### __ECMAScript Modules (ESM) usage inside a file like `vitest.config.mts` or `vitest.config.mjs`__</caption>
 *
 * ```ts
 * import { vitestConfig } from '@aryaemami59/vitest-config'
 *
 * export default vitestConfig
 * ```
 *
 * @example
 * <caption>#### __CommonJS (CJS) usage inside a file like `vitest.config.cts` or `vitest.config.cjs` (using `require`)__</caption>
 *
 * ```ts
 * const { vitestConfig } = require('@aryaemami59/vitest-config')
 *
 * module.exports = vitestConfig
 * ```
 *
 * @example
 * <caption>#### __CommonJS (CJS) usage inside a file like `vitest.config.cts` or `vitest.config.cjs` (using dynamic import)__</caption>
 *
 * ```ts
 * module.exports = (async () =>
 *   (await import('@aryaemami59/vitest-config')).vitestConfig)()
 * ```
 *
 * @example
 * <caption>#### __CommonJS (CJS) usage inside a file like `vitest.config.cts` (using import and export assignment)__</caption>
 *
 * ```ts
 * import vitestConfigModule = require('@aryaemami59/vitest-config')
 * import vitestConfig = vitestConfigModule.vitestConfig
 *
 * export = vitestConfig
 * ```
 *
 * @since 0.0.3
 * @public
 */
export const vitestConfig: ViteUserConfig =
  /* @__PURE__ */ defineConfig(vitestConfigDefaults)

/**
 * Shareable **{@link https://vitest.dev | Vitest}**
 * configuration tailored for projects using TypeScript.
 *
 * @example
 * <caption>#### __ECMAScript Modules (ESM) usage inside a file like `vitest.config.mts` or `vitest.config.mjs`__</caption>
 *
 * ```ts
 * import { vitestProject } from '@aryaemami59/vitest-config'
 *
 * export default vitestProject
 * ```
 *
 * @example
 * <caption>#### __CommonJS (CJS) usage inside a file like `vitest.config.cts` or `vitest.config.cjs` (using `require`)__</caption>
 *
 * ```ts
 * const { vitestProject } = require('@aryaemami59/vitest-config')
 *
 * module.exports = vitestProject
 * ```
 *
 * @example
 * <caption>#### __CommonJS (CJS) usage inside a file like `vitest.config.cts` or `vitest.config.cjs` (using dynamic import)__</caption>
 *
 * ```ts
 * module.exports = (async () =>
 *   (await import('@aryaemami59/vitest-config')).vitestProject)()
 * ```
 *
 * @example
 * <caption>#### __CommonJS (CJS) usage inside a file like `vitest.config.cts` (using import and export assignment)__</caption>
 *
 * ```ts
 * import vitestConfigModule = require('@aryaemami59/vitest-config')
 * import vitestProject = vitestConfigModule.vitestProject
 *
 * export = vitestProject
 * ```
 *
 * @since 0.0.5
 * @public
 */
export const vitestProject: UserWorkspaceConfig =
  /* @__PURE__ */ defineProject(vitestConfigDefaults)
