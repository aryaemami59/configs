import { globalIgnores } from '@aryaemami59/eslint-config'
import packageJson from '@aryaemami59/eslint-config/package.json'

describe('`name` property', () => {
  it("first part of `name` property matches `package.json`'s `name`", () => {
    expect(globalIgnores.name).toBe(`${packageJson.name}/global-ignores`)
  })
})
