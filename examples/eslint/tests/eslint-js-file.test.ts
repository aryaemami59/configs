import * as path from 'node:path'
import type { LocalTestContext } from './test-utils.js'
import { fixturesDirectoryPath, runESLintCLI } from './test-utils.js'

describe('linting JS files', () => {
  const localTest = test.extend<LocalTestContext>({
    fileToBeLinted: path.posix.join(fixturesDirectoryPath, 'js', 'test.js'),
  })

  localTest('no config specified', async ({ expect, fileToBeLinted }) => {
    await expect(runESLintCLI([fileToBeLinted])).resolves.toStrictEqual({
      stderr: '',
      stdout: '',
    })
  })

  localTest.for([
    'eslint.config.js',
    'eslint.config.mjs',
    'eslint.config.cjs',
  ] as const)('%s', async (configFileName, { expect, fileToBeLinted }) => {
    const CLIArguments = ['--config', configFileName, fileToBeLinted]

    await expect(runESLintCLI(CLIArguments)).resolves.toStrictEqual({
      stderr:
        process.versions.node.startsWith('22') &&
        configFileName === 'eslint.config.cjs'
          ? expect.stringContaining('ExperimentalWarning: CommonJS module')
          : '',
      stdout: '',
    })
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

    await expect(runESLintCLI(CLIArguments)).resolves.toStrictEqual({
      stderr: '',
      stdout: '',
    })
  })
})
