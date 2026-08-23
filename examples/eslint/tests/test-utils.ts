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
 * The CLI executable invoked by {@linkcode runESLintCLI()}.
 *
 * @internal
 */
export const defaultCLICommand = 'eslint'

/**
 * Arguments prepended to every {@linkcode runESLintCLI()} invocation.
 *
 * @internal
 */
export const defaultCLIArguments = [] as const satisfies readonly string[]

/**
 * The options {@linkcode runESLintCLI()} passes to {@linkcode exec} unless
 * overridden, rooted at the example project directory.
 *
 * @internal
 */
export const defaultExecOptions = {
  cwd: path.join(__dirname, '..'),
  encoding: 'utf-8',
} as const satisfies ExecOptionsWithStringEncoding

/**
 * Runs the real `eslint` CLI so tests can assert on its actual output.
 *
 * @param [CLIArguments=[]] - **Optional** arguments appended after {@linkcode defaultCLIArguments}.
 * @param [execOptions={}] - **Optional** overrides merged over {@linkcode defaultExecOptions}.
 * @returns A {@linkcode Promise | promise} that resolves with the `stdout` and `stderr` of the command, and rejects if it exits with a non-zero code.
 *
 * @internal
 */
export const runESLintCLI = (
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
   * Path to the file to be linted.
   */
  fileToBeLinted: string
}

/**
 * Any function with unknown arguments.
 *
 * @internal
 */
export type UnknownFunction = (...args: unknown[]) => unknown

/**
 * An alias for **`NonNullable<unknown>`**, which represents any value that is
 * **not** `null` or `undefined`. It is mostly used for semantic purposes, to
 * distinguish between the empty object type **`{}`** and any non-nullish
 * value, as they are not the same.
 *
 * @internal
 */
export type AnyNonNullishValue = NonNullable<unknown>

/**
 * Useful to flatten the type output to improve type hints shown in editors.
 * And also to transform an
 * {@linkcode https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces | interface}
 * into a
 * {@linkcode https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases | type}
 * to aid with assignability.
 *
 * @example
 * <caption>Basic usage</caption>
 *
 * ```ts
 * import type { Simplify } from './typeHelpers.js';
 *
 * interface SomeInterface {
 *   bar?: string;
 *   baz: number | undefined;
 *   foo: number;
 * }
 *
 * type SomeType = {
 *   bar?: string;
 *   baz: number | undefined;
 *   foo: number;
 * };
 *
 * const literal = {
 *   bar: 'hello',
 *   baz: 456,
 *   foo: 123,
 * } as const satisfies SomeType satisfies SomeInterface;
 *
 * const someType: SomeType = literal;
 * const someInterface: SomeInterface = literal;
 *
 * function fn(object: Record<string, unknown>): void {
 *   console.log(object);
 * }
 *
 * fn(literal); // ✅ Good: literal object type is sealed
 * fn(someType); // ✅ Good: type is sealed
 * // @ts-expect-error
 * fn(someInterface); // ❌ Error: Index signature for type 'string' is missing in type 'SomeInterface'. Because `interface` can be re-opened
 * fn(someInterface as Simplify<SomeInterface>); // ✅ Good: transform an `interface` into a `type`
 * ```
 *
 * @template BaseType - The type to simplify.
 *
 * @see {@link https://github.com/sindresorhus/type-fest/blob/548e7dfdbc8a70767cd278c0ec8512aef6e16b56/source/simplify.d.ts | Source}
 * @see {@link https://github.com/microsoft/TypeScript/issues/15300 | TypeScript Issue}
 * @internal
 */
export type Simplify<BaseType> = BaseType extends (...args: never[]) => unknown
  ? BaseType
  : NonNullable<unknown> & {
      [KeyType in keyof BaseType]: BaseType[KeyType]
    }
