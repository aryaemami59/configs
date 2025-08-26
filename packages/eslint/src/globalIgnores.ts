import type { TSESLint } from '@typescript-eslint/utils'
import type { Linter } from 'eslint'
import { packageName } from './packageName.js'

/**
 * An object representing
 * {@link https://eslint.org/docs/latest/use/configure/ignore#ignoring-files | **global ignore patterns**}
 * for ESLint configuration.
 *
 * @since 0.0.3
 * @public
 */
export const globalIgnores = {
  name: `${packageName}/global-ignores`,
  ignores: [
    '**/dist/',
    '**/build/',
    '**/coverage/',
    '**/__snapshots__/',
    '**/temp/',
    '**/.temp/',
    '**/.tmp/',
    '**/.yalc/',
    '**/.yarn/',
    '**/.docusaurus/',
    '**/.next/',
    '**/.expo/',
    '**/*.snap',
  ],
} as const satisfies TSESLint.FlatConfig.Config satisfies Linter.Config
