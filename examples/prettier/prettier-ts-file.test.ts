import { exec as _exec } from 'node:child_process'
import fs from 'node:fs/promises'
import path from 'node:path'
import { promisify } from 'node:util'
import { afterAll, beforeEach, describe } from 'vitest'

const exec = promisify(_exec)

interface LocalTestContext {
  tempDir: string
  filePath: string
}

const tempDir = await fs.mkdtemp('.temp')

const fileContent =
  'const someFunction: (...args: any[]) => any = (arg) => arg\n'

describe.concurrent<LocalTestContext>('TS file', test => {
  beforeEach<LocalTestContext>(async context => {
    context.tempDir = tempDir

    context.filePath = path.join(context.tempDir, 'test.ts')
  })

  afterAll(async () => {
    await fs.rm(tempDir, { recursive: true, force: true })
  })

  test('no config specified', async ({ expect, filePath, tempDir }) => {
    await fs.writeFile(filePath, fileContent, 'utf-8')

    await expect(() => exec(`prettier -c ${filePath}`)).rejects.toThrowError(
      tempDir,
    )
  })

  test('prettier.config.js', async ({ expect, filePath, tempDir, task }) => {
    await fs.writeFile(filePath, fileContent, 'utf-8')

    await expect(() =>
      exec(`prettier -c ${filePath} --config ${task.name}`),
    ).rejects.toThrowError(tempDir)
  })

  test('prettier.config.cjs', async ({ expect, filePath, tempDir, task }) => {
    await fs.writeFile(filePath, fileContent, 'utf-8')

    await expect(() =>
      exec(`prettier -c ${filePath} --config ${task.name}`),
    ).rejects.toThrowError(tempDir)
  })

  test('prettier.config.mjs', async ({ expect, filePath, tempDir, task }) => {
    await fs.writeFile(filePath, fileContent, 'utf-8')

    await expect(() =>
      exec(`prettier -c ${filePath} --config ${task.name}`),
    ).rejects.toThrowError(tempDir)
  })
})
