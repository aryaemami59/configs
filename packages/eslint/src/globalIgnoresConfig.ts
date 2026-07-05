import packageJson from '@aryaemami59/eslint-config/package.json' with { type: 'json' }
import type { Config } from './external.js'

/**
 * An object representing
 * {@link https://eslint.org/docs/latest/use/configure/ignore#ignoring-files | **global ignore patterns**}
 * for ESLint configuration.
 *
 * **Note:** Previously referred to as `globalIgnores`.
 *
 * @since 0.0.3
 * @public
 */
export const globalIgnoresConfig = {
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
} satisfies Config satisfies Pick<Config, 'ignores' | 'name'>
