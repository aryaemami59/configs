import { exec as _exec } from 'node:child_process'
import { promisify } from 'node:util'

export const exec = promisify(_exec)

export const cli = `prettier --check --ignore-path null`

/**
 * Represents the context for a local test.
 *
 * @internal
 */
export type LocalTestContext = {
  /**
   * Temporary directory path which houses the file to be formatted.
   */
  tempDirectory: string

  /**
   * Path to the file to be formatted.
   */
  fileToBeFormatted: string
}
