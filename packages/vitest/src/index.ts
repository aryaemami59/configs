import tsconfigPaths from 'vite-tsconfig-paths'
import type { Plugin, UserWorkspaceConfig, ViteUserConfig } from 'vitest/config'
import { defineConfig, defineProject, mergeConfig } from 'vitest/config'

const plugins: [Plugin] = [
  /* @__PURE__ */ tsconfigPaths({
    projects: ['./tsconfig.json'],
    configNames: ['tsconfig.json'],
  }),
] as const satisfies [Plugin]

/**
 * Default configuration for {@linkcode vitestProject}.
 *
 * @since 0.0.5
 * @public
 */
export const vitestProjectDefaults = {
  plugins,

  test: {
    clearMocks: true,

    typecheck: {
      tsconfig: './tsconfig.json',
    },

    unstubEnvs: true,
    unstubGlobals: true,

    globals: true,
  },

  define: {
    'import.meta.vitest': 'undefined',
  },
} as const satisfies UserWorkspaceConfig

/**
 * Default configuration for {@linkcode vitestConfig}.
 *
 * @since 0.0.5
 * @public
 */
export const vitestConfigDefaults = {
  ...vitestProjectDefaults,

  test: {
    ...vitestProjectDefaults.test,

    coverage: {
      include: ['src'],
      extension: ['.ts', '.tsx', '.js', '.jsx', '.mts', '.mjs', '.cts', '.cjs'],
    },

    reporters: process.env.GITHUB_ACTIONS
      ? ([['github-actions'], ['verbose']] as const)
      : ([['verbose']] as const),

    watch: false,
  },
} as const satisfies ViteUserConfig

/**
 * Shareable **{@linkcode https://vitest.dev | Vitest}**
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
 * Shareable **{@linkcode https://vitest.dev | Vitest}**
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

/**
 * A function that returns {@linkcode vitestConfig}
 * along with optional additional overrides.
 *
 * @param additionalOverrides - Optional additional overrides to apply to the configuration.
 * @returns An augmented version of the default {@linkcode vitestConfig}, incorporating any provided overrides.
 *
 * @example
 * <caption>#### __ECMAScript Modules (ESM) usage inside a file like `vitest.config.mts` or `vitest.config.mjs`__</caption>
 *
 * ```ts
 * import { createVitestConfig } from '@aryaemami59/vitest-config'
 *
 * export default createVitestConfig({
 *   test: {
 *     environment: 'jsdom',
 *     // Other additional overrides
 *   },
 * })
 * ```
 *
 * @example
 * <caption>#### __CommonJS (CJS) usage inside a file like `vitest.config.cts` or `vitest.config.cjs` (using `require`)__</caption>
 *
 * ```ts
 * const { createVitestConfig } = require('@aryaemami59/vitest-config')
 *
 * module.exports = createVitestConfig({
 *   test: {
 *     environment: 'jsdom',
 *     // Other additional overrides
 *   },
 * })
 * ```
 *
 * @example
 * <caption>#### __CommonJS (CJS) usage inside a file like `vitest.config.cts` or `vitest.config.cjs` (using dynamic import)__</caption>
 *
 * ```ts
 * module.exports = (async () =>
 *   (await import('@aryaemami59/vitest-config')).createVitestConfig({
 *     test: {
 *       environment: 'jsdom',
 *       // Other additional overrides
 *     },
 *   }))()
 * ```
 *
 * @example
 * <caption>#### __CommonJS (CJS) usage inside a file like `vitest.config.cts` (using import and export assignment)__</caption>
 *
 * ```ts
 * import vitestConfigModule = require('@aryaemami59/vitest-config')
 * import createVitestConfig = vitestConfigModule.createVitestConfig
 *
 * export = createVitestConfig({
 *   test: {
 *     environment: 'jsdom',
 *     // Other additional overrides
 *   },
 * })
 * ```
 *
 * @since 0.0.3
 * @public
 */
export const createVitestConfig = (
  additionalOverrides: ViteUserConfig = {},
): ViteUserConfig =>
  /* @__PURE__ */ mergeConfig(vitestConfig, additionalOverrides)

/**
 * A function that returns {@linkcode vitestProject}
 * along with optional additional overrides.
 *
 * @param additionalOverrides - Optional additional overrides to apply to the configuration.
 * @returns An augmented version of the default {@linkcode vitestProject}, incorporating any provided overrides.
 *
 * @example
 * <caption>#### __ECMAScript Modules (ESM) usage inside a file like `vitest.config.mts` or `vitest.config.mjs`__</caption>
 *
 * ```ts
 * import { createVitestProject } from '@aryaemami59/vitest-config'
 *
 * export default createVitestProject({
 *   test: {
 *     environment: 'jsdom',
 *     // Other additional overrides
 *   },
 * })
 * ```
 *
 * @example
 * <caption>#### __CommonJS (CJS) usage inside a file like `vitest.config.cts` or `vitest.config.cjs` (using `require`)__</caption>
 *
 * ```ts
 * const { createVitestProject } = require('@aryaemami59/vitest-config')
 *
 * module.exports = createVitestProject({
 *   test: {
 *     environment: 'jsdom',
 *     // Other additional overrides
 *   },
 * })
 * ```
 *
 * @example
 * <caption>#### __CommonJS (CJS) usage inside a file like `vitest.config.cts` or `vitest.config.cjs` (using dynamic import)__</caption>
 *
 * ```ts
 * module.exports = (async () =>
 *   (await import('@aryaemami59/vitest-config')).createVitestProject({
 *     test: {
 *       environment: 'jsdom',
 *       // Other additional overrides
 *     },
 *   }))()
 * ```
 *
 * @example
 * <caption>#### __CommonJS (CJS) usage inside a file like `vitest.config.cts` (using import and export assignment)__</caption>
 *
 * ```ts
 * import vitestConfigModule = require('@aryaemami59/vitest-config')
 * import createVitestProject = vitestConfigModule.createVitestProject
 *
 * export = createVitestProject({
 *   test: {
 *     environment: 'jsdom',
 *     // Other additional overrides
 *   },
 * })
 * ```
 *
 * @since 0.0.5
 * @public
 */
export const createVitestProject = (
  additionalOverrides: UserWorkspaceConfig = {},
): UserWorkspaceConfig =>
  /* @__PURE__ */ mergeConfig(vitestProject, additionalOverrides)
