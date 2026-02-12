import type { ExecOptionsWithStringEncoding } from 'node:child_process'
import * as childProcess from 'node:child_process'
import * as path from 'node:path'
import { promisify } from 'node:util'

export const exec = promisify(childProcess.exec)

export const defaultCLICommand = 'eslint'

export const defaultCLIArguments = [] as const satisfies readonly string[]

export const defaultExecOptions = {
  cwd: path.join(__dirname, '..'),
  encoding: 'utf-8',
} as const satisfies ExecOptionsWithStringEncoding

export const runESLintCLI = (
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
   * Path to the file to be linted.
   */
  fileToBeLinted: string
}

/**
 * Any function with unknown arguments.
 *
 * @internal
 */
type UnknownFunction = (...args: unknown[]) => unknown

/**
 * An alias for type `{}`. Represents any value that is not `null` or `undefined`.
 * It is mostly used for semantic purposes to help distinguish between an
 * empty object type and `{}` as they are not the same.
 *
 * @internal
 */
type AnyNonNullishValue = NonNullable<unknown>

/**
 * Useful to flatten the type output to improve type hints shown in editors.
 * And also to transform an interface into a type to aide with assignability.
 *
 * @see {@link https://github.com/sindresorhus/type-fest/blob/main/source/simplify.d.ts Source}
 * @internal
 */
export type Simplify<T> = T extends UnknownFunction
  ? T
  : {
      [KeyType in keyof T]: T[KeyType]
    } & AnyNonNullishValue
