import packageJson from '../package.json' with { type: 'json' }
import type { Config } from './external.js'

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
  name: `${packageJson.name}/global-ignores`,
} as const satisfies Config
