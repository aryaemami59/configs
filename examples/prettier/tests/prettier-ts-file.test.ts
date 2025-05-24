import * as path from 'node:path'
import type { LocalTestContext } from './test-utils.js'
import {
  defaultCLIArguments,
  defaultCLICommand,
  fixturesDirectoryName,
  runPrettierCLI,
} from './test-utils.js'

describe('formatting TS files', () => {
  const localTest = test.extend<LocalTestContext>({
    fileToBeFormatted: path.posix.join(fixturesDirectoryName, 'ts', 'test.ts'),
  })

  localTest('no config specified', async ({ expect, fileToBeFormatted }) => {
    const CLIArguments = ['--check', fileToBeFormatted]

    await expect(runPrettierCLI(CLIArguments)).rejects.toThrow(
      Error(
        `Command failed: ${defaultCLICommand} ${[...defaultCLIArguments, ...CLIArguments].join(' ')}\n[warn] ${fileToBeFormatted}\n[warn] Code style issues found in the above file. Run Prettier with --write to fix.\n`,
      ).message,
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
    const CLIArguments = [
      '--config',
      configFileName,
      '--check',
      fileToBeFormatted,
    ]

    await expect(runPrettierCLI(CLIArguments)).rejects.toThrow(
      process.versions.node.startsWith('22') &&
        (configFileName === 'prettier.config.cjs' ||
          configFileName === '.prettierrc.cjs')
        ? '\n[warn] Code style issues found in the above file. Run Prettier with --write to fix.\n'
        : Error(
            `Command failed: ${defaultCLICommand} ${[...defaultCLIArguments, ...CLIArguments].join(' ')}\n[warn] ${fileToBeFormatted}\n[warn] Code style issues found in the above file. Run Prettier with --write to fix.\n`,
          ).message,
    )
  })
})
