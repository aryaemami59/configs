import type { Linter } from './external.js'
import {
  browserGlobals,
  nodeBuiltinGlobals,
  nodeGlobals,
  vitestTestGlobals,
} from './external.js'

/**
 * An object representing the
 * {@link https://vitest.dev/config/#globals | globals} provided by
 * {@link https://vitest.dev | **Vitest**} for use in testing.
 *
 * @since 0.0.3
 * @public
 */
export const vitestGlobals = {
  afterAll: 'writable',
  afterEach: 'writable',
  assert: 'writable',
  assertType: 'writable',
  beforeAll: 'writable',
  beforeEach: 'writable',
  chai: 'writable',
  describe: 'writable',
  expect: 'writable',
  expectTypeOf: 'writable',
  it: 'writable',
  onTestFailed: 'writable',
  onTestFinished: 'writable',
  suite: 'writable',
  test: 'writable',
  vi: 'writable',
  vitest: 'writable',
} as const satisfies Linter.Globals satisfies Record<
  keyof typeof vitestTestGlobals,
  Extract<Linter.GlobalConf, 'writable'>
>

/**
 * An object that specifies which global
 * variables are available during linting.
 *
 * @since 0.0.3
 * @public
 */
export const sharedEnvironmentGlobals =
  /* @__PURE__ */
  Object.assign(
    {
      ...browserGlobals,
      ...nodeGlobals,
      ...nodeBuiltinGlobals,
    } as const satisfies Linter.Globals,

    {
      ...vitestTestGlobals,
      ...vitestGlobals,
    } as const satisfies Linter.Globals,
  ) satisfies Linter.Globals
