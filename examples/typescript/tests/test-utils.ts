import type { ExecOptionsWithStringEncoding } from 'node:child_process'
import * as childProcess from 'node:child_process'
import * as path from 'node:path'
import { promisify } from 'node:util'

/**
 * A {@linkcode Promise | promise}-returning version of
 * {@linkcode https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback | child_process.exec}.
 *
 * @internal
 */
export const exec = promisify(childProcess.exec)

/**
 * The CLI executable invoked by {@linkcode runTypeScriptCLI()}.
 *
 * @internal
 */
export const defaultCLICommand = 'tsc'

/**
 * Arguments prepended to every {@linkcode runTypeScriptCLI()} invocation.
 *
 * @internal
 */
export const defaultCLIArguments = [] as const satisfies readonly string[]

/**
 * The options {@linkcode runTypeScriptCLI()} passes to {@linkcode exec} unless
 * overridden, rooted at the example project directory.
 *
 * @internal
 */
export const defaultExecOptions = {
  cwd: path.join(__dirname, '..'),
  encoding: 'utf-8',
} as const satisfies ExecOptionsWithStringEncoding

/**
 * Runs the real `tsc` CLI so tests can assert on its actual output.
 *
 * @param [CLIArguments=[]] - **Optional** arguments appended after {@linkcode defaultCLIArguments}.
 * @param [execOptions={}] - **Optional** overrides merged over {@linkcode defaultExecOptions}.
 * @returns A {@linkcode Promise | promise} that resolves with the `stdout` and `stderr` of the command, and rejects if it exits with a non-zero code.
 *
 * @internal
 */
export const runTypeScriptCLI = (
  CLIArguments: readonly string[] = [],
  execOptions: Partial<ExecOptionsWithStringEncoding> = {},
) =>
  exec([defaultCLICommand, ...defaultCLIArguments, ...CLIArguments].join(' '), {
    ...defaultExecOptions,
    ...execOptions,
  })

/**
 * Name of the directory the global setup writes fixture files into.
 *
 * @internal
 */
export const fixturesDirectoryName = 'temp'

/**
 * Absolute path to {@linkcode fixturesDirectoryName} inside the example
 * project.
 *
 * @internal
 */
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
