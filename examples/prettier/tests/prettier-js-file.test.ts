import * as path from 'node:path'
import type { LocalTestContext } from './test-utils.js'
import { cliCommand, execFile, execFileOptions } from './test-utils.js'

describe('formatting JS files', () => {
  const localTest = test.extend<LocalTestContext>({
    fileToBeFormatted: path.posix.join('temp', 'js', 'test.js'),
  })

  localTest('no config specified', async ({ expect, fileToBeFormatted }) => {
    const cliArguments = ['--ignore-path', 'null', '--check', fileToBeFormatted]

    await expect(
      execFile(cliCommand, cliArguments, execFileOptions),
    ).resolves.toStrictEqual({
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
    const cliArguments = [
      '--ignore-path',
      'null',
      '--config',
      configFileName,
      '--check',
      fileToBeFormatted,
    ]

    await expect(
      execFile(cliCommand, cliArguments, execFileOptions),
    ).resolves.toStrictEqual({
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
