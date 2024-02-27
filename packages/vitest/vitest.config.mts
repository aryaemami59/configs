import { existsSync } from 'node:fs'
import tsconfigPaths from 'vite-tsconfig-paths'
import type { UserConfig } from 'vitest/config'
import { defineConfig, mergeConfig } from 'vitest/config'

/**
 * Vitest configuration tailored for projects using TypeScript.
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
 */
export const createVitestConfig = (additionalOverrides: UserConfig) =>
  mergeConfig(vitestConfig, defineConfig(additionalOverrides))

export default vitestConfig
