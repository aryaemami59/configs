import js from '@eslint/js'
import type { TSESLint } from '@typescript-eslint/utils'
import prettierConfig from 'eslint-config-prettier'
import globals from 'globals'
import type { ConfigWithExtends } from 'typescript-eslint'
import { config, configs, parser } from 'typescript-eslint'
const { browser, node, nodeBuiltin } = globals

/**
 * An object representing the globals provided by Vitest for use in testing.
 *
 * @since 0.0.3
 * @public
 */
export const vitestGlobals = {
  suite: false,
  test: false,
  describe: false,
  it: false,
  expectTypeOf: false,
  assertType: false,
  expect: false,
  assert: false,
  vitest: false,
  vi: false,
  beforeAll: false,
  afterAll: false,
  beforeEach: false,
  afterEach: false,
  onTestFailed: false,
  onTestFinished: false,
} satisfies Record<string, boolean>

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
    {
      name: '@aryaemami59/global-ignores',
      ignores: [
        '**/dist/',
        '**/.yalc/',
        '**/build/',
        '**/lib/',
        '**/temp/',
        '**/.yarn/',
      ],
    },
    { name: '@aryaemami59/javascript', ...js.configs.recommended },
    ...configs.recommended,
    ...configs.stylistic,
    { name: '@aryaemami59/prettier-config', ...prettierConfig },
    {
      name: '@aryaemami59/main',
      languageOptions: {
        globals: {
          ...vitestGlobals,
          ...browser,
          ...node,
          ...nodeBuiltin,
        },
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
        'no-undef': [0],
        '@typescript-eslint/consistent-type-imports': [
          2,
          { fixStyle: 'separate-type-imports', disallowTypeAnnotations: false },
        ],
        '@typescript-eslint/consistent-type-exports': [2],
        '@typescript-eslint/no-unused-vars': [0],
        '@typescript-eslint/no-explicit-any': [0],
        '@typescript-eslint/no-empty-object-type': [
          2,
          { allowInterfaces: 'with-single-extends' },
        ],
        '@typescript-eslint/no-restricted-types': [
          2,
          {
            types: {
              '{}': {
                suggest: ['AnyNonNullishValue', 'EmptyObject', 'AnyObject'],
              },
            },
          },
        ],
        '@typescript-eslint/no-namespace': [
          2,
          { allowDeclarations: true, allowDefinitionFiles: true },
        ],
        '@typescript-eslint/ban-ts-comment': [0],
        '@typescript-eslint/consistent-type-definitions': [0, 'type'],
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
      },
      linterOptions: { reportUnusedDisableDirectives: 2 },
    },
    {
      name: '@aryaemami59/commonjs',
      files: ['**/*.c[jt]s'],
      languageOptions: { sourceType: 'commonjs' },
      rules: {
        '@typescript-eslint/no-require-imports': [0],
      },
    },
  )

/**
 * A function that returns {@linkcode flatESLintConfig}
 * along with optional additional overrides.
 * It's made mainly to provide intellisense and eliminate
 * the need for manual type annotations using JSDoc comments.
 *
 * @param additionalOverrides - Optional additional overrides to apply to the configuration.
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
