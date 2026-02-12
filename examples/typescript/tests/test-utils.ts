import type { ExecOptionsWithStringEncoding } from 'node:child_process'
import * as childProcess from 'node:child_process'
import * as path from 'node:path'
import { promisify } from 'node:util'

export const exec = promisify(childProcess.exec)

export const defaultCLICommand = 'tsc'

export const defaultCLIArguments = [] as const satisfies readonly string[]

export const defaultExecOptions = {
  cwd: path.join(__dirname, '..'),
  encoding: 'utf-8',
} as const satisfies ExecOptionsWithStringEncoding

export const runTypeScriptCLI = (
  CLIArguments: readonly string[] = [],
  execOptions?: Partial<ExecOptionsWithStringEncoding>,
) =>
  exec([defaultCLICommand, ...defaultCLIArguments, ...CLIArguments].join(' '), {
    ...defaultExecOptions,
    ...execOptions,
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
