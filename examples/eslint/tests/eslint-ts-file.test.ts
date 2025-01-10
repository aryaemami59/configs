import * as path from 'node:path'
import type { LocalTestContext } from './test-utils.js'
import {
  defaultCLICommand,
  fixturesDirectoryPath,
  runESLintCLI,
} from './test-utils.js'

describe('linting TS files', () => {
  const localTest = test.extend<LocalTestContext>({
    fileToBeLinted: path.posix.join(fixturesDirectoryPath, 'ts', 'test.ts'),
  })

  localTest('no config specified', async ({ expect, fileToBeLinted }) => {
    const CLIArguments = [fileToBeLinted]

    await expect(runESLintCLI(CLIArguments)).rejects.toThrow(
      Error(`Command failed: ${defaultCLICommand} ${CLIArguments.join(' ')}\n`)
        .message,
    )
  })

  localTest.for([
    'eslint.config.js',
    'eslint.config.mjs',
    'eslint.config.cjs',
  ] as const)('%s', async (configFileName, { expect, fileToBeLinted }) => {
    const CLIArguments = ['--config', configFileName, fileToBeLinted]

    await expect(runESLintCLI(CLIArguments)).rejects.toThrow(
      process.versions.node.startsWith('22') &&
        configFileName === 'eslint.config.cjs'
        ? `Command failed: ${defaultCLICommand} ${CLIArguments.join(' ')}\n`
        : Error(
            `Command failed: ${defaultCLICommand} ${CLIArguments.join(' ')}\n`,
          ).message,
    )
  })

  localTest.for([
    'eslint.config.ts',
    'eslint.config.mts',
    'eslint.config.cts',
  ] as const)('%s', async (configFileName, { expect, fileToBeLinted }) => {
    const CLIArguments = ['--config', configFileName, fileToBeLinted]

    await expect(runESLintCLI(CLIArguments)).rejects.toThrow(
      Error(`Command failed: ${defaultCLICommand} ${CLIArguments.join(' ')}\n`)
        .message,
    )
  })
})
