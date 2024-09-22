import { existsSync } from 'node:fs'
import tsconfigPaths from 'vite-tsconfig-paths'
import type { UserConfig } from 'vitest/config'
import { defineConfig, mergeConfig } from 'vitest/config'

/**
 * Vitest configuration tailored for projects using TypeScript.
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
export const vitestConfig: UserConfig = /* @__PURE__ */ defineConfig({
  plugins: [/* @__PURE__ */ tsconfigPaths({ projects: ['./tsconfig.json'] })],
  test: {
    watch: false,
    globals: true,
    testTimeout: 10_000,
    setupFiles: /* @__PURE__ */ existsSync('./vitest.setup.ts')
      ? ['./vitest.setup.ts']
      : [],
  },
  define: { 'import.meta.vitest': 'undefined' },
})

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
  additionalOverrides: UserConfig = {},
): UserConfig => /* @__PURE__ */ mergeConfig(vitestConfig, additionalOverrides)
