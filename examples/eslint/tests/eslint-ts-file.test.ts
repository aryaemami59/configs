import * as path from 'node:path'
import type { LocalTestContext } from './test-utils.js'
import { defaultCLICommand, runESLintCLI } from './test-utils.js'

describe('linting TS files', () => {
  const localTest = test.extend<LocalTestContext>({
    fileToBeLinted: path.posix.join('temp', 'ts', 'test.ts'),
  })

  localTest('no config specified', async ({ expect, fileToBeLinted }) => {
    const CLIArguments = [fileToBeLinted]

    await expect(runESLintCLI(CLIArguments)).rejects.toThrow(
      Error(`Command failed: ${defaultCLICommand} ${CLIArguments.join(' ')}\n`),
    )
  })

  localTest.for([
    `eslint.config.js`,
    'eslint.config.mjs',
    'eslint.config.cjs',
  ] as const)('%s', async (configFileName, { expect, fileToBeLinted }) => {
    const CLIArguments = ['--config', configFileName, fileToBeLinted]

    await expect(runESLintCLI(CLIArguments)).rejects.toThrow(
      process.versions.node.startsWith('23') &&
        configFileName === 'eslint.config.cjs'
        ? `Command failed: ${defaultCLICommand} ${CLIArguments.join(' ')}\n`
        : Error(
            `Command failed: ${defaultCLICommand} ${CLIArguments.join(' ')}\n`,
          ),
    )
  })

  localTest.for([
    'eslint.config.ts',
    'eslint.config.mts',
    'eslint.config.cts',
  ] as const)('%s', async (configFileName, { expect, fileToBeLinted }) => {
    const CLIArguments = [
      '--flag',
      'unstable_ts_config',
      '--config',
      configFileName,
      fileToBeLinted,
    ]

    await expect(runESLintCLI(CLIArguments)).rejects.toThrow(
      Error(`Command failed: ${defaultCLICommand} ${CLIArguments.join(' ')}\n`),
    )
  })
})
