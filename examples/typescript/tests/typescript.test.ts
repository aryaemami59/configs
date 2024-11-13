import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import type { LocalTestContext } from './test-utils.js'
import { cli, exec } from './test-utils.js'

describe<LocalTestContext>('TS file', async () => {
  const tempDirectory = await fs.mkdtemp('temp-ts-')

  const fileContent = `const someNumber: number | string = 1\n`

  const fileToGetTypeChecked = path.join(tempDirectory, 'test.ts')

  const localTest = test.extend<LocalTestContext>({
    fileToGetTypeChecked,
    tempDirectory,
  })

  beforeAll(async () => {
    await fs.writeFile(fileToGetTypeChecked, fileContent, 'utf-8')

    await fs.copyFile(
      'tsconfig.json',
      path.join(tempDirectory, 'tsconfig.json'),
    )
  })

  afterAll(async () => {
    await fs.rm(tempDirectory, { recursive: true, force: true })
  })

  localTest('tsc works', async ({ expect, tempDirectory }) => {
    await expect(exec(`${cli} ${tempDirectory}`)).resolves.toEqual({
      stderr: '',
      stdout: '',
    })
  })
})
