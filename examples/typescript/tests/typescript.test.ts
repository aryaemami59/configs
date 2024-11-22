import * as path from 'node:path'
import { cliCommand, execFile, execFileOptions } from './test-utils.js'

describe('tsc works', () => {
  test.for(['TS', 'JS'] as const)(
    'typechecking %s files',
    async (directoryToGetTypeChecked, { expect }) => {
      const cliArguments = ['-p', 'tsconfig.json']

      const execFileResults = execFile(cliCommand, cliArguments, {
        ...execFileOptions,
        cwd: path.join('temp', directoryToGetTypeChecked.toLowerCase()),
      })

      await expect(execFileResults).rejects.toThrow(Error)

      await expect(execFileResults).rejects.toThrow(
        Error(`Command failed: ${cliCommand} ${cliArguments.join(' ')}\n`),
      )
    },
  )
})
