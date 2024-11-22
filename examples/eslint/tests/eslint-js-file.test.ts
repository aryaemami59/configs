import * as path from 'node:path'
import type { LocalTestContext } from './test-utils.js'
import { cliCommand, execFile, execFileOptions } from './test-utils.js'

describe('linting JS files', () => {
  const localTest = test.extend<LocalTestContext>({
    fileToBeLinted: path.posix.join('temp', 'js', 'test.js'),
  })

  localTest('no config specified', async ({ expect, fileToBeLinted }) => {
    await expect(
      execFile(cliCommand, [fileToBeLinted], execFileOptions),
    ).resolves.toStrictEqual({
      stderr: '',
      stdout: '',
    })
  })

  localTest.for([
    `eslint.config.js`,
    'eslint.config.mjs',
    'eslint.config.cjs',
  ] as const)('%s', async (configFileName, { expect, fileToBeLinted }) => {
    const cliArguments = ['--config', configFileName, fileToBeLinted]

    await expect(
      execFile(cliCommand, cliArguments, execFileOptions),
    ).resolves.toStrictEqual({
      stderr:
        process.versions.node.startsWith('23') &&
        configFileName === 'eslint.config.cjs'
          ? expect.stringContaining(`ExperimentalWarning: CommonJS module`)
          : '',
      stdout: '',
    })
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
    ).resolves.toStrictEqual({
      stderr: '',
      stdout: '',
    })
  })
})
