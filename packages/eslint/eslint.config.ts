import eslint from '@eslint/js'
import type { TSESLint } from '@typescript-eslint/utils'
import prettierConfig from 'eslint-config-prettier'
import globals from 'globals'
import tsEslint from 'typescript-eslint'

/**
 * An object representing the globals provided by Vitest for use in testing.
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
} satisfies Record<string, boolean>

/**
 * Flat ESLint configuration tailored for projects using TypeScript.
 */
export const flatESLintConfig = tsEslint.config(
  // `ignores` must be first.
  { ignores: ['dist/', '.*'] },
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
  ...tsEslint.configs.stylistic,
  prettierConfig,
  {
    languageOptions: {
      globals: {
        ...vitestGlobals,
        ...globals.nodeBuiltin,
        ...globals.browser,
        ...globals.node,
      },
      parser: tsEslint.parser,
      parserOptions: {
        project: ['./tsconfig.json'],
        ecmaVersion: 'latest',
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        2,
        { fixStyle: 'separate-type-imports', disallowTypeAnnotations: false },
      ],
      '@typescript-eslint/consistent-type-exports': [2],
      '@typescript-eslint/no-unused-vars': [0],
      '@typescript-eslint/array-type': [2, { default: 'array-simple' }],
      '@typescript-eslint/no-explicit-any': [0],
      '@typescript-eslint/no-empty-interface': [
        2,
        { allowSingleExtends: true },
      ],
      '@typescript-eslint/no-unsafe-argument': [0],
      '@typescript-eslint/ban-types': [2],
      '@typescript-eslint/no-namespace': [
        2,
        { allowDeclarations: true, allowDefinitionFiles: true },
      ],
      '@typescript-eslint/ban-ts-comment': [0],
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
    plugins: { '@typescript-eslint': tsEslint.plugin },
    linterOptions: { reportUnusedDisableDirectives: 2 },
  },
)

/**
 * A function that returns {@linkcode flatESLintConfig}
 * along with optional additional overrides.
 * It's made mainly to provide intellisense and eliminate
 * the need for manual type annotations using JSDoc comments.
 *
 * @param additionalOverrides - Optional additional overrides to apply to the configuration.
 * @returns An augmented version of the default `flatESLintConfig`, incorporating any provided overrides.
 */
export const createESLintConfig = (
  additionalOverrides: TSESLint.FlatConfig.ConfigArray = [],
) => [...flatESLintConfig, ...additionalOverrides]

export default flatESLintConfig
