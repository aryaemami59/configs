import type { ExecFileOptionsWithOtherEncoding } from 'node:child_process'
import * as childProcess from 'node:child_process'
import * as path from 'node:path'
import { promisify } from 'node:util'

export const execFile = promisify(childProcess.execFile)

export const defaultCLICommand = 'tsc'

export const defaultCLIArguments = [] as const satisfies readonly string[]

export const defaultExecFileOptions = {
  cwd: path.join(__dirname, '..'),
  encoding: 'utf-8',
  shell: true,
} as const satisfies ExecFileOptionsWithOtherEncoding

export const runTypeScriptCLI = (
  CLIArguments: readonly string[] = [],
  execFileOptions?: Partial<ExecFileOptionsWithOtherEncoding>,
) =>
  execFile(defaultCLICommand, [...defaultCLIArguments, ...CLIArguments], {
    ...defaultExecFileOptions,
    ...execFileOptions,
  })

export const fixturesDirectoryName = 'temp'

export const fixturesDirectoryPath = path.join(
  __dirname,
  '..',
  fixturesDirectoryName,
)

/**
 * Represents the context for a local test.
 *
 * @internal
 */
export type LocalTestContext = {
  /**
   * Path to the parent directory containing files to be type-checked.
   */
  parentDirectoryToGetTypeChecked: string
}
