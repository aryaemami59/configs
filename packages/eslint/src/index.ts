import js from '@eslint/js'
import type { TSESLint } from '@typescript-eslint/utils'
import type { Linter } from 'eslint'
import prettierConfig from 'eslint-config-prettier'
import globalIdentifiers from 'globals'
import type { ConfigWithExtends } from 'typescript-eslint'
import { config, configs, parser } from 'typescript-eslint'

const { browser, node, nodeBuiltin } = globalIdentifiers

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
    '**/.yarn/',
    '**/coverage/',
  ],
} as const satisfies Linter.Config

/**
 * An object representing the
 * {@link https://vitest.dev/config/#globals | globals} provided by
 * {@link https://vitest.dev | **Vitest**} for use in testing.
 *
 * @since 0.0.3
 * @public
 */
export const vitestGlobals = {
  suite: 'writable',
  test: 'writable',
  describe: 'writable',
  it: 'writable',
  expectTypeOf: 'writable',
  assertType: 'writable',
  expect: 'writable',
  assert: 'writable',
  vitest: 'writable',
  vi: 'writable',
  beforeAll: 'writable',
  afterAll: 'writable',
  beforeEach: 'writable',
  afterEach: 'writable',
  onTestFailed: 'writable',
  onTestFinished: 'writable',
} as const satisfies Linter.Globals

/**
 * An object that specifies which global
 * variables are available during linting.
 *
 * @since 0.0.3
 * @public
 */
export const globals: typeof vitestGlobals &
  typeof browser &
  typeof node &
  typeof nodeBuiltin = /* @__PURE__ */ Object.assign(
  vitestGlobals,
  browser,
  node,
  nodeBuiltin,
) satisfies Linter.Globals

/**
 * An object comprised of ESLint rules to disable.
 * These rules are disabled in {@linkcode flatESLintConfig}.
 *
 * @since 0.0.3
 * @public
 */
export const rulesToDisable = {
  'no-undef': [0],
  '@typescript-eslint/no-unused-vars': [
    0,
    {
      vars: 'all',
      args: 'after-used',
      caughtErrors: 'all',
      ignoreRestSiblings: false,
      reportUsedIgnorePattern: false,
    },
  ],
  '@typescript-eslint/ban-ts-comment': [
    0,
    [
      {
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': true,
        'ts-nocheck': true,
        'ts-check': false,
        minimumDescriptionLength: 3,
      },
    ],
  ],
} as const satisfies Linter.RulesRecord

/**
 * Flat ESLint configuration tailored for projects using TypeScript.
 *
 * @example
 * <caption>#### __ECMAScript Modules (ESM) usage inside a file like `eslint.config.mts` or `eslint.config.mjs`__</caption>
 *
 * ```ts
 * import { flatESLintConfig } from '@aryaemami59/eslint-config'
 *
 * export default flatESLintConfig
 * ```
 *
 * @example
 * <caption>#### __CommonJS (CJS) usage inside a file like `eslint.config.cts` or `eslint.config.cjs` (using `require`)__</caption>
 *
 * ```ts
 * const { flatESLintConfig } = require('@aryaemami59/eslint-config')
 *
 * module.exports = flatESLintConfig
 * ```
 *
 * @example
 * <caption>#### __CommonJS (CJS) usage inside a file like `eslint.config.cjs` or `eslint.config.cts` (using dynamic import)__</caption>
 *
 * ```ts
 * module.exports = (async () =>
 *   (await import('@aryaemami59/eslint-config')).flatESLintConfig)()
 * ```
 *
 * @example
 * <caption>#### __CommonJS (CJS) usage inside a file like `eslint.config.cts` (using import and export assignment)__</caption>
 *
 * ```ts
 * import eslintConfigModule = require('@aryaemami59/eslint-config')
 * import flatESLintConfig = eslintConfigModule.flatESLintConfig
 *
 * export = flatESLintConfig
 * ```
 *
 * @since 0.0.3
 * @public
 */
