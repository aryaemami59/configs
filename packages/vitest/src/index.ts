import { existsSync } from 'node:fs'
import tsconfigPaths from 'vite-tsconfig-paths'
import type { UserConfig } from 'vitest/config'
import { defineConfig, mergeConfig } from 'vitest/config'

/**
 * Vitest configuration tailored for projects using TypeScript.
 *
 * @example
 * <caption>__ECMAScript Modules (ESM) usage inside a file like `vitest.config.mts` or `vitest.config.mjs`__</caption>
 *
 * ```ts
 * import { vitestConfig } from '@aryaemami59/vitest-config'
 *
 * export default vitestConfig
 * ```
 *
 * @example
 * <caption>__CommonJS (CJS) usage inside a file like `vitest.config.cts` or `vitest.config.cjs`__</caption>
 *
 * ```ts
 * module.exports = (async () =>
 *   (await import('@aryaemami59/vitest-config')).vitestConfig)()
 * ```
 */
export const vitestConfig = defineConfig({
  plugins: [tsconfigPaths({ projects: ['./tsconfig.json'] })],
  test: {
    watch: false,
    globals: true,
    testTimeout: 10_000,
    setupFiles: existsSync('./vitest.setup.ts') ? ['./vitest.setup.ts'] : [],
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
 * <caption>__ECMAScript Modules (ESM) usage inside a file like `vitest.config.mts` or `vitest.config.mjs`__</caption>
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
 * <caption>__CommonJS (CJS) usage inside a file like `vitest.config.cts` or `vitest.config.cjs`__</caption>
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
 */
export const createVitestConfig = (additionalOverrides: UserConfig) =>
  mergeConfig(vitestConfig, defineConfig(additionalOverrides))

export default vitestConfig
