import * as path from 'node:path'
import type { LocalTestContext } from './test-utils.js'
import { execFile } from './test-utils.js'

describe('linting JS files', () => {
  const localTest = test.extend<LocalTestContext>({
    fileToBeLinted: path.resolve('temp', 'js', 'test.js'),
  })

  localTest('no config specified', async ({ expect, fileToBeLinted }) => {
    await expect(
      execFile(`eslint`, ['--no-ignore', fileToBeLinted], { shell: true }),
    ).resolves.toEqual({
      stderr: '',
      stdout: '',
    })
  })

  localTest.for([
    `eslint.config.js`,
    'eslint.config.mjs',
    'eslint.config.cjs',
  ] as const)('%s', async (configFileName, { expect, fileToBeLinted }) => {
    const command = `eslint`
    const args = ['--no-ignore', fileToBeLinted, '--config', configFileName]

    await expect(execFile(command, args, { shell: true })).resolves.toEqual({
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
    const command = `eslint`
    const args = [
      '--no-ignore',
      '--flag',
      'unstable_ts_config',
      fileToBeLinted,
      '--config',
      configFileName,
    ]

    await expect(execFile(command, args, { shell: true })).resolves.toEqual({
      stderr: '',
      stdout: '',
    })
  })
})
