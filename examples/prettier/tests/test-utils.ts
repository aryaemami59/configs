import type { ExecFileOptions } from 'node:child_process'
import * as childProcess from 'node:child_process'
import * as path from 'node:path'
import { promisify, stripVTControlCharacters } from 'node:util'

export const execFile = promisify(childProcess.execFile)

export const defaultCLICommand = 'prettier'

export const defaultCLIArguments = [
  '--ignore-path',
  'null',
] as const satisfies readonly string[]

export const defaultExecFileOptions = {
  cwd: path.join(__dirname, '..'),
  encoding: 'utf-8',
  shell: true,
} as const satisfies ExecFileOptions

// TODO: Fix error messages in tests.
/**
 * @todo Fix error messages in tests.
 */
export const runPrettierCLI = async (
  CLIArguments: readonly string[] = [],
  execFileOptions?: Partial<ExecFileOptions>,
) => {
  try {
    const execFileResults = await execFile(
      defaultCLICommand,
      [...defaultCLIArguments, ...CLIArguments],
      {
        ...defaultExecFileOptions,
        ...execFileOptions,
      },
    )

    const { stdout, stderr } = execFileResults

    if (stdout) {
      console.log(stdout)
    }

    if (stderr) {
      console.error(stderr)
    }

    return execFileResults
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
