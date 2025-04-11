import type { Linter } from 'eslint'

/**
 * An object comprised of ESLint rules to disable.
 * These rules are disabled in {@linkcode flatESLintConfig}.
 *
 * @since 0.0.3
 * @public
 */
export const disabledRules = {
  'no-undef': [0, { typeof: false }],
  '@typescript-eslint/no-unused-vars': [
    0,
    {
      args: 'all',
      argsIgnorePattern: '^_',
      caughtErrors: 'all',
      caughtErrorsIgnorePattern: '^_',
      destructuredArrayIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      ignoreRestSiblings: true,
    },
  ],
  '@typescript-eslint/ban-ts-comment': [
    0,
    {
      'ts-expect-error': 'allow-with-description',
      'ts-ignore': true,
      'ts-nocheck': true,
      'ts-check': false,
      minimumDescriptionLength: 3,
    },
  ],
} as const satisfies Linter.RulesRecord
