import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import type { LocalTestContext } from './test-utils.js'
import { cli, exec } from './test-utils.js'

describe('TS file', async () => {
  const tempDirectory = await fs.mkdtemp('temp-ts-')

  const fileContent =
    'const someFunction: (...args: any[]) => any = (arg) => arg\n'

  const fileToBeFormatted = path
    .join(tempDirectory, 'test.ts')
    .replace(path.win32.sep, path.posix.sep)

  const localTest = test.extend<LocalTestContext>({
    fileToBeFormatted,
    tempDirectory,
  })

  beforeAll(async () => {
    await fs.writeFile(fileToBeFormatted, fileContent, 'utf-8')
  })

  afterAll(async () => {
    await fs.rm(tempDirectory, { recursive: true, force: true })
  })

  localTest('no config specified', async ({ expect, fileToBeFormatted }) => {
    const command = `${cli} ${fileToBeFormatted}`

    await expect(exec(command)).rejects.toThrowError(
      Error(
        `Command failed: ${command}\n[warn] ${fileToBeFormatted}\n[warn] Code style issues found in the above file. Run Prettier with --write to fix.\n`,
      ),
    )
  })

  localTest.for([
    'prettier.config.js',
    'prettier.config.cjs',
    'prettier.config.mjs',
    '.prettierrc.js',
    '.prettierrc.cjs',
    '.prettierrc.mjs',
  ] as const)('%s', async (configFileName, { expect, fileToBeFormatted }) => {
    const command = `${cli} ${fileToBeFormatted} --config ${configFileName}`

    await expect(exec(command)).rejects.toThrowError(
      process.versions.node.startsWith('23') &&
        (configFileName === 'prettier.config.cjs' ||
          configFileName === '.prettierrc.cjs')
        ? `\n[warn] Code style issues found in the above file. Run Prettier with --write to fix.\n`
        : Error(
            `Command failed: ${command}\n[warn] ${fileToBeFormatted}\n[warn] Code style issues found in the above file. Run Prettier with --write to fix.\n`,
          ),
    )
  })
})
