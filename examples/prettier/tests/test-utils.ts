import type { ExecOptionsWithStringEncoding } from 'node:child_process'
import * as childProcess from 'node:child_process'
import * as path from 'node:path'
import { promisify, stripVTControlCharacters } from 'node:util'

/**
 * A {@linkcode Promise | promise}-returning version of
 * {@linkcode https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback | child_process.exec}.
 *
 * @internal
 */
export const exec = promisify(childProcess.exec)

/**
 * The CLI executable invoked by {@linkcode runPrettierCLI()}.
 *
 * @internal
 */
export const defaultCLICommand = 'prettier'

/**
 * Arguments prepended to every {@linkcode runPrettierCLI()} invocation.
 * `--ignore-path null` opts out of Prettier's default ignore file so fixtures
 * under `temp/` are not skipped.
 *
 * @internal
 */
export const defaultCLIArguments = [
  '--ignore-path',
  'null',
] as const satisfies readonly string[]

/**
 * The options {@linkcode runPrettierCLI()} passes to {@linkcode exec} unless
 * overridden, rooted at the example project directory.
 *
 * @internal
 */
export const defaultExecOptions = {
  cwd: path.join(__dirname, '..'),
  encoding: 'utf-8',
} as const satisfies ExecOptionsWithStringEncoding

// TODO: Fix error messages in tests.
/**
 * Runs the real `prettier` CLI so tests can assert on its actual output,
 * logging `stdout` and `stderr` as they are produced.
 *
 * @param [CLIArguments=[]] - **Optional** arguments appended after {@linkcode defaultCLIArguments}.
 * @param [execOptions={}] - **Optional** overrides merged over {@linkcode defaultExecOptions}.
 * @returns A {@linkcode Promise | promise} that resolves with the `stdout` and `stderr` of the command.
 * @throws An {@linkcode Error} whose message has had its ANSI escape sequences stripped, with the original error kept as its `cause`.
 *
 * @todo Fix error messages in tests.
 * @internal
 */
export const runPrettierCLI = async (
  CLIArguments: readonly string[] = [],
  execOptions: Partial<ExecOptionsWithStringEncoding> = {},
) => {
  try {
    const execResults = await exec(
      [defaultCLICommand, ...defaultCLIArguments, ...CLIArguments].join(' '),
      {
        ...defaultExecOptions,
        ...execOptions,
      },
    )

    const { stderr, stdout } = execResults

    if (stdout) {
      console.log(stdout)
    }

    if (stderr) {
      console.error(stderr)
    }

    return execResults
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(stripVTControlCharacters(error.message), { cause: error })
    }

    throw error
  }
}

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
   * Path to the file to be formatted.
   */
  fileToBeFormatted: string
}
