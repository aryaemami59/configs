import { exec as _exec } from 'node:child_process'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import { promisify } from 'node:util'

const exec = promisify(_exec)

const cli = `prettier -c --ignore-path null`

interface LocalTestContext {
  tempDir: string
  filePath: string
}

describe<LocalTestContext>('JS file', async test => {
  const tempDir = await fs.mkdtemp('.temp-js')

  const fileContent = `const someString = ''\n`

  const filePath = path.join(tempDir, 'test.js')

  beforeEach<LocalTestContext>(context => {
    context.tempDir = tempDir

    context.filePath = filePath
  })

  beforeAll(async () => {
    await fs.writeFile(filePath, fileContent, 'utf-8')

    return async () => {
      await fs.rm(tempDir, { recursive: true, force: true })
    }
  })

  test('no config specified', async ({ expect, filePath }) => {
    await expect(exec(`${cli} ${filePath}`)).resolves.toEqual({
      stderr: '',
      stdout: expect.stringContaining(
        'All matched files use Prettier code style!',
      ),
    })
  })

  test('prettier.config.js', async ({ expect, filePath, task }) => {
    await expect(
      exec(`${cli} ${filePath} --config ${task.name}`),
    ).resolves.toEqual({
      stderr: '',
      stdout: expect.stringContaining(
        'All matched files use Prettier code style!',
      ),
    })
  })

  test('prettier.config.cjs', async ({ expect, filePath, task }) => {
    await expect(
      exec(`${cli} ${filePath} --config ${task.name}`),
    ).resolves.toEqual({
      stderr: '',
      stdout: expect.stringContaining(
        'All matched files use Prettier code style!',
      ),
    })
  })

  test('prettier.config.mjs', async ({ expect, filePath, task }) => {
    await expect(
      exec(`${cli} ${filePath} --config ${task.name}`),
    ).resolves.toEqual({
      stderr: '',
      stdout: expect.stringContaining(
        'All matched files use Prettier code style!',
      ),
    })
  })
})
