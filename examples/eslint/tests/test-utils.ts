import { exec as _exec } from 'node:child_process'
import { promisify } from 'node:util'

export const exec = promisify(_exec)

export const cli = `eslint --no-ignore`

/**
 * Represents the context for a local test.
 *
 * @internal
 */
export interface LocalTestContext {
  /**
   * Path to the file to be linted.
   */
  fileToBeLinted: string
}
