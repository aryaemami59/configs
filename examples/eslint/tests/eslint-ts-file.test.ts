import * as path from 'node:path'
import type { LocalTestContext } from './test-utils.js'
import { execFile } from './test-utils.js'

describe('linting TS files', () => {
  const localTest = test.extend<LocalTestContext>({
    fileToBeLinted: path.resolve('temp', 'ts', 'test.ts'),
  })

  localTest('no config specified', async ({ expect, fileToBeLinted }) => {
    const command = `eslint`
    const args = ['--no-ignore', fileToBeLinted]

    await expect(execFile(command, args, { shell: true })).rejects.toThrow(
      Error(`Command failed: ${command} ${args.join(' ')}\n`),
    )
  })

  test.for([
    `eslint.config.js`,
    'eslint.config.mjs',
    'eslint.config.cjs',
  ] as const)('%s', async (configFileName, { expect, fileToBeLinted }) => {
    const command = `eslint`
    const args = ['--no-ignore', fileToBeLinted, '--config', configFileName]

    await expect(execFile(command, args, { shell: true })).rejects.toThrow(
      process.versions.node.startsWith('23') &&
        configFileName === 'eslint.config.cjs'
        ? `Command failed: ${command} ${args.join(' ')}\n`
        : Error(`Command failed: ${command} ${args.join(' ')}\n`),
    )
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

    await expect(execFile(command, args, { shell: true })).rejects.toThrow(
      Error(`Command failed: ${command} ${args.join(' ')}\n`),
    )
  })
})
