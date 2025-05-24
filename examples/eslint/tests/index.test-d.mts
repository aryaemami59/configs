import type { globals, vitestGlobals } from '@aryaemami59/eslint-config'
import type {
  browser,
  node,
  nodeBuiltin,
  vitest as vitestGlobalsType,
} from 'globals'
import type { Simplify } from './test-utils.js'

describe('vitest globals', () => {
  it('type of `globals` should match the readonly merged type of all constituents', () => {
    type Globals = typeof globals

    type ExpectedType = Readonly<
      Simplify<
        typeof browser &
          typeof node &
          typeof nodeBuiltin &
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