export const flatESLintConfig: TSESLint.FlatConfig.Config[] =
  /* @__PURE__ */ config(
    // `ignores` must be first.
    // config with just `ignores` is the replacement for `.eslintignore`
    globalIgnores,
    { name: '@aryaemami59/javascript', ...js.configs.recommended },
    ...configs.recommended,
    ...configs.stylistic,
    { name: '@aryaemami59/prettier-config', ...prettierConfig },
    {
      name: '@aryaemami59/main',
      languageOptions: {
        globals,
        parser,
        parserOptions: {
          projectService: {
            allowDefaultProject: ['.*.js', '.*.mjs', '.*.cjs'],
            defaultProject: './tsconfig.json',
          },
          ecmaVersion: 'latest',
        },
      },
      rules: {
        '@typescript-eslint/consistent-type-imports': [
          2,
          {
            prefer: 'type-imports',
            fixStyle: 'separate-type-imports',
            disallowTypeAnnotations: true,
          },
        ],
        '@typescript-eslint/consistent-type-exports': [
          2,
          { fixMixedExportsWithInlineTypeSpecifier: false },
        ],
        '@typescript-eslint/no-explicit-any': [
          2,
          { fixToUnknown: false, ignoreRestArgs: false },
        ],
        '@typescript-eslint/no-empty-object-type': [
          2,
          { allowInterfaces: 'never', allowObjectTypes: 'never' },
        ],
        '@typescript-eslint/no-restricted-types': [
          2,
          {
            types: {
              '{}': {
                message: `
- If you want to represent an empty object, use \`type EmptyObject = Record<string, never>\`.
- If you want to represent an object literal, use either \`type AnyObject = Record<string, any>\` or \`object\`.
- If you want to represent any non-nullish value, use \`type AnyNonNullishValue = NonNullable<unknown>\`.`,
                suggest: [
                  'AnyNonNullishValue',
                  'EmptyObject',
                  'AnyObject',
                  'object',
                  'Record<string, never>',
                  'Record<string, any>',
                  'NonNullable<unknown>',
                ],
              },
            },
          },
        ],
        '@typescript-eslint/no-namespace': [
          2,
          { allowDeclarations: false, allowDefinitionFiles: true },
        ],
        '@typescript-eslint/consistent-type-definitions': [2, 'type'],
        'sort-imports': [
          2,
          {
            ignoreCase: false,
            ignoreDeclarationSort: true,
            ignoreMemberSort: false,
            memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
            allowSeparatedGroups: true,
          },
        ],
        '@typescript-eslint/unified-signatures': [2],
        '@typescript-eslint/dot-notation': [
          2,
          {
            // Related issue: https://github.com/typescript-eslint/typescript-eslint/issues/10338
            // Base ESLint default options
            allowKeywords: true,
            allowPattern: '',
            // TypeScript ESLint default options
            allowPrivateClassPropertyAccess: false,
            allowProtectedClassPropertyAccess: false,
            allowIndexSignaturePropertyAccess: false,
          },
        ],
        '@typescript-eslint/no-unnecessary-type-parameters': [2],
        '@typescript-eslint/no-invalid-void-type': [2],
        '@typescript-eslint/no-confusing-void-expression': [2],
        '@typescript-eslint/no-duplicate-type-constituents': [2],
        '@typescript-eslint/require-await': [2],
        '@typescript-eslint/no-redundant-type-constituents': [2],
        '@typescript-eslint/no-unnecessary-type-arguments': [2],
        '@typescript-eslint/no-unnecessary-type-assertion': [2],
        '@typescript-eslint/prefer-nullish-coalescing': [2],
        '@typescript-eslint/no-inferrable-types': [2],
        '@typescript-eslint/no-empty-function': [
          2,
          {
            // Related issue: https://github.com/typescript-eslint/typescript-eslint/issues/10338
            // Base ESLint default options
            allow: [],
          },
        ],
        '@typescript-eslint/no-unused-expressions': [
          2,
          {
            // Related issue: https://github.com/typescript-eslint/typescript-eslint/issues/10338
            // Base ESLint default options
            allowShortCircuit: false,
            allowTernary: false,
            allowTaggedTemplates: false,
            enforceForJSX: false,
          },
        ],
        'object-shorthand': [2],
        ...rulesToDisable,
      },
      linterOptions: { reportUnusedDisableDirectives: 2 },
    },
    {
      name: '@aryaemami59/commonjs',
      files: ['**/*.c[jt]s'],
      languageOptions: { sourceType: 'commonjs' },
      rules: {
        '@typescript-eslint/no-require-imports': [
          0,
          [{ allow: [], allowAsImport: false }],
        ],
      },
    },
  )

/**
 * A function that returns {@linkcode flatESLintConfig}
 * along with optional additional overrides.
 * It's made mainly to provide intellisense and eliminate
 * the need for manual type annotations using JSDoc comments.
 *
 * @param additionalOverrides - **Optional** additional overrides to apply to the configuration.
 * @returns An augmented version of the default {@linkcode flatESLintConfig}, incorporating any provided overrides.
 *
 * @example
 * <caption>#### __ECMAScript Modules (ESM) usage inside a file like `eslint.config.mts` or `eslint.config.mjs`__</caption>
 *
 * ```ts
 * import { createESLintConfig } from '@aryaemami59/eslint-config'
 *
 * export default createESLintConfig([
 *   {
 *     rules: {
 *       'no-console': [0],
 *     },
 *   },
 *   {
 *     // ...Other additional overrides
 *   },
 * ])
 * ```
 *
 * @example
 * <caption>#### __CommonJS (CJS) usage inside a file like `eslint.config.cts` or `eslint.config.cjs` (using `require`)__</caption>
 *
 * ```ts
 * const { createESLintConfig } = require('@aryaemami59/eslint-config')
 *
 * module.exports = createESLintConfig([
 *   {
 *     rules: {
 *       'no-console': [0],
 *     },
 *   },
 *   {
 *     // ...Other additional overrides
 *   },
 * ])
 * ```
 *
 * @example
 * <caption>#### __CommonJS (CJS) usage inside a file like `eslint.config.cts` or `eslint.config.cjs` (using dynamic import)__</caption>
 *
 * ```ts
 * module.exports = (async () =>
 *   (await import('@aryaemami59/eslint-config')).createESLintConfig([
 *     {
 *       rules: {
 *         'no-console': [0],
 *       },
 *     },
 *     {
 *       // ...Other additional overrides
 *     },
 *   ]))()
 * ```
 *
 * @example
 * <caption>#### __CommonJS (CJS) usage inside a file like `eslint.config.cts` (using import and export assignment)__</caption>
 *
 * ```ts
 * import eslintConfigModule = require('@aryaemami59/eslint-config')
 * import createESLintConfig = eslintConfigModule.createESLintConfig
 *
 * export = createESLintConfig([
 *   {
 *     rules: {
 *       'no-console': [0],
 *     },
 *   },
 *   {
 *     // ...Other additional overrides
 *   },
 * ])
 * ```
 *
 * @since 0.0.3
 * @public
 */
export const createESLintConfig = (
  additionalOverrides: ConfigWithExtends[] = [],
): TSESLint.FlatConfig.Config[] =>
  /* @__PURE__ */ config(...flatESLintConfig, ...additionalOverrides)
