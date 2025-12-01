import type { Config } from 'eslint/config'
import { packageJsonName } from './packageJsonName.js'

/**
 * An object representing
 * {@link https://eslint.org/docs/latest/use/configure/ignore#ignoring-files | **global ignore patterns**}
 * for ESLint configuration.
 *
 * @since 0.0.3
 * @public
 */
export const globalIgnores = {
  ignores: [
    '**/__snapshots__/',
    '**/.docusaurus/',
    '**/.expo/',
    '**/.next/',
    '**/.playwright/',
    '**/.temp/',
    '**/.tmp/',
    '**/.turbo/',
    '**/.wrangler/',
    '**/.yalc/',
    '**/.yarn/',
    '**/*.snap',
    '**/build/',
    '**/coverage/',
    '**/dist/',
    '**/temp/',
  ],
  name: `${packageJsonName}/global-ignores`,
} as const satisfies Config
