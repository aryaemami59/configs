import { exec as _exec } from 'node:child_process'
import { promisify } from 'node:util'

export const exec = promisify(_exec)

export const cli = `tsc -p`

/**
 * Represents the context for a local test.
 *
 * @internal
 */
export interface LocalTestContext {
  /**
   * Temporary directory path which houses the file to be type checked.
   */
  tempDirectory: string

  /**
   * Path to the file to be type checked.
   */
  fileToGetTypeChecked: string
}
