import * as path from 'node:path'
import type { LocalTestContext } from './test-utils.js'
import { fixturesDirectoryName, runESLintCLI } from './test-utils.js'

describe('linting JS files', () => {
  const localTest = test.extend<LocalTestContext>({
    fileToBeLinted: path.posix.join(fixturesDirectoryName, 'js', 'test.js'),
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

    const nodeVersion = parseFloat(process.versions.node)

    await expect(runESLintCLI(CLIArguments)).resolves.toStrictEqual({
      stderr:
        nodeVersion >= 22 &&
        nodeVersion < 22.13 &&
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
    const CLIArguments = ['--config', configFileName, fileToBeLinted]

    await expect(runESLintCLI(CLIArguments)).resolves.toStrictEqual({
      stderr: '',
      stdout: '',
    })
  })
})
