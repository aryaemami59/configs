import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import {
  defaultCLIArguments,
  defaultCLICommand,
  fixturesDirectoryName,
  runTypeScriptCLI,
} from './test-utils.js'

describe('tsc catches type errors as expected', () => {
  test.for([
    ['TypeScript', 'ts'],
    ['JavaScript', 'js'],
  ] as const)(
    'typechecking %s (.%s) files',
    async ([, directoryToGetTypeChecked], { expect }) => {
      const cwd = path.join(
        fixturesDirectoryName,
        'bad',
        directoryToGetTypeChecked,
      )

      const execFileResults = runTypeScriptCLI(undefined, { cwd })

      await expect(execFileResults).rejects.toThrow(Error)

      await expect(execFileResults).rejects.toThrow(
        Error(
          `Command failed: ${defaultCLICommand} ${defaultCLIArguments.join(' ')}\n`,
        ),
      )

      const distFolder = path.resolve(cwd, 'dist')

      await expect(fs.access(distFolder)).rejects.toThrow(Error)

      await expect(fs.access(distFolder)).rejects.toThrow(
        Error(`ENOENT: no such file or directory, access '${distFolder}'`),
      )
    },
  )
})

describe('tsc compiles successfully', () => {
  test.for([
    ['TypeScript', 'ts'],
    ['JavaScript', 'js'],
  ] as const)(
    'typechecking %s (.%s) files',
    async ([, directoryToGetTypeChecked], { expect }) => {
      const cwd = path.join(
        fixturesDirectoryName,
        'good',
        directoryToGetTypeChecked,
      )

      const execFileResults = runTypeScriptCLI(undefined, { cwd })

      await expect(execFileResults).resolves.toStrictEqual({
        stderr: '',
        stdout: '',
      })

      const distFolder = path.resolve(cwd, 'dist')

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
