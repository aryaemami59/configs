import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import type { LocalTestContext } from './test-utils.js'
import { cli, exec } from './test-utils.js'

describe('JS file', async () => {
  const tempDirectory = await fs.mkdtemp('temp-js-')

  const fileContent = `const someString = ''\n`

  const fileToBeFormatted = path.join(tempDirectory, 'test.js')

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
    await expect(exec(`${cli} ${fileToBeFormatted}`)).resolves.toEqual({
      stderr: '',
      stdout: `Checking formatting...\nAll matched files use Prettier code style!\n`,
    })
  })

  localTest.for([
    'prettier.config.js',
    'prettier.config.cjs',
    'prettier.config.mjs',
    '.prettierrc.js',
    '.prettierrc.cjs',
    '.prettierrc.mjs',
  ] as const)('%s', async (configFileName, { expect, fileToBeFormatted }) => {
    await expect(
      exec(`${cli} ${fileToBeFormatted} --config ${configFileName}`),
    ).resolves.toEqual({
      stderr:
        process.versions.node.startsWith('23') &&
        (configFileName === 'prettier.config.cjs' ||
          configFileName === '.prettierrc.cjs')
          ? expect.stringContaining(`ExperimentalWarning: CommonJS module`)
          : '',
      stdout: `Checking formatting...\nAll matched files use Prettier code style!\n`,
    })
  })
})
