import { exec as _exec } from 'node:child_process'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import { promisify } from 'node:util'

export const exec = promisify(_exec)

export const cli = `eslint`

interface LocalTestContext {
  tempDir: string
  filePath: string
}

describe<LocalTestContext>('TS file', async (test) => {
  const tempDir = await fs.mkdtemp('temp-ts')

  const fileContent = 'console.log()\n'

  const filePath = path.join(tempDir, 'test.ts')

  beforeAll(async () => {
    await fs.writeFile(filePath, fileContent, 'utf-8')

    return async () => {
      await fs.rm(tempDir, { recursive: true, force: true })
    }
  })

  beforeEach<LocalTestContext>((context) => {
    context.tempDir = tempDir

    context.filePath = filePath
  })

  test('no config specified', async ({ expect, filePath, tempDir }) => {
    await expect(async () => exec(`${cli} ${filePath}`)).rejects.toThrowError(
      tempDir,
    )
  })

  test('eslint.config.js', async ({ expect, filePath, tempDir, task }) => {
    await expect(async () =>
      exec(`${cli} ${filePath} -c ${task.name}`),
    ).rejects.toThrowError(tempDir)
  })

  test('eslint.config.cjs', async ({ expect, filePath, tempDir, task }) => {
    await expect(async () =>
      exec(`${cli} ${filePath} -c ${task.name}`),
    ).rejects.toThrowError(tempDir)
  })

  test('eslint.config.mjs', async ({ expect, filePath, tempDir, task }) => {
    await expect(async () =>
      exec(`${cli} ${filePath} -c ${task.name}`),
    ).rejects.toThrowError(tempDir)
  })
})
