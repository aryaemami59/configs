import type { UserWorkspaceConfig, ViteUserConfig } from 'vitest/config'
import { plugins } from './plugins.js'

/**
 * Default configuration for {@linkcode vitestProject}.
 *
 * @since 0.0.5
 * @public
 */
export const vitestProjectDefaults = {
  /**
   * @default { 'import.meta.vitest': 'undefined' }
   */
  define: {
    /**
     * @default 'undefined'
     */
    'import.meta.vitest': 'undefined',
  },

  /**
   * @default [tsconfigPaths({ projects: ['./tsconfig.json'], configNames: ['tsconfig.json'] })]
   */
  plugins,

  test: {
    /**
     * @default true
     */
    clearMocks: true,

    /**
     * @default true
     */
    globals: true,

    /**
     * @default { enabled: true, tsconfig: './tsconfig.json' }
     */
    typecheck: {
      /**
       * @default true
       */
      enabled: true,

      /**
       * @default './tsconfig.json'
       */
      tsconfig: './tsconfig.json',
    },

    /**
     * @default true
     */
    unstubEnvs: true,

    /**
     * @default true
     */
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

    /**
     * @default { extension: ['.ts', '.tsx', '.js', '.jsx', '.mts', '.mjs', '.cts', '.cjs'], include: ['src'] }
     */
    coverage: {
      /**
       * @default ['.ts', '.tsx', '.js', '.jsx', '.mts', '.mjs', '.cts', '.cjs']
       */
      extension: ['.ts', '.tsx', '.js', '.jsx', '.mts', '.mjs', '.cts', '.cjs'],

      /**
       * @default ['src']
       */
      include: ['src'],
    },

    /**
     * @default process.env.GITHUB_ACTIONS ? [['verbose', { summary: false }], ['github-actions']] : [['verbose']]
     */
    reporters: process.env.GITHUB_ACTIONS
      ? ([['verbose', { summary: false }], ['github-actions']] as const)
      : ([['verbose']] as const),

    /**
     * @default false
     */
    watch: false,
  },
} as const satisfies ViteUserConfig
