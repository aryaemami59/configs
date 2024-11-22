import * as path from 'node:path'
import type { LocalTestContext } from './test-utils.js'
import { cliCommand, execFile, execFileOptions } from './test-utils.js'

describe('linting TS files', () => {
  const localTest = test.extend<LocalTestContext>({
    fileToBeLinted: path.posix.join('temp', 'ts', 'test.ts'),
  })

  localTest('no config specified', async ({ expect, fileToBeLinted }) => {
    const cliArguments = [fileToBeLinted]

    await expect(
      execFile(cliCommand, cliArguments, execFileOptions),
    ).rejects.toThrow(
      Error(`Command failed: ${cliCommand} ${cliArguments.join(' ')}\n`),
    )
  })

  localTest.for([
    `eslint.config.js`,
    'eslint.config.mjs',
    'eslint.config.cjs',
  ] as const)('%s', async (configFileName, { expect, fileToBeLinted }) => {
    const cliArguments = ['--config', configFileName, fileToBeLinted]

    await expect(
      execFile(cliCommand, cliArguments, execFileOptions),
    ).rejects.toThrow(
      process.versions.node.startsWith('23') &&
        configFileName === 'eslint.config.cjs'
        ? `Command failed: ${cliCommand} ${cliArguments.join(' ')}\n`
        : Error(`Command failed: ${cliCommand} ${cliArguments.join(' ')}\n`),
    )
  })

  localTest.for([
    'eslint.config.ts',
    'eslint.config.mts',
    'eslint.config.cts',
  ] as const)('%s', async (configFileName, { expect, fileToBeLinted }) => {
    const cliArguments = [
      '--flag',
      'unstable_ts_config',
      '--config',
      configFileName,
      fileToBeLinted,
    ]

    await expect(
      execFile(cliCommand, cliArguments, execFileOptions),
    ).rejects.toThrow(
      Error(`Command failed: ${cliCommand} ${cliArguments.join(' ')}\n`),
    )
  })
})
