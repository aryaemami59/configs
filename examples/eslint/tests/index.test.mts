import { globalIgnoresConfig } from '@aryaemami59/eslint-config'
import packageJson from '@aryaemami59/eslint-config/package.json' with { type: 'json' }

describe('`name` property', () => {
  it("first part of `name` property matches `package.json`'s `name`", () => {
    expect(globalIgnoresConfig.name).toBe(`${packageJson.name}/global-ignores`)
  })
})
