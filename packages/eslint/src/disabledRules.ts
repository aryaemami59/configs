import type { Linter } from './external.js'

/**
 * An object comprised of ESLint rules to disable.
 * These rules are disabled in {@linkcode flatESLintConfig}.
 *
 * @since 0.0.3
 * @public
 */
export const disabledRules = {
  '@typescript-eslint/ban-ts-comment': [
    0,
    {
      minimumDescriptionLength: 3,
      'ts-check': false,
      'ts-expect-error': 'allow-with-description',
      'ts-ignore': true,
      'ts-nocheck': true,
    },
  ],

  // TODO: Remove this once https://github.com/typescript-eslint/typescript-eslint/issues/11952 is resolved.
  // '@typescript-eslint/consistent-generic-constructors': [0],

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
  'no-undef': [
    0,
    {
      typeof: false,
    },
  ],
} as const satisfies Linter.RulesRecord satisfies Record<
  keyof Linter.RulesRecord,
  [
    ruleSeverity: Extract<Linter.Severity, 0>,
    ...ruleOptions: readonly unknown[],
  ]
>
