import * as path from 'node:path'
import type { LocalTestContext } from './test-utils.js'
import { cliCommand, execFile, execFileOptions } from './test-utils.js'

describe('formatting TS files', () => {
  const localTest = test.extend<LocalTestContext>({
    fileToBeFormatted: path.posix.join('temp', 'ts', 'test.ts'),
  })

  localTest('no config specified', async ({ expect, fileToBeFormatted }) => {
    const cliArguments = ['--ignore-path', 'null', '--check', fileToBeFormatted]

    await expect(
      execFile(cliCommand, cliArguments, execFileOptions),
    ).rejects.toThrow(
      Error(
        `Command failed: ${cliCommand} ${cliArguments.join(' ')}\n[warn] ${fileToBeFormatted}\n[warn] Code style issues found in the above file. Run Prettier with --write to fix.\n`,
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
    ).rejects.toThrow(
      process.versions.node.startsWith('23') &&
        (configFileName === 'prettier.config.cjs' ||
          configFileName === '.prettierrc.cjs')
        ? `\n[warn] Code style issues found in the above file. Run Prettier with --write to fix.\n`
        : Error(
            `Command failed: ${cliCommand} ${cliArguments.join(' ')}\n[warn] ${fileToBeFormatted}\n[warn] Code style issues found in the above file. Run Prettier with --write to fix.\n`,
          ),
    )
  })
})
