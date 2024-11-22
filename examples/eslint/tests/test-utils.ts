import type { ExecFileOptionsWithStringEncoding } from 'node:child_process'
import * as childProcess from 'node:child_process'
import { promisify } from 'node:util'

export const execFile = promisify(childProcess.execFile)

export const cliCommand = 'eslint'

export const execFileOptions = {
  encoding: 'utf-8',
  shell: true,
} as const satisfies ExecFileOptionsWithStringEncoding

/**
 * Represents the context for a local test.
 *
 * @internal
 */
export type LocalTestContext = {
  /**
   * Path to the file to be linted.
   */
  fileToBeLinted: string
}
