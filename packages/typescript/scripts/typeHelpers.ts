/**
 * Any function with **`unknown`** arguments.
 * You probably want this instead of {@linkcode Function}.
 *
 * @example
 * <caption>Basic usage</caption>
 *
 * ```ts
 * const fn = ((...args) => args.length) satisfies UnknownFunction;
 * ```
 *
 * @since v0.0.6 of **`@aryaemami59/tsconfig`**
 * @internal
 */
export type UnknownFunction = (...args: unknown[]) => unknown

/**
 * An alias for **`NonNullable<unknown>`**, which represents any value that is
 * **not** `null` or `undefined`. This is primarily a semantic helper used to
 * distinguish between:
 *
 * - the empty object type **`{}`**, which accepts all non-nullish values but
 *   conveys an “object-like” intent, and
 * - **`NonNullable<unknown>`**, which explicitly means “any non-nullish value,”
 *   including primitives.
 *
 * @example
 * <caption>Basic usage</caption>
 *
 * ```ts
 * // ✅ OK
 * const a = 123 as const satisfies AnyNonNullishValue;
 * const b = "hello" as const satisfies AnyNonNullishValue;
 * const c = true as const satisfies AnyNonNullishValue;
 * const d = {} as const satisfies AnyNonNullishValue;
 * const e = [] as const satisfies AnyNonNullishValue;
 * const f = (() => {
 *   console.log("hi");
 * }) satisfies AnyNonNullishValue;
 * const g = Symbol("x") satisfies AnyNonNullishValue;
 *
 * // ❌ Error
 * // @ts-expect-error
 * const h = null satisfies AnyNonNullishValue;
 * // @ts-expect-error
 * const i = undefined satisfies AnyNonNullishValue;
 * ```
 *
 * @since v0.0.6 of **`@aryaemami59/tsconfig`**
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
 *   bar: "hello",
 *   baz: 456,
 *   foo: 123,
 * } as const satisfies SomeType satisfies SomeInterface;
 *
 * const someType: SomeType = literal;
 * const someInterface: SomeInterface = literal;
 *
 * function fn(object: Record<string, unknown>): void {
 *   console.log(object);
 * };
 *
 * fn(literal); // ✅ Good: literal object type is sealed
 * fn(someType); // ✅ Good: type is sealed
 * // @ts-expect-error
 * fn(someInterface); // ❌ Error: Index signature for type "string" is missing in type "someInterface". Because `interface` can be re-opened
 * fn(someInterface as Simplify<SomeInterface>); // ✅ Good: transform an `interface` into a `type`
 * ```
 *
 * @template BaseType - The type to simplify.
 *
 * @see {@link https://github.com/sindresorhus/type-fest/blob/2300245cb6f0b28ee36c2bb852ade872254073b8/source/simplify.d.ts Source}
 * @see {@link https://github.com/microsoft/TypeScript/issues/15300 | TypeScript Issue}
 * @since v0.0.6 of **`@aryaemami59/tsconfig`**
 * @internal
 */
