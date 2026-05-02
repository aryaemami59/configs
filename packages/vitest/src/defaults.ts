import type { UserWorkspaceConfig, ViteUserConfig } from './external.js'
import type { vitestConfig, vitestProject } from './shareableConfigs.js'

/**
 * Default configuration for {@linkcode vitestProject}.
 *
 * @since 0.0.5
 * @public
 */
export const vitestProjectDefaults = {
  define: {
    /**
     * @default 'undefined'
     */
    'import.meta.vitest': 'undefined',
  },

  resolve: {
    /**
     * @default true
     */
    tsconfigPaths: true,
  },

  test: {
    /**
     * @default true
     */
    clearMocks: true,

    /**
     * @default true
     */
    globals: true,

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

    coverage: {
      /**
       * @default ['src/**\/*.?(c|m)[jt]s?(x)']
       */
      include: ['src/**/*.?(c|m)[jt]s?(x)'],
    },

    /**
     * @default process.env.GITHUB_ACTIONS ? [['default', { summary: false }], ['github-actions', {}]] : [['default', {}]]
     */
    reporters: process.env.GITHUB_ACTIONS
      ? ([
          ['default', { summary: false }],
          ['github-actions', {}],
        ] as const)
      : ([['default', {}]] as const),

    /**
     * @default false
     */
    watch: false,
  },
} as const satisfies ViteUserConfig
