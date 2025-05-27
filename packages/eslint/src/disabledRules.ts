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
      args: 'after-used',
      // Not included in default options
      argsIgnorePattern: '^_',
      caughtErrors: 'all',
      // Not included in default options
      caughtErrorsIgnorePattern: '^_',
      // Not included in default options
      destructuredArrayIgnorePattern: '^_',
      ignoreClassWithStaticInitBlock: false,
      ignoreRestSiblings: false,
      reportUsedIgnorePattern: false,
      vars: 'all',
      // Not included in default options
      varsIgnorePattern: '^_',
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
} as const satisfies Linter.RulesRecord satisfies Record<
  keyof Linter.RulesRecord,
  [Extract<Linter.Severity, 0>, ...(readonly unknown[])]
>
