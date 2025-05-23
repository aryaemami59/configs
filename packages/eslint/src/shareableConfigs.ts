import js from '@eslint/js'
import type { TSESLint } from '@typescript-eslint/utils'
import prettierConfig from 'eslint-config-prettier/flat'
import { config, configs, parser } from 'typescript-eslint'
import { disabledRules } from './disabledRules.js'
import { globalIgnores } from './globalIgnores.js'
import { globals } from './globals.js'

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

    {
      name: `${js.meta.name}/recommended`,
      ...js.configs.recommended,
    },

    ...configs.recommended,
    ...configs.stylistic,

    {
      name: '@aryaemami59/main',
      languageOptions: {
        globals,
        parser,
        parserOptions: {
          projectService: true,
          ecmaVersion: 'latest',
        },
      },
      rules: {
        '@typescript-eslint/consistent-type-imports': [
          2,
          {
            disallowTypeAnnotations: true,
            fixStyle: 'separate-type-imports',
            prefer: 'type-imports',
          },
        ],
        '@typescript-eslint/consistent-type-exports': [
          2,
          { fixMixedExportsWithInlineTypeSpecifier: false },
        ],
        '@typescript-eslint/no-explicit-any': [
          2,
          {
            fixToUnknown: false,
            ignoreRestArgs: false,
          },
        ],
        '@typescript-eslint/no-empty-object-type': [
          2,
          {
            allowInterfaces: 'never',
            allowObjectTypes: 'never',
          },
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
          {
            allowDeclarations: false,
            allowDefinitionFiles: true,
          },
        ],
        '@typescript-eslint/consistent-type-definitions': [2, 'type'],
        'sort-imports': [
          2,
          {
            allowSeparatedGroups: true,
            ignoreCase: false,
            ignoreDeclarationSort: true,
            ignoreMemberSort: false,
            memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          },
        ],
        '@typescript-eslint/unified-signatures': [2],
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
        '@typescript-eslint/no-require-imports': [
          2,
          {
            allow: [],
            allowAsImport: true,
          },
        ],
        'object-shorthand': [
          2,
          'always',
          {
            avoidQuotes: true,
            ignoreConstructors: true,
            methodsIgnorePattern: '',
            avoidExplicitReturnArrows: true,
          },
        ],

        ...disabledRules,
      },

      linterOptions: {
        reportUnusedDisableDirectives: 2,
      },
    },

    {
      name: '@aryaemami59/commonjs-files',
      files: ['**/*.cjs'],
      languageOptions: {
        sourceType: 'commonjs',
      },
      rules: {
        '@typescript-eslint/no-require-imports': [
          0,
          {
            allow: [],
            allowAsImport: false,
          },
        ],
      },
    },

    prettierConfig,
  )
