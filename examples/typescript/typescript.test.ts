import { exec as _exec } from 'node:child_process'
import fs from 'node:fs/promises'
import path from 'node:path'
import { promisify } from 'node:util'

const exec = promisify(_exec)

const cli = `tsc -p`

interface LocalTestContext {
  tempDir: string
  filePath: string
}

describe<LocalTestContext>('TS file', async (test) => {
  const tempDir = await fs.mkdtemp('.temp-ts')

  const fileContent = `const someNumber: number | string = 1\n`

  const filePath = path.join(tempDir, 'test.ts')

  beforeEach<LocalTestContext>(async (context) => {
    context.tempDir = tempDir

    context.filePath = filePath
  })

  beforeAll(async () => {
    await fs.writeFile(filePath, fileContent, 'utf-8')

    await fs.copyFile('tsconfig.json', path.join(tempDir, 'tsconfig.json'))

    return async () => {
      await fs.rm(tempDir, { recursive: true, force: true })
    }
  })

  test('tsc works', async ({ expect, tempDir }) => {
    await expect(exec(`${cli} ${tempDir}`)).resolves.toEqual({
      stderr: '',
      stdout: '',
    })
  })
})