export type Simplify<BaseType> = BaseType extends BaseType
  ? BaseType extends UnknownFunction
    ? BaseType
    : AnyNonNullishValue & {
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
 *   a: number;
 *   discriminant: "A";
 *   foo: string;
 * };
 *
 * type B = {
 *   b: string;
 *   discriminant: "B";
 *   foo: string;
 * };
 *
 * type Union = A | B;
 *
 * const omittedUnion: Omit<Union, "foo"> = {
 *   discriminant: "A",
 * };
 *
 * if (omittedUnion.discriminant === "A") {
 *   // We would like to narrow `omittedUnion`'s type to `A` here,
 *   // but we can't because `Omit` doesn't distribute over unions.
 *
 *   // @ts-expect-error
 *   omittedUnion.a;
 *   // => ❌ Error: Property 'a' does not exist on type '{ discriminant: "A" | "B" }'
 * }
 *
 * const distributedOmittedUnion: DistributedOmit<Union, "foo"> = {
 *   a: 123,
 *   discriminant: "A",
 * };
 *
 * if (distributedOmittedUnion.discriminant === "A") {
 *   // We can successfully narrow `distributedOmittedUnion`'s type to `A` here,
 *   // because `DistributedOmit` distributes over unions.
 *
 *   distributedOmittedUnion.a;
 *   // => ✅ OK
 * }
 * ```
 *
 * @template ObjectType - The base object or union type to omit properties from.
 * @template KeyType - The keys of {@linkcode ObjectType} to omit.
 * @since v0.0.6 of **`@aryaemami59/tsconfig`**
 * @internal
 */
export type DistributedOmit<
  ObjectType,
  KeyType extends keyof ObjectType,
> = ObjectType extends unknown ? Omit<ObjectType, KeyType> : never

/**
 * Picks keys from a type, **distributing** the operation over a union.
 * TypeScript's {@linkcode Pick} does **not** distribute over unions,
 * which can lead to the erasure of unique properties from union members
 * when picking keys. This causes the resulting type to retain only
 * properties common to all union members, making it impossible to access
 * member-specific properties after using {@linkcode Pick}.
 * In other words, using {@linkcode Pick} on a union merges its members into
 * a less specific type, breaking type narrowing and property access based
 * on discriminants. This utility solves that limitation by applying
 * {@linkcode Pick} distributively to each union member.
 *
 * @example
 * <caption>Demonstrating `Pick` vs `DistributedPick`</caption>
 *
 * ```ts
 * type A = {
 *   discriminant: "A";
 *   extraneous: boolean;
 *   foo: {
 *     bar: string;
 *   };
 * };
 *
 * type B = {
 *   discriminant: "B";
 *   extraneous: boolean;
 *   foo: {
 *     baz: string;
 *   };
 * };
 *
 * // Notice that `foo.bar` exists in `A` but not in `B`.
 *
 * type Union = A | B;
 *
 * const pickedUnion: Pick<Union, "discriminant" | "foo"> = {
 *   discriminant: "A",
 *   foo: {
 *     bar: "",
 *   },
 * };
 *
 * if (pickedUnion.discriminant === "A") {
 *   // We would like to narrow to `A` here,
 *   // but we can't because `Pick` doesn't distribute over unions.
 *
 *   // @ts-expect-error
 *   pickedUnion.foo.bar;
 *   //=> ❌ Error: Property 'bar' does not exist on type '{ bar: string; } | { baz: string; }'.
 *
 *   // @ts-expect-error
 *   pickedUnion.extraneous;
 *   //=> ❌ Error: Property 'extraneous' does not exist on type 'Pick<Union, "discriminant" | "foo">'.
 *
 *   // @ts-expect-error
 *   pickedUnion.foo.baz;
 *   // => ❌ Error: Property 'baz' does not exist on type '{ bar: string; } | { baz: string; }'.
 * }
 *
 * const distributedPickedUnion: DistributedPick<Union, "discriminant" | "foo"> = {
 *   discriminant: "A",
 *   foo: {
 *     bar: "",
 *   },
 * };
 *
 * if (distributedPickedUnion.discriminant === "A") {
 *   // Narrowing works correctly because the pick is applied per union member.
 *
 *   distributedPickedUnion.foo.bar;
 *   // => ✅ OK
 *
 *   // @ts-expect-error
 *   distributedPickedUnion.extraneous;
 *   //=> ❌ Error: Property 'extraneous' does not exist on type 'Pick<A, "discriminant" | "foo">'.
 *
 *   // @ts-expect-error
 *   distributedPickedUnion.foo.baz;
 *   //=> ❌ Error: Property 'baz' does not exist on type '{ bar: string; }'.
 * }
 * ```
 *
 * @template ObjectType - The base object or union type to pick properties from.
 * @template KeyType - The keys of {@linkcode ObjectType} to pick.
 * @since v0.0.6 of **`@aryaemami59/tsconfig`**
 * @internal
 */
export type DistributedPick<
  ObjectType,
  KeyType extends keyof ObjectType,
> = ObjectType extends unknown ? Pick<ObjectType, KeyType> : never

/**
 * A stricter version of
 * {@linkcode Extract | Extract<BaseType, TypeToExtract>} that ensures
 * every member of {@linkcode TypeToExtract} can successfully extract
 * something from {@linkcode BaseType}.
 *
 * @example
 * <caption>Basic Usage</caption>
 *
 * ```ts
 * type Example = ExtractStrict<"l" | "m" | "s" | "xl" | "xs", "s" | "xs">;
 * //=> "s" | "xs"
 * ```
 *
 * @template BaseType - The base type to extract from.
 * @template TypeToExtract - The type(s) to extract from {@linkcode BaseType}.
 * @since v0.0.6 of **`@aryaemami59/tsconfig`**
 * @internal
 */
export type ExtractStrict<
  BaseType,
  TypeToExtract extends [TypeToExtract] extends [
    TypeToExtract extends unknown
      ? Extract<BaseType, TypeToExtract> extends never
        ? never
        : TypeToExtract
      : never,
  ]
    ? unknown
    : BaseType,
> = Extract<BaseType, TypeToExtract>

/**
 * A stricter version of
 * {@linkcode Exclude | Exclude<BaseType, TypesToExclude>} that ensures
 * every member of {@linkcode TypesToExclude} can successfully exclude
 * something from {@linkcode BaseType}.
 *
 * @example
 * <caption>Basic Usage</caption>
 *
 * ```ts
 * type Example = ExcludeStrict<"l" | "m" | "s" | "xl" | "xs", "s" | "xs">;
 * //=> "l" | "m" | "xl"
 * ```
 *
 * @template BaseType - The base type to exclude from.
 * @template TypesToExclude - The type(s) to exclude from {@linkcode BaseType}.
 * @since v0.0.6 of **`@aryaemami59/tsconfig`**
 * @internal
 */
export type ExcludeStrict<
  BaseType,
  TypesToExclude extends [TypesToExclude] extends [
    TypesToExclude extends unknown
      ? [BaseType] extends [Exclude<BaseType, TypesToExclude>]
        ? never
        : TypesToExclude
      : never,
  ]
    ? unknown
    : BaseType,
> = Exclude<BaseType, TypesToExclude>

/**
 * Convert a string literal to kebab-case.
 *
 * @example
 * <caption>Basic usage</caption>
 *
 * ```ts
 * const someVariable = "foo-bar" as const satisfies KebabCase<"fooBar">;
 * ```
 *
 * @template StringType - The string literal type to convert to kebab-case.
 * @template FirstRun - Internal helper to avoid prefixing the first character with a hyphen.
 * @since v0.0.6 of **`@aryaemami59/tsconfig`**
 * @internal
 * @see {@link https://stackoverflow.com/a/66140779 Source}
 */
export type KebabCase<
  StringType extends string,
  FirstRun extends boolean = true,
> = StringType extends `${infer FirstCharacter}${infer RemainingString}`
  ? `${FirstCharacter extends Lowercase<FirstCharacter>
      ? FirstCharacter extends `${number}`
        ? RemainingString extends `${number}`
          ? '-'
          : ''
        : ''
      : FirstRun extends true
        ? ''
        : '-'}${Lowercase<FirstCharacter>}${KebabCase<RemainingString, false>}`
  : StringType

/**
 * Extracts only the **lowercase** string literal members from a given string
 * literal type. This is especially useful when you have a union that mixes
 * lowercase and capitalized variants and you want to keep only the canonical
 * lowercase ones.
 *
 * @example
 * <caption>Basic usage</caption>
 *
 * ```ts
 * type ModuleResolution =
 *   | "bundler"
 *   | "Bundler"
 *   | "classic"
 *   | "Classic"
 *   | "node"
 *   | "Node"
 *   | "node10"
 *   | "Node10"
 *   | "node16"
 *   | "Node16"
 *   | "nodenext"
 *   | "NodeNext";
 *
 * type LowercaseModuleResolution = ExtractLowercase<ModuleResolution>;
 * //   ^? "bundler" | "classic" | "node" | "node10" | "node16" | "nodenext"
 * ```
 *
 * @template StringType - A string literal type to filter.
 * @see {@linkcode Lowercase} - The built-in utility used to test lowercase values.
 * @since v0.0.6 of **`@aryaemami59/tsconfig`**
 * @internal
 */
export type ExtractLowercase<StringType extends string> =
  StringType extends Lowercase<StringType> ? StringType : never

/**
 * Extracts only the **capitalized** (PascalCase-style) string literal members
 * from a given string literal type. Each member of {@linkcode StringType} is
 * evaluated using TypeScript's {@linkcode Capitalize} helper, and only those
 * that are already capitalized are retained. All others resolve to `never`,
 * effectively filtering them out of a union.
 *
 * @example
 * <caption>Basic usage</caption>
 *
 * ```ts
 * type ModuleResolution =
 *   | "bundler"
 *   | "Bundler"
 *   | "classic"
 *   | "Classic"
 *   | "node"
 *   | "Node"
 *   | "node10"
 *   | "Node10"
 *   | "node16"
 *   | "Node16"
 *   | "nodenext"
 *   | "NodeNext";
 *
 * type CapitalizedModuleResolution = ExtractCapitalized<ModuleResolution>;
 * //   ^? "Bundler" | "Classic" | "Node" | "Node10" | "Node16" | "NodeNext"
 * ```
 *
 * @template StringType - The string literal type to filter.
 * @see {@linkcode Capitalize} - The built-in utility used to test capitalization.
 * @since v0.0.6 of **`@aryaemami59/tsconfig`**
 * @internal
 */
export type ExtractCapitalized<StringType extends string> =
  StringType extends Capitalize<StringType> ? StringType : never

/**
 * Produces a **widened string type** that still preserves autocomplete for the
 * provided string literal union. Given a union of string literals, this utility
 * returns a type that:
 *
 * - retains all literal members of {@linkcode StringType}, and
 * - widens the union to `string & AnyNonNullishValue` to allow arbitrary
 *   user-provided strings while still supporting IDE completions for the known
 *   literals.
 *
 * This pattern is commonly used in configuration APIs where known literal
 * options are suggested but custom strings must also be allowed.
 *
 * @example
 * <caption>Preserving autocomplete while allowing any string</caption>
 *
 * ```ts
 * type JsxFactory = StringLiteralUnion<"React.createElement">;
 * //   ^? "React.createElement" | (string & {})
 *
 * const a = "React.createElement" as const satisfies JsxFactory; // ✅ OK — literal member
 * const b = "h" as const satisfies JsxFactory; // ✅ OK — arbitrary string allowed
 * ```
 *
 * @template StringType - The string literal union to widen.
 * @since v0.0.6 of **`@aryaemami59/tsconfig`**
 * @internal
 */
export type StringLiteralUnion<StringType extends string> =
  StringType extends StringType
    ? (string & AnyNonNullishValue) | StringType
    : never
