import type { ExecFileOptionsWithOtherEncoding } from 'node:child_process'
import * as childProcess from 'node:child_process'
import { promisify } from 'node:util'

export const execFile = promisify(childProcess.execFile)

export const defaultCLICommand = 'prettier'

export const defaultCLIArguments = []

export const defaultExecFileOptions = {
  encoding: 'utf-8',
  shell: true,
} as const satisfies ExecFileOptionsWithOtherEncoding

export const runPrettierCLI = (
  CLIArguments: readonly string[] = [],
  execFileOptions?: ExecFileOptionsWithOtherEncoding,
) =>
  execFile(defaultCLICommand, [...defaultCLIArguments, ...CLIArguments], {
    ...defaultExecFileOptions,
    ...execFileOptions,
  })

export const fixturesDirectoryName = 'temp'

/**
 * Represents the context for a local test.
 *
 * @internal
 */
export type LocalTestContext = {
  /**
   * Path to the file to be formatted.
   */
  fileToBeFormatted: string
}
