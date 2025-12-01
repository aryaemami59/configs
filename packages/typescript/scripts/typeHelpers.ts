/**
 * Any function with **`unknown`** arguments.
 * You probably want this instead of {@linkcode Function}.
 *
 * @example
 * <caption>Basic usage</caption>
 *
 * ```ts
 * const fn: UnknownFunction = (...args) => args.length;
 * ```
 *
 * @internal
 */
export type UnknownFunction = (...args: unknown[]) => unknown

/**
 * An alias for type **`{}`**. Represents any value that is not
 * **`null`** or **`undefined`**. It is mostly used for semantic purposes to
 * help distinguish between an empty object type and **`{}`**
 * as they are not the same.
 *
 * @internal
 */
export type AnyNonNullishValue = NonNullable<unknown>

/**
 * Useful to flatten the type output to improve type hints shown in editors.
 * And also to transform an interface into a type to aide with assignability.
 *
 * @example
 * <caption>Basic usage</caption>
 *
 * ```ts
 * interface SomeInterface {
 *   foo: number;
 *   bar?: string;
 *   baz: number | undefined;
 * }
 *
 * type SomeType = {
 *   foo: number;
 *   bar?: string;
 *   baz: number | undefined;
 * };
 *
 * const literal = { foo: 123, bar: 'hello', baz: 456 };
 * const someType: SomeType = literal;
 * const someInterface: SomeInterface = literal;
 *
 * declare function fn(object: Record<string, unknown>): void;
 *
 * fn(literal); // Good: literal object type is sealed
 * fn(someType); // Good: type is sealed
 * // @ts-expect-error
 * fn(someInterface); // Error: Index signature for type 'string' is missing in type 'someInterface'. Because `interface` can be re-opened
 * fn(someInterface as Simplify<SomeInterface>); // Good: transform an `interface` into a `type`
 * ```
 *
 * @template BaseType - The type to simplify.
 *
 * @see {@link https://github.com/sindresorhus/type-fest/blob/2300245cb6f0b28ee36c2bb852ade872254073b8/source/simplify.d.ts Source}
 * @see {@link https://github.com/microsoft/TypeScript/issues/15300 | TypeScript Issue}
 * @internal
 */
export type Simplify<BaseType> = BaseType extends BaseType
  ? AnyNonNullishValue & {
      [KeyType in keyof BaseType]: BaseType[KeyType]
    }
  : never

/**
 * Omits keys from a type, **distributing** the operation over a union.
 * TypeScript's {@linkcode Omit} does **not** distribute over unions,
 * which can lead to the erasure of unique properties from union members
 * when omitting keys. This causes the resulting type to retain only
 * properties common to all union members, making it impossible to access
 * member-specific properties after using {@linkcode Omit}.
 * In other words, using {@linkcode Omit} on a union merges its members into
 * a less specific type, breaking type narrowing and property access based
 * on discriminants. This utility solves that limitation by applying
 * {@linkcode Omit} distributively to each union member.
 *
 * @example
 * <caption>Demonstrating `Omit` vs `DistributedOmit`</caption>
 *
 * ```ts
 * type A = {
 *   discriminant: 'A';
 *   foo: string;
 *   a: number;
 * };
 *
 * type B = {
 *   discriminant: 'B';
 *   foo: string;
 *   b: string;
 * };
 *
 * type Union = A | B;
 *
 * type OmittedUnion = Omit<Union, 'foo'>;
 * // => { discriminant: 'A' | 'B' }
 *
 * const omittedUnion: OmittedUnion = createOmittedUnion();
 *
 * if (omittedUnion.discriminant === 'A') {
 *   // We would like to narrow `omittedUnion`'s type to `A` here,
 *   // but we can't because `Omit` doesn't distribute over unions.
 *
 *   omittedUnion.a;
 *   // => Error: Property 'a' does not exist on type '{ discriminant: "A" | "B" }'
 * }
 * ```
 *
 * @template ObjectType - The base object or union type to omit properties from.
 * @template KeyType - The keys of {@linkcode ObjectType} to omit.
 * @internal
 */
export type DistributedOmit<
  ObjectType,
  KeyType extends keyof ObjectType,
> = ObjectType extends unknown ? Omit<ObjectType, KeyType> : never

export type ExtractStrict<
  T,
  U extends [U] extends [
    // Ensure every member of `U` extracts something from `T`
    U extends unknown ? (Extract<T, U> extends never ? never : U) : never,
  ]
    ? unknown
    : T,
> = Extract<T, U>

export type ExcludeStrict<
  T,
  U extends [U] extends [
    // Ensure every member of `U` excludes something from `T`
    U extends unknown ? ([T] extends [Exclude<T, U>] ? never : U) : never,
  ]
    ? unknown
    : T,
> = Exclude<T, U>

export type KebabCase<
  StringType extends string,
  FirstRun extends boolean = true,
> = StringType extends `${infer FirstLetter}${infer Rest}`
  ? `${FirstLetter extends Lowercase<FirstLetter>
      ? FirstLetter extends `${number}`
        ? Rest extends `${number}`
          ? '-'
          : ''
        : ''
      : FirstRun extends true
        ? ''
        : '-'}${Lowercase<FirstLetter>}${KebabCase<Rest, false>}`
  : StringType

export type ExtractLowercase<StringType extends string> =
  StringType extends Lowercase<StringType> ? StringType : never

export type ExtractCapitalized<StringType extends string> =
  StringType extends Capitalize<StringType> ? StringType : never

export type StringLiteralUnion<StringType extends string> =
  StringType extends StringType
    ? StringType | (string & AnyNonNullishValue)
    : never
