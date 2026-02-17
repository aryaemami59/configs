import type {
  sharedEnvironmentGlobals,
  vitestGlobals,
} from '@aryaemami59/eslint-config'
import type { browser, node, vitest as vitestGlobalsType } from 'globals'
import type { Simplify } from './test-utils.js'

describe('vitest globals', () => {
  type Globals = typeof sharedEnvironmentGlobals
  it('type of `sharedEnvironmentGlobals` should match the readonly merged type of all constituents', () => {
    type ExpectedType = Readonly<
      Simplify<
        typeof browser &
          typeof node &
          (Omit<typeof vitestGlobals, keyof typeof vitestGlobalsType> &
            typeof vitestGlobals)
      >
    >

    expectTypeOf<Globals>().toExtend<ExpectedType>()

    expectTypeOf<Globals>().toMatchObjectType<ExpectedType>()

    // We use `Simplify` to avoid using `.branded` which hinders performance.
    expectTypeOf<Simplify<Globals>>().toEqualTypeOf<ExpectedType>()
  })
})
