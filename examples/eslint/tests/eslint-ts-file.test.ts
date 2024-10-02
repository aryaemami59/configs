import * as path from 'node:path'
import type { LocalTestContext } from './test-utils.js'
import { cli, exec } from './test-utils.js'

describe<LocalTestContext>('TS file', async (test) => {
  beforeEach<LocalTestContext>((context) => {
    context.fileToBeLinted = path.resolve('temp', 'ts', 'test.ts')
  })

  test('no config specified', async ({ expect, fileToBeLinted }) => {
    const command = `${cli} ${fileToBeLinted}`

    await expect(exec(command)).rejects.toThrowError(
      Error(`Command failed: ${command}\n`),
    )
  })

  test.for([
    `eslint.config.js`,
    'eslint.config.mjs',
    'eslint.config.cjs',
    'eslint.config.ts',
    'eslint.config.mts',
    'eslint.config.cts',
  ] as const)('%s', async (configFileName, { expect, fileToBeLinted }) => {
    const command = `${cli} ${configFileName.endsWith('ts') ? '--flag unstable_ts_config' : ''} ${fileToBeLinted} --config ${configFileName}`

    await expect(exec(command)).rejects.toThrowError(
      Error(`Command failed: ${command}\n`),
    )
  })
})
