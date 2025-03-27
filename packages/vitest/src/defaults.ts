import type { UserWorkspaceConfig, ViteUserConfig } from 'vitest/config'
import { plugins } from './plugins.js'

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
