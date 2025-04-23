import type { Linter } from 'eslint'
import globalIdentifiers from 'globals'

const { browser, node, nodeBuiltin, vitest } = globalIdentifiers

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
  chai: 'writable',
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
export const globals =
  /* @__PURE__ */
  Object.assign(
    {
      ...browser,
      ...node,
      ...nodeBuiltin,
    } as const satisfies Linter.Globals,

    {
      ...vitest,
      ...vitestGlobals,
    } as const satisfies Linter.Globals,
  ) satisfies Linter.Globals
