import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import type { LocalTestContext } from './test-utils.js'
import {
  defaultCLIArguments,
  defaultCLICommand,
  fixturesDirectoryPath,
  runTypeScriptCLI,
} from './test-utils.js'

describe('type-checking JS files', () => {
  const localTest = test.extend<LocalTestContext>({
    parentDirectoryToGetTypeChecked: path.join(fixturesDirectoryPath, 'js'),
  })

  localTest(
    'tsc catches type errors as expected',
    async ({ expect, parentDirectoryToGetTypeChecked }) => {
      const directoryToGetTypeChecked = path.join(
        parentDirectoryToGetTypeChecked,
        'bad',
      )

      const tsConfigFile = path.join(directoryToGetTypeChecked, 'tsconfig.json')

      const CLIArguments = ['-p', tsConfigFile]

      const execFileResults = runTypeScriptCLI(CLIArguments)

      await expect(execFileResults).rejects.toThrow(Error)

      await expect(execFileResults).rejects.toThrow(
        Error(
          `Command failed: ${defaultCLICommand} ${[...defaultCLIArguments, ...CLIArguments].join(' ')}\n`,
        ).message,
      )

      const distFolder = path.join(directoryToGetTypeChecked, 'dist')

      await expect(fs.access(distFolder)).rejects.toThrow(Error)

      await expect(fs.access(distFolder)).rejects.toThrow(
        Error(`ENOENT: no such file or directory, access '${distFolder}'`)
          .message,
      )
    },
  )

  localTest(
    'tsc compiles successfully',
    async ({ expect, parentDirectoryToGetTypeChecked }) => {
      const directoryToGetTypeChecked = path.join(
        parentDirectoryToGetTypeChecked,
        'good',
      )

      const tsConfigFile = path.join(directoryToGetTypeChecked, 'tsconfig.json')

      const CLIArguments = ['-p', tsConfigFile]

      const execFileResults = runTypeScriptCLI(CLIArguments)

      await expect(execFileResults).resolves.toStrictEqual({
        stderr: '',
        stdout: '',
      })

      const distFolder = path.join(directoryToGetTypeChecked, 'dist')

      await expect(fs.access(distFolder)).resolves.toBeUndefined()

      await expect(
        fs.readdir(distFolder, {
          encoding: 'utf-8',
          recursive: true,
        }),
      ).resolves.toHaveLength(6)
    },
  )
})
