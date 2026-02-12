import type { ExecOptionsWithStringEncoding } from 'node:child_process'
import * as childProcess from 'node:child_process'
import * as path from 'node:path'
import { promisify, stripVTControlCharacters } from 'node:util'

export const exec = promisify(childProcess.exec)

export const defaultCLICommand = 'prettier'

export const defaultCLIArguments = [
  '--ignore-path',
  'null',
] as const satisfies readonly string[]

export const defaultExecOptions = {
  cwd: path.join(__dirname, '..'),
  encoding: 'utf-8',
} as const satisfies ExecOptionsWithStringEncoding

// TODO: Fix error messages in tests.
/**
 * @todo Fix error messages in tests.
 */
export const runPrettierCLI = async (
  CLIArguments: readonly string[] = [],
  execOptions?: Partial<ExecOptionsWithStringEncoding>,
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
      error.message = stripVTControlCharacters(error.message)
    }

    throw error
  }
}

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
   * Path to the file to be formatted.
   */
  fileToBeFormatted: string
}
