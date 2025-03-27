import type { Linter } from 'eslint'

/**
 * An object representing
 * {@link https://eslint.org/docs/latest/use/configure/ignore#ignoring-files | **global ignore patterns**}
 * for ESLint configuration.
 *
 * @since 0.0.3
 * @public
 */
export const globalIgnores = {
  name: '@aryaemami59/global-ignores',
  ignores: [
    '**/dist/',
    '**/.yalc/',
    '**/build/',
    '**/lib/',
    '**/temp/',
    '**/.temp/',
    '**/.tmp/',
    '**/.yarn/',
    '**/coverage/',
    '**/.docusaurus/',
  ],
} as const satisfies Linter.Config
