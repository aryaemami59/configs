import type { UserWorkspaceConfig, ViteUserConfig } from 'vitest/config'
import { plugins } from './plugins.js'

/**
 * Default configuration for {@linkcode vitestProject}.
 *
 * @since 0.0.5
 * @public
 */
export const vitestProjectDefaults = {
  define: {
    'import.meta.vitest': 'undefined',
  },

  plugins,

  test: {
    clearMocks: true,
    globals: true,

    typecheck: {
      enabled: true,
      tsconfig: './tsconfig.json',
    },

    unstubEnvs: true,
    unstubGlobals: true,
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
      extension: ['.ts', '.tsx', '.js', '.jsx', '.mts', '.mjs', '.cts', '.cjs'],
      include: ['src'],
    },

    reporters: process.env.GITHUB_ACTIONS
      ? ([['verbose', { summary: false }], ['github-actions']] as const)
      : ([['verbose']] as const),

    watch: false,
  },
} as const satisfies ViteUserConfig
