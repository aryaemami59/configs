export type CompilerOptions = {
  /**
   * In TypeScript 5.0, when an import path ends in an extension that isn't a known JavaScript or TypeScript file extension, the compiler will look for a declaration file for that path in the form of `{file basename}.d.{extension}.ts`.
   * For example, if you are using a CSS loader in a bundler project, you might want to write (or generate) declaration files for those stylesheets:
   *
   * ```css
   * \/* app.css *\/
   * .cookie-banner {
   *   display: none;
   * }
   * ```
   *
   * ```ts
   * // app.d.css.ts
   * declare const css: {
   *   cookieBanner: string;
   * };
   * export default css;
   * ```
   *
   * ```ts
   * // App.tsx
   * import styles from "./app.css";
   *
   * styles.cookieBanner; // string
   * ```
   *
   * By default, this import will raise an error to let you know that TypeScript doesn't understand this file type and your runtime might not support importing it.
   * But if you've configured your runtime or bundler to handle it, you can suppress the error with the new `--allowArbitraryExtensions` compiler option.
   *
   * Note that historically, a similar effect has often been achievable by adding a declaration file named `app.css.d.ts` instead of `app.d.css.ts` - however, this just worked through Node's `require` resolution rules for CommonJS.
   * Strictly speaking, the former is interpreted as a declaration file for a JavaScript file named `app.css.js`.
   * Because relative files imports need to include extensions in Node's ESM support, TypeScript would error on our example in an ESM file under `--moduleResolution node16` or `nodenext`.
   *
   * For more information, read up [the proposal for this feature](https://github.com/microsoft/TypeScript/issues/50133) and [its corresponding pull request](https://github.com/microsoft/TypeScript/pull/51435).
   */
  allowArbitraryExtensions?: boolean

  /**
   * `--allowImportingTsExtensions` allows TypeScript files to import each other with a TypeScript-specific extension like `.ts`, `.mts`, or `.tsx`.
   *
   * This flag is only allowed when `--noEmit` or `--emitDeclarationOnly` is enabled, since these import paths would not be resolvable at runtime in JavaScript output files.
   * The expectation here is that your resolver (e.g. your bundler, a runtime, or some other tool) is going to make these imports between `.ts` files work.
   */
  allowImportingTsExtensions?: boolean

  /**
   * Allow JavaScript files to be imported inside your project, instead of just `.ts` and `.tsx` files. For example, this JS file:
   *
   * ```js twoslash
   * // @filename: card.js
   * export const defaultCardDeck = "Heart";
   * ```
   *
   * When imported into a TypeScript file will raise an error:
   *
   * ```ts twoslash
   * // @errors: 2307
   * // @filename: card.js
   * module.exports.defaultCardDeck = "Heart";
   * // ---cut---
   * // @filename: index.ts
   * import { defaultCardDeck } from "./card";
   *
   * console.log(defaultCardDeck);
   * ```
   *
   * Imports fine with `allowJs` enabled:
   *
   * ```ts twoslash
   * // @filename: card.js
   * module.exports.defaultCardDeck = "Heart";
   * // ---cut---
   * // @allowJs
   * // @filename: index.ts
   * import { defaultCardDeck } from "./card";
   *
   * console.log(defaultCardDeck);
   * ```
   *
   * This flag can be used as a way to incrementally add TypeScript files into JS projects by allowing the `.ts` and `.tsx` files to live along-side existing JavaScript files.
   *
   * It can also be used along-side [`declaration`](https://typescriptlang.org/tsconfig/#declaration) and [`emitDeclarationOnly`](https://typescriptlang.org/tsconfig/#emitDeclarationOnly) to [create declarations for JS files](https://typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html).
   *
   * @default false
   */
  allowJs?: boolean

  /**
   * When set to true, `allowSyntheticDefaultImports` allows you to write an import like:
   *
   * ```ts
   * import React from "react";
   * ```
   *
   * instead of:
   *
   * ```ts
   * import * as React from "react";
   * ```
   *
   * When the module **does not** explicitly specify a default export.
   *
   * For example, without `allowSyntheticDefaultImports` as true:
   *
   * ```ts twoslash
   * // @errors: 1259 1192
   * // @checkJs
   * // @allowJs
   * // @esModuleInterop: false
   * // @filename: utilFunctions.js
   * // @noImplicitAny: false
   * const getStringLength = (str) => str.length;
   *
   * module.exports = {
   *   getStringLength,
   * };
   *
   * // @filename: index.ts
   * import utils from "./utilFunctions";
   *
   * const count = utils.getStringLength("Check JS");
   * ```
   *
   * This code raises an error because there isn't a `default` object which you can import. Even though it feels like it should.
   * For convenience, transpilers like Babel will automatically create a default if one isn't created. Making the module look a bit more like:
   *
   * ```js
   * // @filename: utilFunctions.js
   * const getStringLength = (str) => str.length;
   * const allFunctions = {
   *   getStringLength,
   * };
   *
   * module.exports = allFunctions;
   * module.exports.default = allFunctions;
   * ```
   *
   * This flag does not affect the JavaScript emitted by TypeScript, it's only for the type checking.
   * This option brings the behavior of TypeScript in-line with Babel, where extra code is emitted to make using a default export of a module more ergonomic.
   */
  allowSyntheticDefaultImports?: boolean

  /**
   * When set to true, `allowUmdGlobalAccess` lets you access UMD exports as globals from inside module files. A module file is a file that has imports and/or exports. Without this flag, using an export from a UMD module requires an import declaration.
   *
   * An example use case for this flag would be a web project where you know the particular library (like jQuery or Lodash) will always be available at runtime, but you can’t access it with an import.
   *
   * @default false
   */
  allowUmdGlobalAccess?: boolean

  /**
   * When:
   *
   * - `undefined` (default) provide suggestions as warnings to editors
   * - `true` unreachable code is ignored
   * - `false` raises compiler errors about unreachable code
   *
   * These warnings are only about code which is provably unreachable due to the use of JavaScript syntax, for example:
   *
   * ```ts
   * function fn(n: number) {
   *   if (n > 5) {
   *     return true;
   *   } else {
   *     return false;
   *   }
   *   return true;
   * }
   * ```
   *
   * With `"allowUnreachableCode": false`:
   *
   * ```ts twoslash
   * // @errors: 7027
   * // @allowUnreachableCode: false
   * function fn(n: number) {
   *   if (n > 5) {
   *     return true;
   *   } else {
   *     return false;
   *   }
   *   return true;
   * }
   * ```
   *
   * This does not affect errors on the basis of code which _appears_ to be unreachable due to type analysis.
   */
  allowUnreachableCode?: boolean

  /**
   * When:
   *
   * - `undefined` (default) provide suggestions as warnings to editors
   * - `true` unused labels are ignored
   * - `false` raises compiler errors about unused labels
   *
   * Labels are very rare in JavaScript and typically indicate an attempt to write an object literal:
   *
   * ```ts twoslash
   * // @errors: 7028
   * // @allowUnusedLabels: false
   * function verifyAge(age: number) {
   *   // Forgot 'return' statement
   *   if (age > 18) {
   *     verified: true;
   *   }
   * }
   * ```
   */
  allowUnusedLabels?: boolean

  /**
   * Ensures that your files are parsed in the ECMAScript strict mode, and emit "use strict" for each source file.
   *
   * [ECMAScript strict](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Strict_mode) mode was introduced in ES5 and provides behavior tweaks to the runtime of the JavaScript engine to improve performance, and makes a set of errors throw instead of silently ignoring them.
   */
  alwaysStrict?: boolean

  /**
   * Have recompiles in '--incremental' and '--watch' assume that changes within a file will only affect files directly depending on it. Requires TypeScript version 3.8 or later.
   */
  assumeChangesOnlyAffectDirectDependencies?: boolean

  /**
   * Sets a base directory from which to resolve bare specifier module names. For example, in the directory structure:
   *
   * ```
   * project
   * ├── ex.ts
   * ├── hello
   * │   └── world.ts
   * └── tsconfig.json
   * ```
   *
   * With `"baseUrl": "./"`, TypeScript will look for files starting at the same folder as the `tsconfig.json`:
   *
   * ```ts
   * import { helloWorld } from "hello/world";
   *
   * console.log(helloWorld);
   * ```
   *
   * This resolution has higher priority than lookups from `node_modules`.
   *
   * This feature was designed for use in conjunction with AMD module loaders in the browser, and is not recommended in any other context. As of TypeScript 4.1, `baseUrl` is no longer required to be set when using [`paths`](https://typescriptlang.org/tsconfig/#paths).
   */
  baseUrl?: string

  /**
   * In prior versions of TypeScript, this controlled what encoding was used when reading text files from disk.
   * Today, TypeScript assumes UTF-8 encoding, but will correctly detect UTF-16 (BE and LE) or UTF-8 BOMs.
   */
  charset?: string

  /**
   * Works in tandem with [`allowJs`](https://typescriptlang.org/tsconfig/#allowJs). When `checkJs` is enabled then errors are reported in JavaScript files. This is
   * the equivalent of including `// @ts-check` at the top of all JavaScript files which are included in your project.
   *
   * For example, this is incorrect JavaScript according to the `parseFloat` type definition which comes with TypeScript:
   *
   * ```js
   * // parseFloat only takes a string
   * module.exports.pi = parseFloat(3.142);
   * ```
   *
   * When imported into a TypeScript module:
   *
   * ```ts twoslash
   * // @allowJs
   * // @filename: constants.js
   * module.exports.pi = parseFloat(3.142);
   *
   * // @filename: index.ts
   * import { pi } from "./constants";
   * console.log(pi);
   * ```
   *
   * You will not get any errors. However, if you turn on `checkJs` then you will get error messages from the JavaScript file.
   *
   * ```ts twoslash
   * // @errors: 2345
   * // @allowjs: true
   * // @checkjs: true
   * // @filename: constants.js
   * module.exports.pi = parseFloat(3.142);
   *
   * // @filename: index.ts
   * import { pi } from "./constants";
   * console.log(pi);
   * ```
   *
   * @default false
   */
  checkJs?: boolean

  /**
   * The `composite` option enforces certain constraints which make it possible for build tools (including TypeScript
   * itself, under `--build` mode) to quickly determine if a project has been built yet.
   *
   * When this setting is on:
   *
   * - The [`rootDir`](https://typescriptlang.org/tsconfig/#rootDir) setting, if not explicitly set, defaults to the directory containing the `tsconfig.json` file.
   *
   * - All implementation files must be matched by an [`include`](https://typescriptlang.org/tsconfig/#include) pattern or listed in the [`files`](https://typescriptlang.org/tsconfig/#files) array. If this constraint is violated, `tsc` will inform you which files weren't specified.
   *
   * - [`declaration`](https://typescriptlang.org/tsconfig/#declaration) defaults to `true`
   *
   * You can find documentation on TypeScript projects in [the handbook](https://www.typescriptlang.org/docs/handbook/project-references.html).
   *
   * @default true
   */
  composite?: boolean

  /**
   * `--customConditions` takes a list of additional [conditions](https://nodejs.org/api/packages.html#nested-conditions) that should succeed when TypeScript resolves from an [`exports`](https://nodejs.org/api/packages.html#exports) or [`imports`](https://nodejs.org/api/packages.html#imports) field of a `package.json`.
   * These conditions are added to whatever existing conditions a resolver will use by default.
   *
   * For example, when this field is set in a `tsconfig.json` as so:
   *
   * ```jsonc
   * {
   *     "compilerOptions": {
   *         "target": "es2022",
   *         "moduleResolution": "bundler",
   *         "customConditions": ["my-condition"]
   *     }
   * }
   * ```
   *
   * Any time an `exports` or `imports` field is referenced in `package.json`, TypeScript will consider conditions called `my-condition`.
   *
   * So when importing from a package with the following `package.json`
   *
   * ```jsonc
   * {
   *     // ...
   *     "exports": {
   *         ".": {
   *             "my-condition": "./foo.mjs",
   *             "node": "./bar.mjs",
   *             "import": "./baz.mjs",
   *             "require": "./biz.mjs"
   *         }
   *     }
   * }
   * ```
   *
   * TypeScript will try to look for files corresponding to `foo.mjs`.
   *
   * This field is only valid under the `node16`, `nodenext`, and `bundler` options for [`--moduleResolution`](https://typescriptlang.org/tsconfig/#moduleResolution).
   */
  customConditions?: string[]

  /**
   * Generate `.d.ts` files for every TypeScript or JavaScript file inside your project.
   * These `.d.ts` files are type definition files which describe the external API of your module.
   * With `.d.ts` files, tools like TypeScript can provide intellisense and accurate types for un-typed code.
   *
   * When `declaration` is set to `true`, running the compiler with this TypeScript code:
   *
   * ```ts twoslash
   * export let helloWorld = "hi";
   * ```
   *
   * Will generate an `index.js` file like this:
   *
   * ```ts twoslash
   * // @showEmit
   * export let helloWorld = "hi";
   * ```
   *
   * With a corresponding `helloWorld.d.ts`:
   *
   * ```ts twoslash
   * // @showEmittedFile: index.d.ts
   * // @showEmit
   * // @declaration
   * export let helloWorld = "hi";
   * ```
   *
   * When working with `.d.ts` files for JavaScript files you may want to use [`emitDeclarationOnly`](https://typescriptlang.org/tsconfig/#emitDeclarationOnly) or use [`outDir`](https://typescriptlang.org/tsconfig/#outDir) to ensure that the JavaScript files are not overwritten.
   *
   * @default false
   */
  declaration?: boolean

  /**
   * Offers a way to configure the root directory for where declaration files are emitted.
   *
   * ```
   * example
   * ├── index.ts
   * ├── package.json
   * └── tsconfig.json
   * ```
   *
   * with this `tsconfig.json`:
   *
   * ```json tsconfig
   * {
   *   "compilerOptions": {
   *     "declaration": true,
   *     "declarationDir": "./types"
   *   }
   * }
   * ```
   *
   * Would place the d.ts for the `index.ts` in a `types` folder:
   *
   * ```
   * example
   * ├── index.js
   * ├── index.ts
   * ├── package.json
   * ├── tsconfig.json
   * └── types
   *     └── index.d.ts
   * ```
   */
  declarationDir?: string

  /**
   * Generates a source map for `.d.ts` files which map back to the original `.ts` source file.
   * This will allow editors such as VS Code to go to the original `.ts` file when using features like _Go to Definition_.
   *
   * You should strongly consider turning this on if you're using project references.
   *
   * @default false
   */
  declarationMap?: boolean

  /**
   * Used to output diagnostic information for debugging. This command is a subset of [`extendedDiagnostics`](https://typescriptlang.org/tsconfig/#extendedDiagnostics) which are more user-facing results, and easier to interpret.
   *
   * If you have been asked by a TypeScript compiler engineer to give the results using this flag in a compile, in which there is no harm in using [`extendedDiagnostics`](https://typescriptlang.org/tsconfig/#extendedDiagnostics) instead.
   */
  diagnostics?: boolean

  /**
   * In multi-project TypeScript programs, TypeScript will load all of the available projects into memory in order to provide accurate results for editor responses which require a full knowledge graph like 'Find All References'.
   *
   * If your project is large, you can use the flag `disableReferencedProjectLoad` to disable the automatic loading of all projects. Instead, projects are loaded dynamically as you open files through your editor.
   */
  disableReferencedProjectLoad?: boolean

  /**
   * To avoid a possible memory bloat issues when working with very large JavaScript projects, there is an upper limit to the amount of memory TypeScript will allocate. Turning this flag on will remove the limit.
   *
   * @default false
   */
  disableSizeLimit?: boolean

  /**
   * When working with [composite TypeScript projects](https://typescriptlang.org/docs/handbook/project-references.html), this option provides a way to declare that you do not want a project to be included when using features like _find all references_ or _jump to definition_ in an editor.
   *
   * This flag is something you can use to increase responsiveness in large composite projects.
   */
  disableSolutionSearching?: boolean

  /**
   * When working with [composite TypeScript projects](https://typescriptlang.org/docs/handbook/project-references.html), this option provides a way to go [back to the pre-3.7](https://typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#build-free-editing-with-project-references) behavior where d.ts files were used to as the boundaries between modules.
   * In 3.7 the source of truth is now your TypeScript files.
   */
  disableSourceOfProjectReferenceRedirect?: boolean

  /**
   * Downleveling is TypeScript's term for transpiling to an older version of JavaScript.
   * This flag is to enable support for a more accurate implementation of how modern JavaScript iterates through new concepts in older JavaScript runtimes.
   *
   * ECMAScript 6 added several new iteration primitives: the `for / of` loop (`for (el of arr)`), Array spread (`[a, ...b]`), argument spread (`fn(...args)`), and `Symbol.iterator`.
   * `downlevelIteration` allows for these iteration primitives to be used more accurately in ES5 environments if a `Symbol.iterator` implementation is present.
   *
   * #### Example: Effects on `for / of`
   *
   * With this TypeScript code:
   *
   * ```ts twoslash
   * const str = "Hello!";
   * for (const s of str) {
   *   console.log(s);
   * }
   * ```
   *
   * Without `downlevelIteration` enabled, a `for / of` loop on any object is downleveled to a traditional `for` loop:
   *
   * ```ts twoslash
   * // @target: ES5
   * // @showEmit
   * const str = "Hello!";
   * for (const s of str) {
   *   console.log(s);
   * }
   * ```
   *
   * This is often what people expect, but it's not 100% compliant with ECMAScript iteration protocol.
   * Certain strings, such as emoji (😜), have a `.length` of 2 (or even more!), but should iterate as 1 unit in a `for-of` loop.
   * See [this blog post by Jonathan New](https://blog.jonnew.com/posts/poo-dot-length-equals-two) for a longer explanation.
   *
   * When `downlevelIteration` is enabled, TypeScript will use a helper function that checks for a `Symbol.iterator` implementation (either native or polyfill).
   * If this implementation is missing, you'll fall back to index-based iteration.
   *
   * ```ts twoslash
   * // @target: ES5
   * // @downlevelIteration
   * // @showEmit
   * const str = "Hello!";
   * for (const s of str) {
   *   console.log(s);
   * }
   * ```
   *
   * You can use [tslib](https://www.npmjs.com/package/tslib) via [`importHelpers`](https://typescriptlang.org/tsconfig/#importHelpers) to reduce the amount of inline JavaScript too:
   *
   * ```ts twoslash
   * // @target: ES5
   * // @downlevelIteration
   * // @importHelpers
   * // @showEmit
   * const str = "Hello!";
   * for (const s of str) {
   *   console.log(s);
   * }
   * ```
   *
   * **Note:** enabling `downlevelIteration` does not improve compliance if `Symbol.iterator` is not present in the runtime.
   *
   * #### Example: Effects on Array Spreads
   *
   * This is an array spread:
   *
   * ```js
   * // Make a new array whose elements are 1 followed by the elements of arr2
   * const arr = [1, ...arr2];
   * ```
   *
   * Based on the description, it sounds easy to downlevel to ES5:
   *
   * ```js
   * // The same, right?
   * const arr = [1].concat(arr2);
   * ```
   *
   * However, this is observably different in certain rare cases.
   *
   * For example, if a source array is missing one or more items (contains a hole), the spread syntax will replace each empty item with `undefined`, whereas `.concat` will leave them intact.
   *
   * ```js
   * // Make an array where the element at index 1 is missing
   * let arrayWithHole = ['a', , 'c'];
   * let spread = [...arrayWithHole];
   * let concatenated = [].concat(arrayWithHole);
   *
   * console.log(arrayWithHole)
   * // [ 'a', <1 empty item>, 'c' ]
   * console.log(spread)
   * // [ 'a', undefined, 'c' ]
   * console.log(concatenated)
   * // [ 'a', <1 empty item>, 'c' ]
   * ```
   *
   * Just as with `for / of`, `downlevelIteration` will use `Symbol.iterator` (if present) to more accurately emulate ES 6 behavior.
   *
   * @default false
   */
  downlevelIteration?: boolean

  /**
   * Controls whether TypeScript will emit a [byte order mark (BOM)](https://wikipedia.org/wiki/Byte_order_mark) when writing output files.
   * Some runtime environments require a BOM to correctly interpret a JavaScript files; others require that it is not present.
   * The default value of `false` is generally best unless you have a reason to change it.
   *
   * @default false
   */
  emitBOM?: boolean

  /**
   * _Only_ emit `.d.ts` files; do not emit `.js` files.
   *
   * This setting is useful in two cases:
   *
   * - You are using a transpiler other than TypeScript to generate your JavaScript.
   * - You are using TypeScript to only generate `d.ts` files for your consumers.
   *
   * @default false
   */
  emitDeclarationOnly?: boolean

  /**
   * Enables experimental support for emitting type metadata for decorators which works with the module [`reflect-metadata`](https://www.npmjs.com/package/reflect-metadata).
   *
   * For example, here is the TypeScript
   *
   * ```ts twoslash
   * // @experimentalDecorators
   * function LogMethod(target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
   *   console.log(target);
   *   console.log(propertyKey);
   *   console.log(descriptor);
   * }
   *
   * class Demo {
   *   @LogMethod
   *   public foo(bar: number) {
   *     // do nothing
   *   }
   * }
   *
   * const demo = new Demo();
   * ```
   *
   * With `emitDecoratorMetadata` not set to true (default) the emitted JavaScript is:
   *
   * ```ts twoslash
   * // @experimentalDecorators
   * // @showEmit
   * function LogMethod(target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
   *   console.log(target);
   *   console.log(propertyKey);
   *   console.log(descriptor);
   * }
   *
   * class Demo {
   *   @LogMethod
   *   public foo(bar: number) {
   *     // do nothing
   *   }
   * }
   *
   * const demo = new Demo();
   * ```
   *
   * With `emitDecoratorMetadata` set to true the emitted JavaScript is:
   *
   * ```ts twoslash
   * // @experimentalDecorators
   * // @showEmit
   * // @emitDecoratorMetadata
   * function LogMethod(target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
   *   console.log(target);
   *   console.log(propertyKey);
   *   console.log(descriptor);
   * }
   *
   * class Demo {
   *   @LogMethod
   *   public foo(bar: number) {
   *     // do nothing
   *   }
   * }
   *
   * const demo = new Demo();
   * ```
   */
  emitDecoratorMetadata?: boolean

  /**
   * Node.js [supports running TypeScript files directly](https://nodejs.org/api/typescript.html#type-stripping) as of v23.6;
   * however, only TypeScript-specific syntax that does not have runtime semantics are supported under this mode.
   * In other words, it must be possible to easily *erase* any TypeScript-specific syntax from a file, leaving behind a valid JavaScript file.
   *
   * That means the following constructs are not supported:
   *
   * * `enum` declarations
   * * `namespace`s and `module`s with runtime code
   * * parameter properties in classes
   * * Non-ECMAScript `import =` and `export =` assignments
   * * `<prefix>`-style type assertions
   *
   * ```ts
   * // ❌ error: An `import ... = require(...)` alias
   * import foo = require("foo");
   *
   * // ❌ error: A namespace with runtime code.
   * namespace container {
   *     foo.method();
   *
   *     export type Bar = string;
   * }
   *
   * // ❌ error: An `import =` alias
   * import Bar = container.Bar;
   *
   * class Point {
   *     // ❌ error: Parameter properties
   *     constructor(public x: number, public y: number) { }
   * }
   *
   * // ❌ error: An `export =` assignment.
   * export = Point;
   *
   * // ❌ error: An enum declaration.
   * enum Direction {
   *     Up,
   *     Down,
   *     Left,
   *     Right,
   * }
   *
   * // ❌ error: <prefix>-style type assertion.
   * const num = <number>1;
   * ```
   *
   * Similar tools like [ts-blank-space](https://github.com/bloomberg/ts-blank-space) or [Amaro](https://github.com/nodejs/amaro) (the underlying library for type-stripping in Node.js) have the same limitations.
   * These tools will provide helpful error messages if they encounter code that doesn't meet these requirements, but you still won't find out your code doesn't work until you actually try to run it.
   *
   * The `--erasableSyntaxOnly` flag will cause TypeScript to error on most TypeScript-specific constructs that have runtime behavior.
   *
   * ```ts
   * class C {
   *     constructor(public x: number) { }
   *     //          ~~~~~~~~~~~~~~~~
   *     // error! This syntax is not allowed when 'erasableSyntaxOnly' is enabled.
   * }
   * ```
   *
   * Typically, you will want to combine this flag with the `--verbatimModuleSyntax`, which ensures that a module contains the appropriate import syntax, and that import elision does not take place.
   *
   * @default false
   */
  erasableSyntaxOnly?: boolean

  /**
   * By default (with `esModuleInterop` false or not set) TypeScript treats CommonJS/AMD/UMD modules similar to ES6 modules. In doing this, there are two parts in particular which turned out to be flawed assumptions:
   *
   * - a namespace import like `import * as moment from "moment"` acts the same as `const moment = require("moment")`
   *
   * - a default import like `import moment from "moment"` acts the same as `const moment = require("moment").default`
   *
   * This mis-match causes these two issues:
   *
   * - the ES6 modules spec states that a namespace import (`import * as x`) can only be an object, by having TypeScript
   *   treating it the same as `= require("x")` then TypeScript allowed for the import to be treated as a function and be callable. That's not valid according to the spec.
   *
   * - while accurate to the ES6 modules spec, most libraries with CommonJS/AMD/UMD modules didn't conform as strictly as TypeScript's implementation.
   *
   * Turning on `esModuleInterop` will fix both of these problems in the code transpiled by TypeScript. The first changes the behavior in the compiler, the second is fixed by two new helper functions which provide a shim to ensure compatibility in the emitted JavaScript:
   *
   * ```ts
   * import * as fs from "fs";
   * import _ from "lodash";
   *
   * fs.readFileSync("file.txt", "utf8");
   * _.chunk(["a", "b", "c", "d"], 2);
   * ```
   *
   * With `esModuleInterop` disabled:
   *
   * ```ts twoslash
   * // @noErrors
   * // @showEmit
   * // @esModuleInterop: false
   * // @module: commonjs
   * import * as fs from "fs";
   * import _ from "lodash";
   *
   * fs.readFileSync("file.txt", "utf8");
   * _.chunk(["a", "b", "c", "d"], 2);
   * ```
   *
   * With `esModuleInterop` set to `true`:
   *
   * ```ts twoslash
   * // @noErrors
   * // @showEmit
   * // @esModuleInterop
   * // @module: commonjs
   * import * as fs from "fs";
   * import _ from "lodash";
   *
   * fs.readFileSync("file.txt", "utf8");
   * _.chunk(["a", "b", "c", "d"], 2);
   * ```
   *
   * _Note_: The namespace import `import * as fs from "fs"` only accounts for properties which [are owned](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty) (basically properties set on the object and not via the prototype chain) on the imported object. If the module you're importing defines its API using inherited properties, you need to use the default import form (`import fs from "fs"`), or disable `esModuleInterop`.
   *
   * _Note_: You can make JS emit terser by enabling [`importHelpers`](https://typescriptlang.org/tsconfig/#importHelpers):
   *
   * ```ts twoslash
   * // @noErrors
   * // @showEmit
   * // @esModuleInterop
   * // @importHelpers
   * // @module: commonjs
   * import * as fs from "fs";
   * import _ from "lodash";
   *
   * fs.readFileSync("file.txt", "utf8");
   * _.chunk(["a", "b", "c", "d"], 2);
   * ```
   *
   * Enabling `esModuleInterop` will also enable [`allowSyntheticDefaultImports`](https://typescriptlang.org/tsconfig/#allowSyntheticDefaultImports).
   *
   * @default false
   */
  esModuleInterop?: boolean

  /**
   * With exactOptionalPropertyTypes enabled, TypeScript applies stricter rules around how it handles properties on `type` or `interfaces` which have a `?` prefix.
   *
   * For example, this interface declares that there is a property which can be one of two strings: 'dark' or 'light' or it should not be in the object.
   *
   * ```ts
   * interface UserDefaults {
   *   // The absence of a value represents 'system'
   *   colorThemeOverride?: "dark" | "light";
   * }
   * ```
   *
   * Without this flag enabled, there are three values which you can set `colorThemeOverride` to be: "dark", "light" and `undefined`.
   *
   * Setting the value to `undefined` will allow most JavaScript runtime checks for the existence to fail, which is effectively falsy. However, this isn't quite accurate; `colorThemeOverride: undefined` is not the same as `colorThemeOverride` not being defined. For example, `"colorThemeOverride" in settings` would have different behavior with `undefined` as the key compared to not being defined.
   *
   * `exactOptionalPropertyTypes` makes TypeScript truly enforce the definition provided as an optional property:
   *
   * ```ts twoslash
   * // @exactOptionalPropertyTypes
   * // @errors: 2322 2412
   * interface UserDefaults {
   *   colorThemeOverride?: "dark" | "light";
   * }
   * declare function getUserSettings(): UserDefaults;
   * // ---cut---
   * const settings = getUserSettings();
   * settings.colorThemeOverride = "dark";
   * settings.colorThemeOverride = "light";
   *
   * // But not:
   * settings.colorThemeOverride = undefined;
   * ```
   *
   * @default false
   */
  exactOptionalPropertyTypes?: boolean

  /**
   * Enables [experimental support for decorators](https://github.com/tc39/proposal-decorators), which is a version of decorators that predates the TC39 standardization process.
   *
   * Decorators are a language feature which hasn't yet been fully ratified into the JavaScript specification.
   * This means that the implementation version in TypeScript may differ from the implementation in JavaScript when it is decided by TC39.
   *
   * You can find out more about decorator support in TypeScript in [the handbook](https://typescriptlang.org/docs/handbook/decorators.html).
   */
  experimentalDecorators?: boolean

  /**
   * You can use this flag to discover where TypeScript is spending its time when compiling.
   * This is a tool used for understanding the performance characteristics of your codebase overall.
   *
   * You can learn more about how to measure and understand the output in the performance [section of the wiki](https://github.com/microsoft/TypeScript/wiki/Performance).
   *
   * @default false
   */
  extendedDiagnostics?: boolean

  /**
   * Specify the polling strategy to use when the system runs out of or doesn't support native file watchers. Requires TypeScript version 3.8 or later.
   */
  fallbackPolling?: string

  /**
   * TypeScript follows the case sensitivity rules of the file system it's running on.
   * This can be problematic if some developers are working in a case-sensitive file system and others aren't.
   * If a file attempts to import `fileManager.ts` by specifying `./FileManager.ts` the file will be found in a case-insensitive file system, but not on a case-sensitive file system.
   *
   * When this option is set, TypeScript will issue an error if a program tries to include a file by a casing different from the casing on disk.
   *
   * @default true
   */
  forceConsistentCasingInFileNames?: boolean

  /**
   * This option gives you the chance to have TypeScript emit a v8 CPU profile during the compiler run. The CPU profile can provide insight into why your builds may be slow.
   *
   * This option can only be used from the CLI via: `--generateCpuProfile tsc-output.cpuprofile`.
   *
   * ```sh
   * npm run tsc --generateCpuProfile tsc-output.cpuprofile
   * ```
   *
   * This file can be opened in a chromium based browser like Chrome or Edge Developer in [the CPU profiler](https://developers.google.com/web/tools/chrome-devtools/rendering-tools/js-execution) section.
   * You can learn more about understanding the compilers performance in the [TypeScript wiki section on performance](https://github.com/microsoft/TypeScript/wiki/Performance).
   *
   * @default 'profile.cpuprofile'
   */
  generateCpuProfile?: string

  /**
   * For certain downleveling operations, TypeScript uses some helper code for operations like extending class, spreading arrays or objects, and async operations.
   * By default, these helpers are inserted into files which use them.
   * This can result in code duplication if the same helper is used in many different modules.
   *
   * If the `importHelpers` flag is on, these helper functions are instead imported from the [tslib](https://www.npmjs.com/package/tslib) module.
   * You will need to ensure that the `tslib` module is able to be imported at runtime.
   * This only affects modules; global script files will not attempt to import modules.
   *
   * For example, with this TypeScript:
   *
   * ```ts
   * export function fn(arr: number[]) {
   *   const arr2 = [1, ...arr];
   * }
   * ```
   *
   * Turning on [`downlevelIteration`](https://typescriptlang.org/tsconfig/#downlevelIteration) and `importHelpers` is still false:
   *
   * ```ts twoslash
   * // @showEmit
   * // @target: ES5
   * // @downleveliteration
   * export function fn(arr: number[]) {
   *   const arr2 = [1, ...arr];
   * }
   * ```
   *
   * Then turning on both [`downlevelIteration`](https://typescriptlang.org/tsconfig/#downlevelIteration) and `importHelpers`:
   *
   * ```ts twoslash
   * // @showEmit
   * // @target: ES5
   * // @downleveliteration
   * // @importhelpers
   * // @noErrors
   * export function fn(arr: number[]) {
   *   const arr2 = [1, ...arr];
   * }
   * ```
   *
   * You can use [`noEmitHelpers`](https://typescriptlang.org/tsconfig/#noEmitHelpers) when you provide your own implementations of these functions.
   *
   * @default false
   */
  importHelpers?: boolean

  /**
   * Deprecated in favor of [`verbatimModuleSyntax`](https://typescriptlang.org/tsconfig/#verbatimModuleSyntax).
   *
   * This flag controls how `import` works, there are 3 different options:
   *
   * - `remove`: The default behavior of dropping `import` statements which only reference types.
   *
   * - `preserve`: Preserves all `import` statements whose values or types are never used. This can cause imports/side-effects to be preserved.
   *
   * - `error`: This preserves all imports (the same as the preserve option), but will error when a value import is only used as a type. This might be useful if you want to ensure no values are being accidentally imported, but still make side-effect imports explicit.
   *
   * This flag works because you can use `import type` to explicitly create an `import` statement which should never be emitted into JavaScript.
   *
   * @default 'remove'
   */
  importsNotUsedAsValues?: string

  /**
   * Enable incremental compilation. Requires TypeScript version 3.4 or later.
   */
  incremental?: boolean

  /**
   * When set, instead of writing out a `.js.map` file to provide source maps, TypeScript will embed the source map content in the `.js` files.
   * Although this results in larger JS files, it can be convenient in some scenarios.
   * For example, you might want to debug JS files on a webserver that doesn't allow `.map` files to be served.
   *
   * Mutually exclusive with [`sourceMap`](https://typescriptlang.org/tsconfig/#sourceMap).
   *
   * For example, with this TypeScript:
   *
   * ```ts
   * const helloWorld = "hi";
   * console.log(helloWorld);
   * ```
   *
   * Converts to this JavaScript:
   *
   * ```ts twoslash
   * // @showEmit
   * const helloWorld = "hi";
   * console.log(helloWorld);
   * ```
   *
   * Then enable building it with `inlineSourceMap` enabled there is a comment at the bottom of the file which includes
   * a source-map for the file.
   *
   * ```ts twoslash
   * // @inlineSourceMap
   * // @showEmit
   * const helloWorld = "hi";
   * console.log(helloWorld);
   * ```
   *
   * @default false
   */
  inlineSourceMap?: boolean

  /**
   * When set, TypeScript will include the original content of the `.ts` file as an embedded string in the source map (using the source map's `sourcesContent` property).
   * This is often useful in the same cases as [`inlineSourceMap`](https://typescriptlang.org/tsconfig/#inlineSourceMap).
   *
   * Requires either [`sourceMap`](https://typescriptlang.org/tsconfig/#sourceMap) or [`inlineSourceMap`](https://typescriptlang.org/tsconfig/#inlineSourceMap) to be set.
   *
   * For example, with this TypeScript:
   *
   * ```ts twoslash
   * const helloWorld = "hi";
   * console.log(helloWorld);
   * ```
   *
   * By default converts to this JavaScript:
   *
   * ```ts twoslash
   * // @showEmit
   * const helloWorld = "hi";
   * console.log(helloWorld);
   * ```
   *
   * Then enable building it with `inlineSources` and [`inlineSourceMap`](https://typescriptlang.org/tsconfig/#inlineSourceMap) enabled there is a comment at the bottom of the file which includes
   * a source-map for the file.
   * Note that the end is different from the example in [`inlineSourceMap`](https://typescriptlang.org/tsconfig/#inlineSourceMap) because the source-map now contains the original source code also.
   *
   * ```ts twoslash
   * // @inlineSources
   * // @inlineSourceMap
   * // @showEmit
   * const helloWorld = "hi";
   * console.log(helloWorld);
   * ```
   *
   * @default false
   */
  inlineSources?: boolean

  /**
   * Require sufficient annotation on exports so other tools can trivially generate declaration files.
   *
   * For more information, see the [5.5 release notes](https://typescriptlang.org/docs/handbook/release-notes/typescript-5-5.html#isolated-declarations)
   *
   * @default false
   */
  isolatedDeclarations?: boolean

  /**
   * While you can use TypeScript to produce JavaScript code from TypeScript code, it's also common to use other transpilers such as [Babel](https://babeljs.io/) to do this.
   * However, other transpilers only operate on a single file at a time, which means they can't apply code transforms that depend on understanding the full type system.
   * This restriction also applies to TypeScript's `ts.transpileModule` API which is used by some build tools.
   *
   * These limitations can cause runtime problems with some TypeScript features like `const enum`s and `namespace`s.
   * Setting the `isolatedModules` flag tells TypeScript to warn you if you write certain code that can't be correctly interpreted by a single-file transpilation process.
   *
   * It does not change the behavior of your code, or otherwise change the behavior of TypeScript's checking and emitting process.
   *
   * Some examples of code which does not work when `isolatedModules` is enabled.
   *
   * #### Exports of Non-Value Identifiers
   *
   * In TypeScript, you can import a _type_ and then subsequently export it:
   *
   * ```ts twoslash
   * // @noErrors
   * import { someType, someFunction } from "someModule";
   *
   * someFunction();
   *
   * export { someType, someFunction };
   * ```
   *
   * Because there's no value for `someType`, the emitted `export` will not try to export it (this would be a runtime error in JavaScript):
   *
   * ```js
   * export { someFunction };
   * ```
   *
   * Single-file transpilers don't know whether `someType` produces a value or not, so it's an error to export a name that only refers to a type.
   *
   * #### Non-Module Files
   *
   * If `isolatedModules` is set, namespaces are only allowed in _modules_ (which means it has some form of `import`/`export`). An error occurs if a namespace is found in a non-module file:
   *
   * ```ts twoslash
   * // @errors: 1277
   * // @isolatedModules
   * namespace Instantiated {
   *  export const x = 1;
   * }
   * ```
   *
   * This restriction doesn't apply to `.d.ts` files.
   *
   * #### References to `const enum` members
   *
   * In TypeScript, when you reference a `const enum` member, the reference is replaced by its actual value in the emitted JavaScript. Changing this TypeScript:
   *
   * ```ts twoslash
   * declare const enum Numbers {
   *   Zero = 0,
   *   One = 1,
   * }
   * console.log(Numbers.Zero + Numbers.One);
   * ```
   *
   * To this JavaScript:
   *
   * ```ts twoslash
   * // @showEmit
   * // @removeComments
   * declare const enum Numbers {
   *   Zero = 0,
   *   One = 1,
   * }
   * console.log(Numbers.Zero + Numbers.One);
   * ```
   *
   * Without knowledge of the values of these members, other transpilers can't replace the references to `Numbers`, which would be a runtime error if left alone (since there are no `Numbers` object at runtime).
   * Because of this, when `isolatedModules` is set, it is an error to reference an ambient `const enum` member.
   *
   * @default false
   */
  isolatedModules?: boolean

  /**
   * Controls how JSX constructs are emitted in JavaScript files.
   * This only affects output of JS files that started in `.tsx` files.
   *
   * - `react-jsx`: Emit `.js` files with the JSX changed to `_jsx` calls optimized for production
   * - `react-jsxdev`: Emit `.js` files with the JSX changed to `_jsx` calls for development only
   * - `preserve`: Emit `.jsx` files with the JSX unchanged
   * - `react-native`: Emit `.js` files with the JSX unchanged
   * - `react`: Emit `.js` files with JSX changed to the equivalent `React.createElement` calls
   *
   * ### For example
   *
   * This sample code:
   *
   * ```tsx
   * export const HelloWorld = () => <h1>Hello world</h1>;
   * ```
   *
   * React: `"react-jsx"`<sup>[[1]](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)</sup>
   *
   * ```tsx twoslash
   * declare module JSX {
   *   interface Element {}
   *   interface IntrinsicElements {
   *     [s: string]: any;
   *   }
   * }
   * // \@showEmit
   * // \@noErrors
   * // \@jsx: react-jsx
   * export const HelloWorld = () => <h1>Hello world</h1>;
   * ```
   *
   * React dev transform: `"react-jsxdev"`<sup>[[1]](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)</sup>
   *
   * ```tsx twoslash
   * declare module JSX {
   *   interface Element {}
   *   interface IntrinsicElements {
   *     [s: string]: any;
   *   }
   * }
   * // \@showEmit
   * // \@noErrors
   * // \@jsx: react-jsxdev
   * export const HelloWorld = () => <h1>Hello world</h1>;
   * ```
   *
   * Preserve: `"preserve"`
   *
   * ```tsx twoslash
   * declare module JSX {
   *   interface Element {}
   *   interface IntrinsicElements {
   *     [s: string]: any;
   *   }
   * }
   * // \@showEmit
   * // \@noErrors
   * // \@jsx: preserve
   * export const HelloWorld = () => <h1>Hello world</h1>;
   * ```
   *
   * React Native: `"react-native"`
   *
   * ```tsx twoslash
   * declare module JSX {
   *   interface Element {}
   *   interface IntrinsicElements {
   *     [s: string]: any;
   *   }
   * }
   * // \@showEmit
   * // \@noErrors
   * // \@jsx: react-native
   * export const HelloWorld = () => <h1>Hello world</h1>;
   * ```
   *
   *
   * Legacy React runtime: `"react"`
   *
   * ```tsx twoslash
   * declare module JSX {
   *   interface Element {}
   *   interface IntrinsicElements {
   *     [s: string]: any;
   *   }
   * }
   * // \@showEmit
   * // \@noErrors
   * export const HelloWorld = () => <h1>Hello world</h1>;
   * ```
   *
   * This option can be used on a per-file basis too using an `@jsxRuntime` comment.
   *
   * Always use the classic runtime (`"react"`) for this file:
   *
   * ```tsx
   * //\/* \@jsxRuntime classic *\/\
   * export const HelloWorld = () => <h1>Hello world</h1>;
   * ```
   *
   * Always use the automatic runtime (`"react-jsx"`) for this file:
   *
   * ```tsx
   * //\/* \@jsxRuntime automatic *\/
   * export const HelloWorld = () => <h1>Hello world</h1>;
   * ```
   */
  jsx?: string

  /**
   * Changes the function called in `.js` files when compiling JSX Elements using the classic JSX runtime.
   * The most common change is to use `"h"` or `"preact.h"` instead of the default `"React.createElement"` if using `preact`.
   *
   * For example, this TSX file:
   *
   * ```tsx
   * import { h } from "preact";
   *
   * const HelloWorld = () => <div>Hello</div>;
   * ```
   *
   * With `jsxFactory: "h"` looks like:
   *
   * ```tsx twoslash
   * // @showEmit
   * // @showEmittedFile: index.js
   * // @jsxFactory: h
   * // @noErrors
   * // @target: esnext
   * // @module: commonjs
   *
   * import { h, Fragment } from "preact";
   *
   * const HelloWorld = () => <div>Hello</div>;
   * ```
   *
   * This option can be used on a per-file basis too similar to [Babel's `\/** @jsx h *\/` directive](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx#custom).
   *
   * ```tsx twoslash
   * \/** @jsx h *\/
   * import { h } from "preact";
   *
   * const HelloWorld = () => <div>Hello</div>;
   * ```
   *
   * The factory chosen will also affect where the `JSX` namespace is looked up (for type checking information) before falling back to the global one.
   *
   * If the factory is defined as `React.createElement` (the default), the compiler will check for `React.JSX` before checking for a global `JSX`. If the factory is defined as `h`, it will check for `h.JSX` before a global `JSX`.
   *
   * @default 'React.createElement'
   */
  jsxFactory?: string

  /**
   * Specify the JSX fragment factory function to use when targeting react JSX emit with [`jsxFactory`](https://typescriptlang.org/tsconfig/#jsxFactory) compiler option is specified, e.g. `Fragment`.
   *
   * For example with this TSConfig:
   *
   * ```json tsconfig
   * {
   *   "compilerOptions": {
   *     "target": "esnext",
   *     "module": "commonjs",
   *     "jsx": "react",
   *     "jsxFactory": "h",
   *     "jsxFragmentFactory": "Fragment"
   *   }
   * }
   * ```
   *
   * This TSX file:
   *
   * ```tsx
   * import { h, Fragment } from "preact";
   *
   * const HelloWorld = () => (
   *   <>
   *     <div>Hello</div>
   *   </>
   * );
   * ```
   *
   * Would look like:
   *
   * ```tsx twoslash
   * // @showEmit
   * // @showEmittedFile: index.js
   * // @jsxFactory: h
   * // @jsxFragmentFactory: Fragment
   * // @noErrors
   * // @target: esnext
   * // @module: commonjs
   *
   * import { h, Fragment } from "preact";
   *
   * const HelloWorld = () => (
   *   <>
   *     <div>Hello</div>
   *   </>
   * );
   * ```
   *
   * This option can be used on a per-file basis too similar to [Babel's `\/* @jsxFrag h *\/` directive](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx#fragments).
   *
   * For example:
   *
   * ```tsx twoslash
   * \/** @jsx h *\/
   * \/** @jsxFrag Fragment *\/
   *
   * import { h, Fragment } from "preact";
   *
   * const HelloWorld = () => (
   *   <>
   *     <div>Hello</div>
   *   </>
   * );
   * ```
   *
   * @default 'React.Fragment'
   */
  jsxFragmentFactory?: string

  /**
   * Declares the module specifier to be used for importing the `jsx` and `jsxs` factory functions when using [`jsx`](https://typescriptlang.org/tsconfig/#jsx) as `"react-jsx"` or `"react-jsxdev"` which were introduced in TypeScript 4.1.
   *
   * With [React 17](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html) the library supports a new form of JSX transformation via a separate import.
   *
   * For example with this code:
   *
   * ```tsx
   * import React from "react";
   *
   * function App() {
   *   return <h1>Hello World</h1>;
   * }
   * ```
   *
   * Using this TSConfig:
   *
   * ```json tsconfig
   * {
   *   "compilerOptions": {
   *     "target": "esnext",
   *     "module": "commonjs",
   *     "jsx": "react-jsx"
   *   }
   * }
   * ```
   *
   * The emitted JavaScript from TypeScript is:
   *
   * ```tsx twoslash
   * // @showEmit
   * // @noErrors
   * // @jsx: react-jsx
   * // @module: commonjs
   * // @target: esnext
   * declare module JSX {
   *   interface Element {}
   *   interface IntrinsicElements {
   *     [s: string]: any;
   *   }
   * }
   * import React from "react";
   *
   * function App() {
   *   return <h1>Hello World</h1>;
   * }
   * ```
   *
   * For example if you wanted to use `"jsxImportSource": "preact"`, you need a tsconfig like:
   *
   * ```json tsconfig
   * {
   *   "compilerOptions": {
   *     "target": "esnext",
   *     "module": "commonjs",
   *     "jsx": "react-jsx",
   *     "jsxImportSource": "preact",
   *     "types": ["preact"]
   *   }
   * }
   * ```
   *
   * Which generates code like:
   *
   * ```tsx twoslash
   * // @showEmit
   * // @jsxImportSource: preact
   * // @types: preact
   * // @jsx: react-jsx
   * // @target: esnext
   * // @module: commonjs
   * // @noErrors
   *
   * export function App() {
   *   return <h1>Hello World</h1>;
   * }
   * ```
   *
   * Alternatively, you can use a per-file pragma to set this option, for example:
   *
   * ```tsx
   * \/** @jsxImportSource preact *\/
   *
   * export function App() {
   *   return <h1>Hello World</h1>;
   * }
   * ```
   *
   * Would add `preact/jsx-runtime` as an import for the `_jsx` factory.
   *
   * _Note:_ In order for this to work like you would expect, your `tsx` file must include an `export` or `import` so that it is considered a module.
   *
   * @default 'react'
   */
  jsxImportSource?: string

  /**
   * This flag changes the `keyof` type operator to return `string` instead of `string | number` when applied to a type with a string index signature.
   *
   * This flag is used to help people keep this behavior from [before TypeScript 2.9's release](https://typescriptlang.org/docs/handbook/release-notes/typescript-2-9.html#support-number-and-symbol-named-properties-with-keyof-and-mapped-types).
   *
   * @default false
   */
  keyofStringsOnly?: boolean

  /**
   * TypeScript includes a default set of type definitions for built-in JS APIs (like `Math`), as well as type definitions for things found in browser environments (like `document`).
   * TypeScript also includes APIs for newer JS features matching the [`target`](https://typescriptlang.org/tsconfig/#target) you specify; for example the definition for `Map` is available if [`target`](https://typescriptlang.org/tsconfig/#target) is `ES6` or newer.
   *
   * You may want to change these for a few reasons:
   *
   * - Your program doesn't run in a browser, so you don't want the `"dom"` type definitions
   * - Your runtime platform provides certain JavaScript API objects (maybe through polyfills), but doesn't yet support the full syntax of a given ECMAScript version
   * - You have polyfills or native implementations for some, but not all, of a higher level ECMAScript version
   *
   * In TypeScript 4.5, lib files can be overridden by npm modules, find out more [in the blog](https://devblogs.microsoft.com/typescript/announcing-typescript-4-5-beta/#supporting-lib-from-node_modules).
   *
   * ### High Level libraries
   *
   * | Name         | Contents                                                                                                                                          |
   * | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | `ES5`        | Core definitions for all ES5 functionality                                                                                                        |
   * | `ES2015`     | Additional APIs available in ES2015 (also known as ES6) - `array.find`, `Promise`, `Proxy`, `Symbol`, `Map`, `Set`, `Reflect`, etc.               |
   * | `ES6`        | Alias for "ES2015"                                                                                                                                |
   * | `ES2016`     | Additional APIs available in ES2016 - `array.include`, etc.                                                                                       |
   * | `ES7`        | Alias for "ES2016"                                                                                                                                |
   * | `ES2017`     | Additional APIs available in ES2017 - `Object.entries`, `Object.values`, `Atomics`, `SharedArrayBuffer`, `date.formatToParts`, typed arrays, etc. |
   * | `ES2018`     | Additional APIs available in ES2018 - `async` iterables, `promise.finally`, `Intl.PluralRules`, `regexp.groups`, etc.                             |
   * | `ES2019`     | Additional APIs available in ES2019 - `array.flat`, `array.flatMap`, `Object.fromEntries`, `string.trimStart`, `string.trimEnd`, etc.             |
   * | `ES2020`     | Additional APIs available in ES2020 - `string.matchAll`, etc.                                                                                     |
   * | `ES2021`     | Additional APIs available in ES2021 - `promise.any`, `string.replaceAll` etc.                                                                     |
   * | `ES2022`     | Additional APIs available in ES2022 - `array.at`, `RegExp.hasIndices`, etc.                                                                       |
   * | `ES2023`     | Additional APIs available in ES2023 - `array.with`, `array.findLast`, `array.findLastIndex`, `array.toSorted`, `array.toReversed`, etc.           |
   * | `ESNext`     | Additional APIs available in ESNext - This changes as the JavaScript specification evolves                                                        |
   * | `DOM`        | [DOM](https://developer.mozilla.org/docs/Glossary/DOM) definitions - `window`, `document`, etc.                                                   |
   * | `WebWorker`  | APIs available in [WebWorker](https://developer.mozilla.org/docs/Web/API/Web_Workers_API/Using_web_workers) contexts                              |
   * | `ScriptHost` | APIs for the [Windows Script Hosting System](https://wikipedia.org/wiki/Windows_Script_Host)                                                      |
   *
   * ### Individual library components
   *
   * | Name                      |
   * | ------------------------- |
   * | `DOM.Iterable`            |
   * | `ES2015.Core`             |
   * | `ES2015.Collection`       |
   * | `ES2015.Generator`        |
   * | `ES2015.Iterable`         |
   * | `ES2015.Promise`          |
   * | `ES2015.Proxy`            |
   * | `ES2015.Reflect`          |
   * | `ES2015.Symbol`           |
   * | `ES2015.Symbol.WellKnown` |
   * | `ES2016.Array.Include`    |
   * | `ES2017.object`           |
   * | `ES2017.Intl`             |
   * | `ES2017.SharedMemory`     |
   * | `ES2017.String`           |
   * | `ES2017.TypedArrays`      |
   * | `ES2018.Intl`             |
   * | `ES2018.Promise`          |
   * | `ES2018.RegExp`           |
   * | `ES2019.Array`            |
   * | `ES2019.Object`           |
   * | `ES2019.String`           |
   * | `ES2019.Symbol`           |
   * | `ES2020.String`           |
   * | `ES2020.Symbol.wellknown` |
   * | `ES2021.Promise`          |
   * | `ES2021.String`           |
   * | `ES2021.WeakRef`          |
   * | `ESNext.AsyncIterable`    |
   * | `ESNext.Array`            |
   * | `ESNext.Intl`             |
   * | `ESNext.Symbol`           |
   *
   * This list may be out of date, you can see the full list in the [TypeScript source code](https://github.com/microsoft/TypeScript/tree/main/src/lib).
   */
  lib?: string[]

  /**
   * TypeScript 4.5 introduced the possibility of substituting the default `lib` files with custom ones.
   * All built-in library files would first try to be resolved from packages named `@typescript/lib-*`.
   * For example, you could lock your `dom` libraries onto a specific version of [the `@types/web` package](https://www.npmjs.com/package/@types/web?activeTab=readme) with the following `package.json`:
   *
   * ```json
   * {
   *     "devDependencies": {
   *        "@typescript/lib-dom": "npm:@types/web@0.0.199"
   *      }
   * }
   * ```
   *
   * When installed, a package called `@typescript/lib-dom` should exist, and TypeScript would always look there when searching for `lib.dom.d.ts`.
   *
   * The `--libReplacement` flag allows you to disable this behavior.
   * If you're not using any `@typescript/lib-*` packages, you can now disable those package lookups with `--libReplacement false`.
   * In the future, `--libReplacement false` may become the default, so if you currently rely on the behavior you should consider explicitly enabling it with `--libReplacement true`.
   *
   * @default true
   */
  libReplacement?: boolean

  /**
   * Print names of generated files part of the compilation to the terminal.
   *
   * This flag is useful in two cases:
   *
   * - You want to transpile TypeScript as a part of a build chain in the terminal where the filenames are processed in the next command.
   * - You are not sure that TypeScript has included a file you expected, as a part of debugging the [file inclusion settings](https://typescriptlang.org/tsconfig/#Project_Files_0).
   *
   * For example:
   *
   * ```
   * example
   * ├── index.ts
   * ├── package.json
   * └── tsconfig.json
   * ```
   *
   * With:
   *
   * ```json tsconfig
   * {
   *   "compilerOptions": {
   *     "declaration": true,
   *     "listEmittedFiles": true
   *   }
   * }
   * ```
   *
   * Would echo paths like:
   *
   * ```
   * $ npm run tsc
   *
   * path/to/example/index.js
   * path/to/example/index.d.ts
   * ```
   *
   * Normally, TypeScript would return silently on success.
   *
   * @default false
   */
  listEmittedFiles?: boolean

  /**
   * Print names of files part of the compilation. This is useful when you are not sure that TypeScript has
   * included a file you expected.
   *
   * For example:
   *
   * ```
   * example
   * ├── index.ts
   * ├── package.json
   * └── tsconfig.json
   * ```
   *
   * With:
   *
   * ```json tsconfig
   * {
   *   "compilerOptions": {
   *     "listFiles": true
   *   }
   * }
   * ```
   *
   * Would echo paths like:
   *
   * ```
   * $ npm run tsc
   * path/to/example/node_modules/typescript/lib/lib.d.ts
   * path/to/example/node_modules/typescript/lib/lib.es5.d.ts
   * path/to/example/node_modules/typescript/lib/lib.dom.d.ts
   * path/to/example/node_modules/typescript/lib/lib.webworker.importscripts.d.ts
   * path/to/example/node_modules/typescript/lib/lib.scripthost.d.ts
   * path/to/example/index.ts
   * ```
   *
   * Note if using TypeScript 4.2, prefer [`explainFiles`](https://typescriptlang.org/tsconfig/#explainFiles) which offers an explanation of why a file was added too.
   *
   * @default false
   */
  listFiles?: boolean

  /**
   * Print names of files that are part of the compilation and then stop processing.
   */
  listFilesOnly?: boolean

  /**
   * Specify the location where debugger should locate map files instead of generated locations.
   * This string is treated verbatim inside the source-map, for example:
   *
   * ```json tsconfig
   * {
   *   "compilerOptions": {
   *     "sourceMap": true,
   *     "mapRoot": "https://my-website.com/debug/sourcemaps/"
   *   }
   * }
   * ```
   *
   * Would declare that `index.js` will have sourcemaps at `https://my-website.com/debug/sourcemaps/index.js.map`.
   */
  mapRoot?: string

  /**
   * The maximum dependency depth to search under `node_modules` and load JavaScript files.
   *
   * This flag can only be used when [`allowJs`](https://typescriptlang.org/tsconfig/#allowJs) is enabled, and is used if you want to have TypeScript infer types for all of the JavaScript inside your `node_modules`.
   *
   * Ideally this should stay at 0 (the default), and `d.ts` files should be used to explicitly define the shape of modules.
   * However, there are cases where you may want to turn this on at the expense of speed and potential accuracy.
   *
   * @default 0
   */
  maxNodeModuleJsDepth?: number

  /**
   * Sets the module system for the program. See the [theory behind TypeScript’s `module` option](https://typescriptlang.org/docs/handbook/modules/theory.html#the-module-output-format) and [its reference page](https://typescriptlang.org/docs/handbook/modules/reference.html#the-module-compiler-option) for more information. You very likely want `"nodenext"` for modern Node.js projects and `preserve` or `esnext` for code that will be bundled.
   *
   * Changing `module` affects [`moduleResolution`](https://typescriptlang.org/tsconfig/#moduleResolution) which [also has a reference page](https://typescriptlang.org/docs/handbook/modules/reference.html#the-moduleresolution-compiler-option).
   *
   * Here's some example output for this file:
   *
   * ```ts twoslash
   * // @filename: constants.ts
   * export const valueOfPi = 3.142;
   * // ---cut---
   * // @filename: index.ts
   * import { valueOfPi } from "./constants";
   *
   * export const twoPi = valueOfPi * 2;
   * ```
   *
   * #### `CommonJS`
   *
   * ```ts twoslash
   * // @showEmit
   * // @module: commonjs
   * // @noErrors
   * import { valueOfPi } from "./constants";
   *
   * export const twoPi = valueOfPi * 2;
   * ```
   *
   * #### `UMD`
   *
   * ```ts twoslash
   * // @showEmit
   * // @module: umd
   * // @noErrors
   * import { valueOfPi } from "./constants";
   *
   * export const twoPi = valueOfPi * 2;
   * ```
   *
   * #### `AMD`
   *
   * ```ts twoslash
   * // @showEmit
   * // @module: amd
   * // @noErrors
   * import { valueOfPi } from "./constants";
   *
   * export const twoPi = valueOfPi * 2;
   * ```
   *
   * #### `System`
   *
   * ```ts twoslash
   * // @showEmit
   * // @module: system
   * // @noErrors
   * import { valueOfPi } from "./constants";
   *
   * export const twoPi = valueOfPi * 2;
   * ```
   *
   * #### `ESNext`
   *
   * ```ts twoslash
   * // @showEmit
   * // @module: esnext
   * // @noErrors
   * import { valueOfPi } from "./constants";
   *
   * export const twoPi = valueOfPi * 2;
   * ```
   *
   * #### `ES2015`/`ES6`/`ES2020`/`ES2022`
   *
   * ```ts twoslash
   * // @showEmit
   * // @module: es2015
   * // @noErrors
   * import { valueOfPi } from "./constants";
   *
   * export const twoPi = valueOfPi * 2;
   * ```
   *
   * In addition to the base functionality of `ES2015`/`ES6`, `ES2020` adds support for [dynamic `import`s](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import), and [`import.meta`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import.meta) while `ES2022` further adds support for [top level `await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#top_level_await).
   *
   * #### `node16`/`node18`/`node20`/`nodenext`
   *
   * The `node16`, `node18`, `node20`, and `nodenext` modes integrate with Node's [native ECMAScript Module support](https://nodejs.org/api/esm.html). The emitted JavaScript uses either `CommonJS` or `ES2020` output depending on the file extension and the value of the `type` setting in the nearest `package.json`. Module resolution also works differently. You can learn more in the [handbook](https://typescriptlang.org/docs/handbook/esm-node.html) and [Modules Reference](https://typescriptlang.org/docs/handbook/modules/reference.html#node16-node18-node20-nodenext).
   *
   * - `node16` is available from TypeScript 4.7
   * - `node18` is available from TypeScript 5.8 as a replacement for `node16`, with added support for import attributes.
   * - `node20` adds support for require(ESM).
   * - `nodenext` is available from TypeScript 4.7, but its behavior changes with the latest stable versions of Node.js. `--module nodenext` implies the floating `--target esnext`.
   *
   * #### `preserve`
   *
   * In `--module preserve` ([added](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-4.html#support-for-require-calls-in---moduleresolution-bundler-and---module-preserve) in TypeScript 5.4), ECMAScript imports and exports written in input files are preserved in the output, and CommonJS-style `import x = require("...")` and `export = ...` statements are emitted as CommonJS `require` and `module.exports`. In other words, the format of each individual import or export statement is preserved, rather than being coerced into a single format for the whole compilation (or even a whole file).
   *
   * ```ts twoslash
   * // @showEmit
   * // @module: preserve
   * // @noErrors
   * import { valueOfPi } from "./constants";
   * import constants = require("./constants");
   *
   * export const piSquared = valueOfPi * constants.valueOfPi;
   * ```
   *
   * While it’s rare to need to mix imports and require calls in the same file, this `module` mode best reflects the capabilities of most modern bundlers, as well as the Bun runtime.
   *
   * > Why care about TypeScript’s `module` emit with a bundler or with Bun, where you’re likely also setting `noEmit`? TypeScript’s type checking and module resolution behavior are affected by the module format that it _would_ emit. Setting `module` gives TypeScript information about how your bundler or runtime will process imports and exports, which ensures that the types you see on imported values accurately reflect what will happen at runtime or after bundling.
   *
   * #### `None`
   *
   * ```ts twoslash
   * // @showEmit
   * // @module: none
   * // @noErrors
   * import { valueOfPi } from "./constants";
   *
   * export const twoPi = valueOfPi * 2;
   * ```
   */
  module?: string

  /**
   * This setting controls how TypeScript determines whether a file is a
   * [script or a module](https://typescriptlang.org/docs/handbook/modules/theory.html#scripts-and-modules-in-javascript).
   *
   * There are three choices:
   *
   * - `"auto"` (default) - TypeScript will not only look for import and export statements, but it will also check whether the `"type"` field in a `package.json` is set to `"module"` when running with [`module`](https://typescriptlang.org/tsconfig/#module): `nodenext` or `node16`, and check whether the current file is a JSX file when running under [`jsx`](https://typescriptlang.org/tsconfig/#jsx):  `react-jsx`.
   *
   * - `"legacy"` - The same behavior as 4.6 and prior, usings import and export statements to determine whether a file is a module.
   *
   * - `"force"` - Ensures that every non-declaration file is treated as a module.
   */
  moduleDetection?: string

  /**
   * Specify the module resolution strategy:
   *
   * - `'node16'` or `'nodenext'` for modern versions of Node.js. Node.js v12 and later supports both ECMAScript imports and CommonJS `require`, which resolve using different algorithms. These `moduleResolution` values, when combined with the corresponding [`module`](https://typescriptlang.org/tsconfig/#module) values, picks the right algorithm for each resolution based on whether Node.js will see an `import` or `require` in the output JavaScript code.
   * - `'node10'` (previously called `'node'`) for Node.js versions older than v10, which only support CommonJS `require`. You probably won't need to use `node10` in modern code.
   * - `'bundler'` for use with bundlers. Like `node16` and `nodenext`, this mode supports package.json `"imports"` and `"exports"`, but unlike the Node.js resolution modes, `bundler` never requires file extensions on relative paths in imports.
   * - `'classic'` was used in TypeScript before the release of 1.6. `classic` should not be used.
   *
   * There are reference pages explaining the [theory behind TypeScript’s module resolution](https://www.typescriptlang.org/docs/handbook/modules/theory.html#module-resolution) and the [details of each option](https://typescriptlang.org/docs/handbook/modules/reference.html#the-moduleresolution-compiler-option).
   */
  moduleResolution?: string

  /**
   * Provides a way to override the default list of file name suffixes to search when resolving a module.
   *
   * ```json tsconfig
   * {
   *     "compilerOptions": {
   *         "moduleSuffixes": [".ios", ".native", ""]
   *     }
   * }
   * ```
   *
   * Given the above configuration, an import like the following:
   *
   * ```ts
   * import * as foo from "./foo";
   * ```
   *
   * TypeScript will look for the relative files `./foo.ios.ts`, `./foo.native.ts`, and finally `./foo.ts`.
   *
   * Note the empty string `""` in [`moduleSuffixes`](https://typescriptlang.org/tsconfig/#moduleSuffixes) which is necessary for TypeScript to also look-up `./foo.ts`.
   *
   * This feature can be useful for React Native projects where each target platform can use a separate tsconfig.json with differing `moduleSuffixes`.
   */
  moduleSuffixes?: string[]

  /**
   * Specify the end of line sequence to be used when emitting files: 'CRLF' (dos) or 'LF' (unix).
   *
   * @default 'lf'
   */
  newLine?: string

  /**
   * Disable full type checking (only critical parse and emit errors will be reported).
   *
   * @default false
   */
  noCheck?: boolean

  /**
   * Do not emit compiler output files like JavaScript source code, source-maps or declarations.
   *
   * This makes room for another tool like [Babel](https://babeljs.io/), or [swc](https://github.com/swc-project/swc) to handle converting the TypeScript file to a file which can run inside a JavaScript environment.
   *
   * You can then use TypeScript as a tool for providing editor integration, and as a source code type-checker.
   *
   * @default false
   */
  noEmit?: boolean

  /**
   * Instead of importing helpers with [`importHelpers`](https://typescriptlang.org/tsconfig/#importHelpers), you can provide implementations in the global scope for the helpers you use and completely turn off emitting of helper functions.
   *
   * For example, using this `async` function in ES5 requires a `await`-like function and `generator`-like function to run:
   *
   * ```ts twoslash
   * const getAPI = async (url: string) => {
   *   // Get API
   *   return {};
   * };
   * ```
   *
   * Which creates quite a lot of JavaScript:
   *
   * ```ts twoslash
   * // @showEmit
   * // @target: ES5
   * const getAPI = async (url: string) => {
   *   // Get API
   *   return {};
   * };
   * ```
   *
   * Which can be switched out with your own globals via this flag:
   *
   * ```ts twoslash
   * // @showEmit
   * // @target: ES5
   * // @noEmitHelpers
   * const getAPI = async (url: string) => {
   *   // Get API
   *   return {};
   * };
   * ```
   *
   * @default false
   */
  noEmitHelpers?: boolean

  /**
   * Do not emit compiler output files like JavaScript source code, source-maps or declarations if any errors were reported.
   *
   * This defaults to `false`, making it easier to work with TypeScript in a watch-like environment where you may want to see results of changes to your code in another environment before making sure all errors are resolved.
   *
   * @default false
   */
  noEmitOnError?: boolean

  /**
   * Do not truncate error messages.
   *
   * With `false`, the default.
   *
   * ```ts twoslash
   * // @errors: 2322 2454
   * var x: {
   *   propertyWithAnExceedinglyLongName1: string;
   *   propertyWithAnExceedinglyLongName2: string;
   *   propertyWithAnExceedinglyLongName3: string;
   *   propertyWithAnExceedinglyLongName4: string;
   *   propertyWithAnExceedinglyLongName5: string;
   *   propertyWithAnExceedinglyLongName6: string;
   *   propertyWithAnExceedinglyLongName7: string;
   *   propertyWithAnExceedinglyLongName8: string;
   * };
   *
   * // String representation of type of 'x' should be truncated in error message
   * var s: string = x;
   * ```
   *
   * With `true`
   *
   * ```ts twoslash
   * // @errors: 2322 2454
   * // @noErrorTruncation: true
   * var x: {
   *   propertyWithAnExceedinglyLongName1: string;
   *   propertyWithAnExceedinglyLongName2: string;
   *   propertyWithAnExceedinglyLongName3: string;
   *   propertyWithAnExceedinglyLongName4: string;
   *   propertyWithAnExceedinglyLongName5: string;
   *   propertyWithAnExceedinglyLongName6: string;
   *   propertyWithAnExceedinglyLongName7: string;
   *   propertyWithAnExceedinglyLongName8: string;
   * };
   *
   * // String representation of type of 'x' should be truncated in error message
   * var s: string = x;
   * ```
   *
   * @default false
   */
  noErrorTruncation?: boolean

  /**
   * Report errors for fallthrough cases in switch statements.
   * Ensures that any non-empty case inside a switch statement includes either `break`, `return`, or `throw`.
   * This means you won't accidentally ship a case fallthrough bug.
   *
   * ```ts twoslash
   * // @noFallthroughCasesInSwitch
   * // @errors: 7029
   * const a: number = 6;
   *
   * switch (a) {
   *   case 0:
   *     console.log("even");
   *   case 1:
   *     console.log("odd");
   *     break;
   * }
   * ```
   *
   * @default false
   */
  noFallthroughCasesInSwitch?: boolean

  /**
   * In some cases where no type annotations are present, TypeScript will fall back to a type of `any` for a variable when it cannot infer the type.
   *
   * This can cause some errors to be missed, for example:
   *
   * ```ts twoslash
   * // @noImplicitAny: false
   * function fn(s) {
   *   // No error?
   *   console.log(s.subtr(3));
   * }
   * fn(42);
   * ```
   *
   * Turning on `noImplicitAny` however TypeScript will issue an error whenever it would have inferred `any`:
   *
   * ```ts twoslash
   * // @errors: 7006
   * function fn(s) {
   *   console.log(s.subtr(3));
   * }
   * ```
   */
  noImplicitAny?: boolean

  /**
   * When working with classes which use inheritance, it's possible for a sub-class to get "out of sync" with the functions it overloads when they are renamed in the base class.
   *
   * For example, imagine you are modeling a music album syncing system:
   *
   * ```ts twoslash
   * class Album {
   *   download() {
   *     // Default behavior
   *   }
   * }
   *
   * class SharedAlbum extends Album {
   *   download() {
   *     // Override to get info from many sources
   *   }
   * }
   * ```
   *
   * Then when you add support for machine-learning generated playlists, you refactor the `Album` class to have a 'setup' function instead:
   *
   * ```ts twoslash
   * class Album {
   *   setup() {
   *     // Default behavior
   *   }
   * }
   *
   * class MLAlbum extends Album {
   *   setup() {
   *     // Override to get info from algorithm
   *   }
   * }
   *
   * class SharedAlbum extends Album {
   *   download() {
   *     // Override to get info from many sources
   *   }
   * }
   * ```
   *
   * In this case, TypeScript has provided no warning that `download` on `SharedAlbum` _expected_ to override a function in the base class.
   *
   * Using `noImplicitOverride` you can ensure that the sub-classes never go out of sync, by ensuring that functions which override include the keyword `override`.
   *
   * The following example has `noImplicitOverride` enabled, and you can see the error received when `override` is missing:
   *
   * ```ts twoslash
   * // @noImplicitOverride
   * // @errors: 4114
   * class Album {
   *   setup() {}
   * }
   *
   * class MLAlbum extends Album {
   *   override setup() {}
   * }
   *
   * class SharedAlbum extends Album {
   *   setup() {}
   * }
   * ```
   *
   * @default false
   */
  noImplicitOverride?: boolean

  /**
   * When enabled, TypeScript will check all code paths in a function to ensure they return a value.
   *
   * ```ts twoslash
   * // @errors: 2366 2322
   * function lookupHeadphonesManufacturer(color: "blue" | "black"): string {
   *   if (color === "blue") {
   *     return "beats";
   *   } else {
   *     "bose";
   *   }
   * }
   * ```
   *
   * @default false
   */
  noImplicitReturns?: boolean

  /**
   * Raise error on 'this' expressions with an implied 'any' type.
   *
   * For example, the class below returns a function which tries to access `this.width` and `this.height` – but the context
   * for `this` inside the function inside `getAreaFunction` is not the instance of the Rectangle.
   *
   * ```ts twoslash
   * // @errors: 2683
   * class Rectangle {
   *   width: number;
   *   height: number;
   *
   *   constructor(width: number, height: number) {
   *     this.width = width;
   *     this.height = height;
   *   }
   *
   *   getAreaFunction() {
   *     return function () {
   *       return this.width * this.height;
   *     };
   *   }
   * }
   * ```
   */
  noImplicitThis?: boolean

  /**
   * You shouldn't need this. By default, when emitting a module file to a non-ES6 target, TypeScript emits a `"use strict";` prologue at the top of the file.
   * This setting disables the prologue.
   *
   * @default false
   */
  noImplicitUseStrict?: boolean

  /**
   * Disables the automatic inclusion of any library files.
   * If this option is set, `lib` is ignored.
   *
   * TypeScript _cannot_ compile anything without a set of interfaces for key primitives like: `Array`, `Boolean`, `Function`, `IArguments`, `Number`, `Object`, `RegExp`, and `String`. It is expected that if you use `noLib` you will be including your own type definitions for these.
   *
   * @default false
   */
  noLib?: boolean

  /**
   * This setting ensures consistency between accessing a field via the "dot" (`obj.key`) syntax, and "indexed" (`obj["key"]`) and the way which the property is declared in the type.
   *
   * Without this flag, TypeScript will allow you to use the dot syntax to access fields which are not defined:
   *
   * ```ts twoslash
   * // @errors: 4111
   * declare function getSettings(): GameSettings;
   * // ---cut---
   * interface GameSettings {
   *   // Known up-front properties
   *   speed: "fast" | "medium" | "slow";
   *   quality: "high" | "low";
   *
   *   // Assume anything unknown to the interface
   *   // is a string.
   *   [key: string]: string;
   * }
   *
   * const settings = getSettings();
   * settings.speed;
   * //       ^?
   * settings.quality;
   * //       ^?
   *
   * // Unknown key accessors are allowed on
   * // this object, and are `string`
   * settings.username;
   * //       ^?
   * ```
   *
   * Turning the flag on will raise an error because the unknown field uses dot syntax instead of indexed syntax.
   *
   * ```ts twoslash
   * // @errors: 4111
   * // @noPropertyAccessFromIndexSignature
   * declare function getSettings(): GameSettings;
   * interface GameSettings {
   *   speed: "fast" | "medium" | "slow";
   *   quality: "high" | "low";
   *   [key: string]: string;
   * }
   * // ---cut---
   * const settings = getSettings();
   * settings.speed;
   * settings.quality;
   *
   * // This would need to be settings["username"];
   * settings.username;
   * //       ^?
   * ```
   *
   * The goal of this flag is to signal intent in your calling syntax about how certain you are this property exists.
   */
  noPropertyAccessFromIndexSignature?: boolean

  /**
   * By default, TypeScript will examine the initial set of files for `import` and `<reference` directives and add these resolved files to your program.
   *
   * If `noResolve` is set, this process doesn't happen.
   * However, `import` statements are still checked to see if they resolve to a valid module, so you'll need to make sure this is satisfied by some other means.
   *
   * @default false
   */
  noResolve?: boolean

  /**
   * TypeScript will unify type parameters when comparing two generic functions.
   *
   * ```ts twoslash
   * // @errors: 2322
   *
   * type A = <T, U>(x: T, y: U) => [T, U];
   * type B = <S>(x: S, y: S) => [S, S];
   *
   * function f(a: A, b: B) {
   *   b = a; // Ok
   *   a = b; // Error
   * }
   * ```
   *
   * This flag can be used to remove that check.
   *
   * @default false
   */
  noStrictGenericChecks?: boolean

  /**
   * TypeScript has a way to describe objects which have unknown keys but known values on an object, via index signatures.
   *
   * ```ts twoslash
   * interface EnvironmentVars {
   *   NAME: string;
   *   OS: string;
   *
   *   // Unknown properties are covered by this index signature.
   *   [propName: string]: string;
   * }
   *
   * declare const env: EnvironmentVars;
   *
   * // Declared as existing
   * const sysName = env.NAME;
   * const os = env.OS;
   * //    ^?
   *
   * // Not declared, but because of the index
   * // signature, then it is considered a string
   * const nodeEnv = env.NODE_ENV;
   * //    ^?
   * ```
   *
   * Turning on `noUncheckedIndexedAccess` will add `undefined` to any un-declared field in the type.
   *
   * ```ts twoslash
   * interface EnvironmentVars {
   *   NAME: string;
   *   OS: string;
   *
   *   // Unknown properties are covered by this index signature.
   *   [propName: string]: string;
   * }
   * // @noUncheckedIndexedAccess
   * // ---cut---
   * declare const env: EnvironmentVars;
   *
   * // Declared as existing
   * const sysName = env.NAME;
   * const os = env.OS;
   * //    ^?
   *
   * // Not declared, but because of the index
   * // signature, then it is considered a string
   * const nodeEnv = env.NODE_ENV;
   * //    ^?
   * ```
   */
  noUncheckedIndexedAccess?: boolean

  /**
   * In JavaScript it's possible to `import` a module without actually importing any values from it.
   *
   * ```ts
   * import "some-module";
   * ```
   *
   * These imports are often called *side effect imports* because the only useful behavior they can provide is by executing some side effect (like registering a global variable, or adding a polyfill to a prototype).
   *
   * By default, TypeScript will not check these imports for validity. If the import resolves to a valid source file, TypeScript will load and check the file.
   * If no source file is found, TypeScript will silently ignore the import.
   *
   * This is surprising behavior, but it partially stems from modeling patterns in the JavaScript ecosystem.
   * For example, this syntax has also been used with special loaders in bundlers to load CSS or other assets.
   * Your bundler might be configured in such a way where you can include specific `.css` files by writing something like the following:
   *
   * ```tsx
   * import "./button-component.css";
   *
   * export function Button() {
   *     // ...
   * }
   * ```
   *
   * Still, this masks potential typos on side effect imports.
   *
   * When `--noUncheckedSideEffectImports` is enabled, TypeScript will error if it can't find a source file for a side effect import.
   *
   * ```ts
   * import "oops-this-module-does-not-exist";
   * //     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   * // error: Cannot find module 'oops-this-module-does-not-exist' or its corresponding
   * //        type declarations.
   * ```
   *
   * When enabling this option, some working code may now receive an error, like in the CSS example above.
   * To work around this, users who want to just write side effect `import`s for assets might be better served by writing what's called an *ambient module declaration* with a wildcard specifier.
   * It would go in a global file and look something like the following:
   *
   * ```ts
   * // ./src/globals.d.ts
   *
   * // Recognize all CSS files as module imports.
   * declare module "*.css" {}
   * ```
   *
   * In fact, you might already have a file like this in your project!
   * For example, running something like `vite init` might create a similar `vite-env.d.ts`.
   *
   * @default false
   */
  noUncheckedSideEffectImports?: boolean

  /**
   * Report errors on unused local variables.
   *
   * ```ts twoslash
   * // @noUnusedLocals
   * // @errors: 6133
   * const createKeyboard = (modelID: number) => {
   *   const defaultModelID = 23;
   *   return { type: "keyboard", modelID };
   * };
   * ```
   *
   * @default false
   */
  noUnusedLocals?: boolean

  /**
   * Report errors on unused parameters in functions.
   *
   * ```ts twoslash
   * // @noUnusedParameters
   * // @errors: 6133
   * const createDefaultKeyboard = (modelID: number) => {
   *   const defaultModelID = 23;
   *   return { type: "keyboard", modelID: defaultModelID };
   * };
   * ```
   *
   * Parameters declaration with names starting with an underscore (`_`) are exempt from the unused parameter checking. e.g.:
   *
   * ```ts twoslash
   * // @noUnusedParameters
   * const createDefaultKeyboard = (_modelID: number) => {
   *   return { type: "keyboard" };
   * };
   * ```
   *
   * @default false
   */
  noUnusedParameters?: boolean

  /**
   * Deprecated setting. Use `outFile` instead.
   *
   * See more: https://www.typescriptlang.org/tsconfig#out
   */
  out?: string

  /**
   * If specified, `.js` (as well as `.d.ts`, `.js.map`, etc.) files will be emitted into this directory.
   * The directory structure of the original source files is preserved; see [`rootDir`](https://typescriptlang.org/tsconfig/#rootDir) if the computed root is not what you intended.
   *
   * If not specified, `.js` files will be emitted in the same directory as the `.ts` files they were generated from:
   *
   * ```sh
   * $ tsc
   *
   * example
   * ├── index.js
   * └── index.ts
   * ```
   *
   * With a `tsconfig.json` like this:
   *
   * ```json tsconfig
   * {
   *   "compilerOptions": {
   *     "outDir": "dist"
   *   }
   * }
   * ```
   *
   * Running `tsc` with these settings moves the files into the specified `dist` folder:
   *
   * ```sh
   * $ tsc
   *
   * example
   * ├── dist
   * │   └── index.js
   * ├── index.ts
   * └── tsconfig.json
   * ```
   */
  outDir?: string

  /**
   * If specified, all _global_ (non-module) files will be concatenated into the single output file specified.
   *
   * If `module` is `system` or `amd`, all module files will also be concatenated into this file after all global content.
   *
   * Note: `outFile` cannot be used unless `module` is `None`, `System`, or `AMD`.
   * This option _cannot_ be used to bundle CommonJS or ES6 modules.
   */
  outFile?: string

  /**
   * A series of entries which re-map imports to lookup locations relative to the [`baseUrl`](https://typescriptlang.org/tsconfig/#baseUrl) if set, or to the tsconfig file itself otherwise. There is a larger coverage of `paths` in [the `moduleResolution` reference page](https://typescriptlang.org/docs/handbook/modules/reference.html#paths).
   *
   * `paths` lets you declare how TypeScript should resolve an import in your `require`/`import`s.
   *
   * ```json tsconfig
   * {
   *   "compilerOptions": {
   *     "paths": {
   *       "jquery": ["./vendor/jquery/dist/jquery"]
   *     }
   *   }
   * }
   * ```
   *
   * This would allow you to be able to write `import "jquery"`, and get all of the correct typing locally.
   *
   * ```json tsconfig
   * {
   *   "compilerOptions": {
   *     "paths": {
   *         "app/*": ["./src/app/*"],
   *         "config/*": ["./src/app/_config/*"],
   *         "environment/*": ["./src/environments/*"],
   *         "shared/*": ["./src/app/_shared/*"],
   *         "helpers/*": ["./src/helpers/*"],
   *         "tests/*": ["./src/tests/*"]
   *     }
   *   }
   * }
   * ```
   *
   * In this case, you can tell the TypeScript file resolver to support a number of custom prefixes to find code.
   *
   * Note that this feature does not change how import paths are emitted by `tsc`, so `paths` should only be used to inform TypeScript that another tool has this mapping and will use it at runtime or when bundling.
   */
  paths?: object

  /**
   * List of language service plugins to run inside the editor.
   *
   * Language service plugins are a way to provide additional information to a user based on existing TypeScript files. They can enhance existing messages between TypeScript and an editor, or to provide their own error messages.
   *
   * For example:
   *
   * - [ts-sql-plugin](https://github.com/xialvjun/ts-sql-plugin#readme) &mdash; Adds SQL linting with a template strings SQL builder.
   * - [typescript-styled-plugin](https://github.com/Microsoft/typescript-styled-plugin) &mdash; Provides CSS linting inside template strings .
   * - [typescript-eslint-language-service](https://github.com/Quramy/typescript-eslint-language-service) &mdash; Provides eslint error messaging and fix-its inside the compiler's output.
   * - [ts-graphql-plugin](https://github.com/Quramy/ts-graphql-plugin) &mdash; Provides validation and auto-completion inside GraphQL query template strings.
   *
   * VS Code has the ability for a extension to [automatically include language service plugins](https://code.visualstudio.com/api/references/contribution-points#contributes.typescriptServerPlugins), and so you may have some running in your editor without needing to define them in your `tsconfig.json`.
   */
  plugins?: string[]

  /**
   * Do not erase `const enum` declarations in generated code. `const enum`s provide a way to reduce the overall memory footprint
   * of your application at runtime by emitting the enum value instead of a reference.
   *
   * For example with this TypeScript:
   *
   * ```ts twoslash
   * const enum Album {
   *   JimmyEatWorldFutures = 1,
   *   TubRingZooHypothesis = 2,
   *   DogFashionDiscoAdultery = 3,
   * }
   *
   * const selectedAlbum = Album.JimmyEatWorldFutures;
   * if (selectedAlbum === Album.JimmyEatWorldFutures) {
   *   console.log("That is a great choice.");
   * }
   * ```
   *
   * The default `const enum` behavior is to convert any `Album.Something` to the corresponding number literal, and to remove a reference
   * to the enum from the JavaScript completely.
   *
   * ```ts twoslash
   * // @showEmit
   * const enum Album {
   *   JimmyEatWorldFutures = 1,
   *   TubRingZooHypothesis = 2,
   *   DogFashionDiscoAdultery = 3,
   * }
   *
   * const selectedAlbum = Album.JimmyEatWorldFutures;
   * if (selectedAlbum === Album.JimmyEatWorldFutures) {
   *   console.log("That is a great choice.");
   * }
   * ```
   *
   * With `preserveConstEnums` set to `true`, the `enum` exists at runtime and the numbers are still emitted.
   *
   * ```ts twoslash
   * // @preserveConstEnums: true
   * // @showEmit
   * const enum Album {
   *   JimmyEatWorldFutures = 1,
   *   TubRingZooHypothesis = 2,
   *   DogFashionDiscoAdultery = 3,
   * }
   *
   * const selectedAlbum = Album.JimmyEatWorldFutures;
   * if (selectedAlbum === Album.JimmyEatWorldFutures) {
   *   console.log("That is a great choice.");
   * }
   * ```
   *
   * This essentially makes such `const enums` a source-code feature only, with no runtime traces.
   *
   * @default false
   */
  preserveConstEnums?: boolean

  /**
   * This is to reflect the same flag in Node.js; which does not resolve the real path of symlinks.
   *
   * This flag also exhibits the opposite behavior to Webpack’s `resolve.symlinks` option (i.e. setting TypeScript’s `preserveSymlinks` to true parallels setting Webpack’s `resolve.symlinks` to false, and vice-versa).
   *
   * With this enabled, references to modules and packages (e.g. `import`s and `/// <reference type="..." />` directives) are all resolved relative to the location of the symbolic link file, rather than relative to the path that the symbolic link resolves to.
   *
   * @default false
   */
  preserveSymlinks?: boolean

  /**
   * Deprecated in favor of [`verbatimModuleSyntax`](https://typescriptlang.org/tsconfig/#verbatimModuleSyntax).
   *
   * There are some cases where TypeScript can't detect that you're using an import. For example, take the following code:
   *
   * ```ts
   * import { Animal } from "./animal.js";
   *
   * eval("console.log(new Animal().isDangerous())");
   * ```
   *
   * or code using 'Compiles to HTML' languages like Svelte or Vue. `preserveValueImports` will prevent TypeScript from removing the import, even if it appears unused.
   *
   * When combined with [`isolatedModules`](https://typescriptlang.org/tsconfig/#isolatedModules): imported types _must_ be marked as type-only because compilers that process single files at a time have no way of knowing whether imports are values that appear unused, or a type that must be removed in order to avoid a runtime crash.
   *
   * @default false
   */
  preserveValueImports?: boolean

  /**
   * Whether to keep outdated console output in watch mode instead of clearing the screen every time a change happened.
   */
  preserveWatchOutput?: boolean

  /**
   * Stylize errors and messages using color and context, this is on by default &mdash; offers you a chance to have less terse,
   * single colored messages from the compiler.
   *
   * @default true
   */
  pretty?: boolean

  /**
   * Use [`jsxFactory`](https://typescriptlang.org/tsconfig/#jsxFactory) instead. Specify the object invoked for `createElement` when targeting `react` for TSX files.
   *
   * @default 'React'
   */
  reactNamespace?: string

  /**
   * Strips all comments from TypeScript files when converting into JavaScript. Defaults to `false`.
   *
   * For example, this is a TypeScript file which has a JSDoc comment:
   *
   * ```ts
   * \/** The translation of 'Hello world' into Portuguese *\/
   * export const helloWorldPTBR = "Olá Mundo";
   * ```
   *
   * When `removeComments` is set to `true`:
   *
   * ```ts twoslash
   * // @showEmit
   * // @removeComments: true
   * \/** The translation of 'Hello world' into Portuguese *\/
   * export const helloWorldPTBR = "Olá Mundo";
   * ```
   *
   * Without setting `removeComments` or having it as `false`:
   *
   * ```ts twoslash
   * // @showEmit
   * // @removeComments: false
   * \/** The translation of 'Hello world' into Portuguese *\/
   * export const helloWorldPTBR = "Olá Mundo";
   * ```
   *
   * This means that your comments will show up in the JavaScript code.
   *
   * @default false
   */
  removeComments?: boolean

  /**
   * Allows importing modules with a `.json` extension, which is a common practice in node projects. This includes
   * generating a type for the `import` based on the static JSON shape.
   *
   * TypeScript does not support resolving JSON files by default:
   *
   * ```ts twoslash
   * // @errors: 2732
   * // @filename: settings.json
   * {
   *     "repo": "TypeScript",
   *     "dry": false,
   *     "debug": false
   * }
   * // @filename: index.ts
   * import settings from "./settings.json";
   *
   * settings.debug === true;
   * settings.dry === 2;
   * ```
   *
   * Enabling the option allows importing JSON, and validating the types in that JSON file.
   *
   * ```ts twoslash
   * // @errors: 2367
   * // @resolveJsonModule
   * // @module: commonjs
   * // @moduleResolution: node
   * // @filename: settings.json
   * {
   *     "repo": "TypeScript",
   *     "dry": false,
   *     "debug": false
   * }
   * // @filename: index.ts
   * import settings from "./settings.json";
   *
   * settings.debug === true;
   * settings.dry === 2;
   * ```
   *
   * @default false
   */
  resolveJsonModule?: boolean

  /**
   * `--resolvePackageJsonExports` forces TypeScript to consult [the `exports` field of `package.json` files](https://nodejs.org/api/packages.html#exports) if it ever reads from a package in `node_modules`.
   *
   * This option defaults to `true` under the `node16`, `nodenext`, and `bundler` options for [`--moduleResolution`](https://typescriptlang.org/tsconfig/#moduleResolution).
   *
   * @default false
   */
  resolvePackageJsonExports?: boolean

  /**
   * `--resolvePackageJsonImports` forces TypeScript to consult [the `imports` field of `package.json` files](https://nodejs.org/api/packages.html#imports) when performing a lookup that starts with `#` from a file whose ancestor directory contains a `package.json`.
   *
   * This option defaults to `true` under the `node16`, `nodenext`, and `bundler` options for [`--moduleResolution`](https://typescriptlang.org/tsconfig/#moduleResolution).
   *
   * @default false
   */
  resolvePackageJsonImports?: boolean

  /**
   * Rewrite `.ts`, `.tsx`, `.mts`, and `.cts` file extensions in relative import paths to their JavaScript equivalent in output files.
   *
   * For more information, see the [TypeScript 5.7 release notes](https://typescriptlang.org/docs/handbook/release-notes/typescript-5-7.html#path-rewriting-for-relative-paths).
   *
   * @default false
   */
  rewriteRelativeImportExtensions?: boolean

  /**
   * **Default**: The longest common path of all non-declaration input files. If [`composite`](https://typescriptlang.org/tsconfig/#composite) is set, the default is instead the directory containing the `tsconfig.json` file.
   *
   * When TypeScript compiles files, it keeps the same directory structure in the output directory as exists in the input directory.
   *
   * For example, let's say you have some input files:
   *
   * ```
   * MyProj
   * ├── tsconfig.json
   * ├── core
   * │   ├── a.ts
   * │   ├── b.ts
   * │   ├── sub
   * │   │   ├── c.ts
   * ├── types.d.ts
   * ```
   *
   * The inferred value for `rootDir` is the longest common path of all non-declaration input files, which in this case is `core/`.
   *
   * If your [`outDir`](https://typescriptlang.org/tsconfig/#outDir) was `dist`, TypeScript would write this tree:
   *
   * ```
   * MyProj
   * ├── dist
   * │   ├── a.js
   * │   ├── b.js
   * │   ├── sub
   * │   │   ├── c.js
   * ```
   *
   * However, you may have intended for `core` to be part of the output directory structure.
   * By setting `rootDir: "."` in `tsconfig.json`, TypeScript would write this tree:
   *
   * ```
   * MyProj
   * ├── dist
   * │   ├── core
   * │   │   ├── a.js
   * │   │   ├── b.js
   * │   │   ├── sub
   * │   │   │   ├── c.js
   * ```
   *
   * Importantly, `rootDir` **does not affect which files become part of the compilation**.
   * It has no interaction with the [`include`](https://typescriptlang.org/tsconfig/#include), [`exclude`](https://typescriptlang.org/tsconfig/#exclude), or [`files`](https://typescriptlang.org/tsconfig/#files) `tsconfig.json` settings.
   *
   * Note that TypeScript will never write an output file to a directory outside of [`outDir`](https://typescriptlang.org/tsconfig/#outDir), and will never skip emitting a file.
   * For this reason, `rootDir` also enforces that all files which need to be emitted are underneath the `rootDir` path.
   *
   * For example, let's say you had this tree:
   *
   * ```
   * MyProj
   * ├── tsconfig.json
   * ├── core
   * │   ├── a.ts
   * │   ├── b.ts
   * ├── helpers.ts
   * ```
   *
   * It would be an error to specify `rootDir` as `core` _and_ [`include`](https://typescriptlang.org/tsconfig/#include) as `*` because it creates a file (`helpers.ts`) that would need to be emitted _outside_ the [`outDir`](https://typescriptlang.org/tsconfig/#outDir) (i.e. `../helpers.js`).
   */
  rootDir?: string

  /**
   * Using `rootDirs`, you can inform the compiler that there are many "virtual" directories acting as a single root.
   * This allows the compiler to resolve relative module imports within these "virtual" directories, as if they were merged in to one directory.
   *
   * For example:
   *
   * ```
   *  src
   *  └── views
   *      └── view1.ts (can import "./template1", "./view2`)
   *      └── view2.ts (can import "./template1", "./view1`)
   *
   *  generated
   *  └── templates
   *          └── views
   *              └── template1.ts (can import "./view1", "./view2")
   * ```
   *
   * ```json tsconfig
   * {
   *   "compilerOptions": {
   *     "rootDirs": ["src/views", "generated/templates/views"]
   *   }
   * }
   * ```
   *
   * This does not affect how TypeScript emits JavaScript, it only emulates the assumption that they will be able to
   * work via those relative paths at runtime.
   *
   * `rootDirs` can be used to provide a separate "type layer" to files that are not TypeScript or JavaScript by providing a home for generated `.d.ts` files in another folder. This technique is useful for bundled applications where you use `import` of files that aren't necessarily code:
   *
   * ```sh
   *  src
   *  └── index.ts
   *  └── css
   *      └── main.css
   *      └── navigation.css
   *
   *  generated
   *  └── css
   *      └── main.css.d.ts
   *      └── navigation.css.d.ts
   * ```
   *
   * ```json tsconfig
   * {
   *   "compilerOptions": {
   *     "rootDirs": ["src", "generated"]
   *   }
   * }
   * ```
   *
   * This technique lets you generate types ahead of time for the non-code source files. Imports then work naturally based off the source file's location.
   * For example `./src/index.ts` can import the file `./src/css/main.css` and TypeScript will be aware of the bundler's behavior for that filetype via the corresponding generated declaration file.
   *
   * ```ts twoslash
   * // @filename: main.css.d.ts
   * export const appClass = "mainClassF3EC2";
   * // ---cut---
   * // @filename: index.ts
   * import { appClass } from "./main.css";
   * ```
   */
  rootDirs?: string[]

  /**
   * Use [`skipLibCheck`](https://typescriptlang.org/tsconfig/#skipLibCheck) instead. Skip type checking of default library declaration files.
   *
   * @default false
   */
  skipDefaultLibCheck?: boolean

  /**
   * Skip type checking of declaration files.
   *
   * This can save time during compilation at the expense of type-system accuracy. For example, two libraries could
   * define two copies of the same `type` in an inconsistent way. Rather than doing a full check of all `d.ts` files, TypeScript
   * will type check the code you specifically refer to in your app's source code.
   *
   * A common case where you might think to use `skipLibCheck` is when there are two copies of a library's types in
   * your `node_modules`. In these cases, you should consider using a feature like [yarn's resolutions](https://yarnpkg.com/lang/en/docs/selective-version-resolutions/)
   * to ensure there is only one copy of that dependency in your tree or investigate how to ensure there is
   * only one copy by understanding the dependency resolution to fix the issue without additional tooling.
   *
   * Another possibility is when you are migrating between TypeScript releases and the changes cause breakages in node_modules and the JS standard libraries which you do not want to deal with during the TypeScript update.
   *
   * Note, that if these issues come from the TypeScript standard library you can replace the library using [TypeScript 4.5's lib replacement](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-5.html#supporting-lib-from-node_modules) technique.
   *
   * @default false
   */
  skipLibCheck?: boolean

  /**
   * Enables the generation of [sourcemap files](https://developer.mozilla.org/docs/Tools/Debugger/How_to/Use_a_source_map).
   * These files allow debuggers and other tools to display the original TypeScript source code when actually working with the emitted JavaScript files.
   * Source map files are emitted as `.js.map` (or `.jsx.map`) files next to the corresponding `.js` output file.
   *
   * The `.js` files will in turn contain a sourcemap comment to indicate where the files are to external tools, for example:
   *
   * ```ts
   * // helloWorld.ts
   * export declare const helloWorld = "hi";
   * ```
   *
   * Compiling with `sourceMap` set to `true` creates the following JavaScript file:
   *
   * ```js
   * // helloWorld.js
   * "use strict";
   * Object.defineProperty(exports, "__esModule", { value: true });
   * exports.helloWorld = "hi";
   * //# sourceMappingURL=// helloWorld.js.map
   * ```
   *
   * And this also generates this json map:
   *
   * ```json
   * // helloWorld.js.map
   * {
   *   "version": 3,
   *   "file": "ex.js",
   *   "sourceRoot": "",
   *   "sources": ["../ex.ts"],
   *   "names": [],
   *   "mappings": ";;AAAa,QAAA,UAAU,GAAG,IAAI,CAAA"
   * }
   * ```
   *
   * @default false
   */
  sourceMap?: boolean

  /**
   * Specify the location where a debugger should locate TypeScript files instead of relative source locations.
   * This string is treated verbatim inside the source-map where you can use a path or a URL:
   *
   * ```json tsconfig
   * {
   *   "compilerOptions": {
   *     "sourceMap": true,
   *     "sourceRoot": "https://my-website.com/debug/source/"
   *   }
   * }
   * ```
   *
   * Would declare that `index.js` will have a source file at `https://my-website.com/debug/source/index.ts`.
   */
  sourceRoot?: string

  /**
   * The `strict` flag enables a wide range of type checking behavior that results in stronger guarantees of program correctness.
   * Turning this on is equivalent to enabling all of the _strict mode family_ options, which are outlined below.
   * You can then turn off individual strict mode family checks as needed.
   *
   * Future versions of TypeScript may introduce additional stricter checking under this flag, so upgrades of TypeScript might result in new type errors in your program.
   * When appropriate and possible, a corresponding flag will be added to disable that behavior.
   *
   * @default false
   */
  strict?: boolean

  /**
   * When set, TypeScript will check that the built-in methods of functions `call`, `bind`, and `apply` are invoked with correct argument for the underlying function:
   *
   * ```ts twoslash
   * // @strictBindCallApply: true
   * // @errors: 2345
   *
   * // With strictBindCallApply on
   * function fn(x: string) {
   *   return parseInt(x);
   * }
   *
   * const n1 = fn.call(undefined, "10");
   *
   * const n2 = fn.call(undefined, false);
   * ```
   *
   * Otherwise, these functions accept any arguments and will return `any`:
   *
   * ```ts twoslash
   * // @strictBindCallApply: false
   *
   * // With strictBindCallApply off
   * function fn(x: string) {
   *   return parseInt(x);
   * }
   *
   * // Note: No error; return type is 'any'
   * const n = fn.call(undefined, false);
   * ```
   *
   * @default false
   */
  strictBindCallApply?: boolean

  /**
   * Built-in iterators are instantiated with a `TReturn` type of undefined instead of `any`.
   *
   * @default false
   */
  strictBuiltinIteratorReturn?: boolean

  /**
   * When enabled, this flag causes functions parameters to be checked more correctly.
   *
   * Here's a basic example with `strictFunctionTypes` off:
   *
   * ```ts twoslash
   * // @strictFunctionTypes: false
   * function fn(x: string) {
   *   console.log("Hello, " + x.toLowerCase());
   * }
   *
   * type StringOrNumberFunc = (ns: string | number) => void;
   *
   * // Unsafe assignment
   * let func: StringOrNumberFunc = fn;
   * // Unsafe call - will crash
   * func(10);
   * ```
   *
   * With `strictFunctionTypes` _on_, the error is correctly detected:
   *
   * ```ts twoslash
   * // @errors: 2322
   * function fn(x: string) {
   *   console.log("Hello, " + x.toLowerCase());
   * }
   *
   * type StringOrNumberFunc = (ns: string | number) => void;
   *
   * // Unsafe assignment is prevented
   * let func: StringOrNumberFunc = fn;
   * ```
   *
   * During development of this feature, we discovered a large number of inherently unsafe class hierarchies, including some in the DOM.
   * Because of this, the setting only applies to functions written in _function_ syntax, not to those in _method_ syntax:
   *
   * ```ts twoslash
   * type Methodish = {
   *   func(x: string | number): void;
   * };
   *
   * function fn(x: string) {
   *   console.log("Hello, " + x.toLowerCase());
   * }
   *
   * // Ultimately an unsafe assignment, but not detected
   * const m: Methodish = {
   *   func: fn,
   * };
   * m.func(10);
   * ```
   *
   * @default false
   */
  strictFunctionTypes?: boolean

  /**
   * When `strictNullChecks` is `false`, `null` and `undefined` are effectively ignored by the language.
   * This can lead to unexpected errors at runtime.
   *
   * When `strictNullChecks` is `true`, `null` and `undefined` have their own distinct types and you'll get a type error if you try to use them where a concrete value is expected.
   *
   * For example with this TypeScript code, `users.find` has no guarantee that it will actually find a user, but you can
   * write code as though it will:
   *
   * ```ts twoslash
   * // @strictNullChecks: false
   * // @target: ES2015
   * declare const loggedInUsername: string;
   *
   * const users = [
   *   { name: "Oby", age: 12 },
   *   { name: "Heera", age: 32 },
   * ];
   *
   * const loggedInUser = users.find((u) => u.name === loggedInUsername);
   * console.log(loggedInUser.age);
   * ```
   *
   * Setting `strictNullChecks` to `true` will raise an error that you have not made a guarantee that the `loggedInUser` exists before trying to use it.
   *
   * ```ts twoslash
   * // @errors: 2339 2532 18048
   * // @target: ES2020
   * // @strictNullChecks
   * declare const loggedInUsername: string;
   *
   * const users = [
   *   { name: "Oby", age: 12 },
   *   { name: "Heera", age: 32 },
   * ];
   *
   * const loggedInUser = users.find((u) => u.name === loggedInUsername);
   * console.log(loggedInUser.age);
   * ```
   *
   * The second example failed because the array's `find` function looks a bit like this simplification:
   *
   * ```ts
   * // When strictNullChecks: true
   * type Array = {
   *   find(predicate: (value: any, index: number) => boolean): S | undefined;
   * };
   *
   * // When strictNullChecks: false the undefined is removed from the type system,
   * // allowing you to write code which assumes it always found a result
   * type Array = {
   *   find(predicate: (value: any, index: number) => boolean): S;
   * };
   * ```
   *
   * @default false
   */
  strictNullChecks?: boolean

  /**
   * When set to true, TypeScript will raise an error when a class property was declared but not set in the constructor.
   *
   * ```ts twoslash
   * // @errors: 2564
   * class UserAccount {
   *   name: string;
   *   accountType = "user";
   *
   *   email: string;
   *   address: string | undefined;
   *
   *   constructor(name: string) {
   *     this.name = name;
   *     // Note that this.email is not set
   *   }
   * }
   * ```
   *
   * In the above case:
   *
   * - `this.name` is set specifically.
   * - `this.accountType` is set by default.
   * - `this.email` is not set and raises an error.
   * - `this.address` is declared as potentially `undefined` which means it does not have to be set.
   *
   * @default false
   */
  strictPropertyInitialization?: boolean

  /**
   * Do not emit declarations for code that has an `@internal` annotation in its JSDoc comment.
   * This is an internal compiler option; use at your own risk, because the compiler does not check that the result is valid.
   * If you are searching for a tool to handle additional levels of visibility within your `d.ts` files, look at [api-extractor](https://api-extractor.com/).
   *
   * ```ts twoslash
   * \/\*\*
   *  \* Days available in a week
   *  \* \@internal
   *  *\/
   * export const daysInAWeek = 7;
   *
   * \/** Calculate how much someone earns in a week *\/
   * export function weeklySalary(dayRate: number) {
   *   return daysInAWeek * dayRate;
   * }
   * ```
   *
   * With the flag set to `false` (default):
   *
   * ```ts twoslash
   * // @showEmittedFile: index.d.ts
   * // @showEmit
   * // @declaration
   * \/\*\*
   *  \* Days available in a week
   *  \* \@internal
   *  *\/
   * export const daysInAWeek = 7;
   *
   * \/** Calculate how much someone earns in a week *\/
   * export function weeklySalary(dayRate: number) {
   *   return daysInAWeek * dayRate;
   * }
   * ```
   *
   * With `stripInternal` set to `true` the `d.ts` emitted will be redacted.
   *
   * ```ts twoslash
   * // @stripinternal
   * // @showEmittedFile: index.d.ts
   * // @showEmit
   * // @declaration
   * \/\*\*
   *  \* Days available in a week
   *  \* \@internal
   *  *\/
   * export const daysInAWeek = 7;
   *
   * \/** Calculate how much someone earns in a week *\/
   * export function weeklySalary(dayRate: number) {
   *   return daysInAWeek * dayRate;
   * }
   * ```
   *
   * The JavaScript output is still the same.
   */
  stripInternal?: boolean

  /**
   * This disables reporting of excess property errors, such as the one shown in the following example:
   *
   * ```ts twoslash
   * // @errors: 2322
   * type Point = { x: number; y: number };
   * const p: Point = { x: 1, y: 3, m: 10 };
   * ```
   *
   * This flag was added to help people migrate to the stricter checking of new object literals in [TypeScript 1.6](https://typescriptlang.org/docs/handbook/release-notes/typescript-1-6.html#stricter-object-literal-assignment-checks).
   *
   * We don't recommend using this flag in a modern codebase, you can suppress one-off cases where you need it using `// @ts-ignore`.
   *
   * @default false
   */
  suppressExcessPropertyErrors?: boolean

  /**
   * Turning `suppressImplicitAnyIndexErrors` on suppresses reporting the error about implicit anys when indexing into objects, as shown in the following example:
   *
   * ```ts twoslash
   * // @noImplicitAny: true
   * // @suppressImplicitAnyIndexErrors: false
   * // @strict: true
   * // @errors: 7053
   * const obj = { x: 10 };
   * console.log(obj["foo"]);
   * ```
   *
   * Using `suppressImplicitAnyIndexErrors` is quite a drastic approach. It is recommended to use a `@ts-ignore` comment instead:
   *
   * ```ts twoslash
   * // @noImplicitAny: true
   * // @strict: true
   * const obj = { x: 10 };
   * // @ts-ignore
   * console.log(obj["foo"]);
   * ```
   *
   * @default false
   */
  suppressImplicitAnyIndexErrors?: boolean

  /**
   * Modern browsers support all ES6 features, so `ES6` is a good choice.
   * You might choose to set a lower target if your code is deployed to older environments, or a higher target if your code is guaranteed to run in newer environments.
   *
   * The `target` setting changes which JS features are downleveled and which are left intact.
   * For example, an arrow function `() => this` will be turned into an equivalent `function` expression if `target` is ES5 or lower.
   *
   * Changing `target` also changes the default value of [`lib`](https://typescriptlang.org/tsconfig/#lib).
   * You may "mix and match" `target` and `lib` settings as desired, but you could just set `target` for convenience.
   *
   * For developer platforms like Node there are baselines for the `target`, depending on the type of platform and its version. You can find a set of community organized TSConfigs at [tsconfig/bases](https://github.com/tsconfig/bases#centralized-recommendations-for-tsconfig-bases), which has configurations for common platforms and their versions.
   *
   * The special `ESNext` value refers to the highest version your version of TypeScript supports.
   * This setting should be used with caution, since it doesn't mean the same thing between different TypeScript versions and can make upgrades less predictable.
   *
   * @default 'es5'
   */
  target?: string

  /**
   * Enable tracing of the name resolution process. Requires TypeScript version 2.0 or later.
   *
   * @default false
   */
  traceResolution?: boolean

  /**
   * This setting lets you specify a file for storing incremental compilation information as a part of composite projects which enables faster
   * building of larger TypeScript codebases. You can read more about composite projects [in the handbook](https://typescriptlang.org/docs/handbook/project-references.html).
   *
   * The default depends on a combination of other settings:
   *
   * - If `outFile` is set, the default is `<outFile>.tsbuildinfo`.
   * - If `rootDir` and `outDir` are set, then the file is `<outDir>/<relative path to config from rootDir>/<config name>.tsbuildinfo`
   *   For example, if `rootDir` is `src`, `outDir` is `dest`, and the config is
   *   `./tsconfig.json`, then the default is `./tsconfig.tsbuildinfo`
   *   as the relative path from `src/` to `./tsconfig.json` is `../`.
   * - If `outDir` is set, then the default is `<outDir>/<config name>.tsbuildInfo`
   * - Otherwise, the default is `<config name>.tsbuildInfo`
   *
   * @default '.tsbuildinfo'
   */
  tsBuildInfoFile?: string

  /**
   * By default all _visible_ "`@types`" packages are included in your compilation.
   * Packages in `node_modules/@types` of any enclosing folder are considered _visible_.
   * For example, that means packages within `./node_modules/@types/`, `../node_modules/@types/`, `../../node_modules/@types/`, and so on.
   *
   * If `typeRoots` is specified, _only_ packages under `typeRoots` will be included. For example:
   *
   * ```json tsconfig
   * {
   *   "compilerOptions": {
   *     "typeRoots": ["./typings", "./vendor/types"]
   *   }
   * }
   * ```
   *
   * This config file will include _all_ packages under `./typings` and `./vendor/types`, and no packages from `./node_modules/@types`.
   * All paths are relative to the `tsconfig.json`.
   */
  typeRoots?: string[]

  /**
   * By default all _visible_ "`@types`" packages are included in your compilation.
   * Packages in `node_modules/@types` of any enclosing folder are considered _visible_.
   * For example, that means packages within `./node_modules/@types/`, `../node_modules/@types/`, `../../node_modules/@types/`, and so on.
   *
   * If `types` is specified, only packages listed will be included in the global scope. For instance:
   *
   * ```json tsconfig
   * {
   *   "compilerOptions": {
   *     "types": ["node", "jest", "express"]
   *   }
   * }
   * ```
   *
   * This `tsconfig.json` file will _only_ include `./node_modules/@types/node`, `./node_modules/@types/jest` and `./node_modules/@types/express`.
   * Other packages under `node_modules/@types/*` will not be included.
   *
   * ### What does this affect?
   *
   * This option does not affect how `@types/*` are included in your application code, for example if you had the above `compilerOptions` example with code like:
   *
   * ```ts
   * import * as moment from "moment";
   *
   * moment().format("MMMM Do YYYY, h:mm:ss a");
   * ```
   *
   * The `moment` import would be fully typed.
   *
   * When you have this option set, by not including a module in the `types` array it:
   *
   * - Will not add globals to your project (e.g `process` in node, or `expect` in Jest)
   * - Will not have exports appear as auto-import recommendations
   *
   * This feature differs from [`typeRoots`](https://typescriptlang.org/tsconfig/#typeRoots) in that it is about specifying only the exact types you want included, whereas [`typeRoots`](https://typescriptlang.org/tsconfig/#typeRoots) supports saying you want particular folders.
   */
  types?: string[]

  /**
   * This flag is used as part of migrating to the upcoming standard version of class fields. TypeScript introduced class fields many years before it was ratified in TC39. The latest version of the upcoming specification has a different runtime behavior to TypeScript's implementation but the same syntax.
   *
   * This flag switches to the upcoming ECMA runtime behavior.
   *
   * You can read more about the transition in [the 3.7 release notes](https://typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#the-usedefineforclassfields-flag-and-the-declare-property-modifier).
   *
   * @default false
   */
  useDefineForClassFields?: boolean

  /**
   * In TypeScript 4.0, support was added to allow changing the type of the variable in a catch clause from `any` to `unknown`. Allowing for code like:
   *
   * ```ts twoslash
   * // @useUnknownInCatchVariables
   * try {
   *   // ...
   * } catch (err: unknown) {
   *   // We have to verify err is an
   *   // error before using it as one.
   *   if (err instanceof Error) {
   *     console.log(err.message);
   *   }
   * }
   * ```
   *
   * This pattern ensures that error handling code becomes more comprehensive because you cannot guarantee that the object being thrown _is_ a Error subclass ahead of time. With the flag `useUnknownInCatchVariables` enabled, then you do not need the additional syntax (`: unknown`) nor a linter rule to try enforce this behavior.
   *
   * @default false
   */
  useUnknownInCatchVariables?: boolean

  /**
   * By default, TypeScript does something called *import elision*.
   * Basically, if you write something like
   *
   * ```ts
   * import { Car } from "./car";
   *
   * export function drive(car: Car) {
   *     // ...
   * }
   * ```
   *
   * TypeScript detects that you're only using an import for types and drops the import entirely.
   * Your output JavaScript might look something like this:
   *
   * ```js
   * export function drive(car) {
   *     // ...
   * }
   * ```
   *
   * Most of the time this is good, because if `Car` isn't a value that's exported from `./car`, we'll get a runtime error.
   *
   * But it does add a layer of complexity for certain edge cases.
   * For example, notice there's no statement like `import "./car";` - the import was dropped entirely.
   * That actually makes a difference for modules that have side-effects or not.
   *
   * TypeScript's emit strategy for JavaScript also has another few layers of complexity - import elision isn't always just driven by how an import is used - it often consults how a value is declared as well.
   * So it's not always clear whether code like the following
   *
   * ```ts
   * export { Car } from "./car";
   * ```
   *
   * should be preserved or dropped.
   * If `Car` is declared with something like a `class`, then it can be preserved in the resulting JavaScript file.
   * But if `Car` is only declared as a `type` alias or `interface`, then the JavaScript file shouldn't export `Car` at all.
   *
   * While TypeScript might be able to make these emit decisions based on information from across files, not every compiler can.
   *
   * The `type` modifier on imports and exports helps with these situations a bit.
   * We can make it explicit whether an import or export is only being used for type analysis, and can be dropped entirely in JavaScript files by using the `type` modifier.
   *
   * ```ts
   * // This statement can be dropped entirely in JS output
   * import type * as car from "./car";
   *
   * // The named import/export 'Car' can be dropped in JS output
   * import { type Car } from "./car";
   * export { type Car } from "./car";
   * ```
   *
   * `type` modifiers are not quite useful on their own - by default, module elision will still drop imports, and nothing forces you to make the distinction between `type` and plain imports and exports.
   * So TypeScript has the flag `--importsNotUsedAsValues` to make sure you use the `type` modifier, `--preserveValueImports` to prevent *some* module elision behavior, and `--isolatedModules` to make sure that your TypeScript code works across different compilers.
   * Unfortunately, understanding the fine details of those 3 flags is hard, and there are still some edge cases with unexpected behavior.
   *
   * TypeScript 5.0 introduces a new option called `--verbatimModuleSyntax` to simplify the situation.
   * The rules are much simpler - any imports or exports without a `type` modifier are left around.
   * Anything that uses the `type` modifier is dropped entirely.
   *
   * ```ts
   * // Erased away entirely.
   * import type { A } from "a";
   *
   * // Rewritten to 'import { b } from "bcd";'
   * import { b, type c, type d } from "bcd";
   *
   * // Rewritten to 'import {} from "xyz";'
   * import { type xyz } from "xyz";
   * ```
   *
   * With this new option, what you see is what you get.
   *
   * That does have some implications when it comes to module interop though.
   * Under this flag, ECMAScript `import`s and `export`s won't be rewritten to `require` calls when your settings or file extension implied a different module system.
   * Instead, you'll get an error.
   * If you need to emit code that uses `require` and `module.exports`, you'll have to use TypeScript's module syntax that predates ES2015:
   *
   * <table>
   * <thead>
   *     <tr>
   *         <th>Input TypeScript</th>
   *         <th>Output JavaScript</th>
   *     </tr>
   * </thead>
   *
   * <tr>
   * <td>
   *
   * ```ts
   * import foo = require("foo");
   * ```
   *
   * </td>
   * <td>
   *
   * ```js
   * const foo = require("foo");
   * ```
   *
   * </td>
   * </tr>
   * <tr>
   * <td>
   *
   * ```ts
   * function foo() {}
   * function bar() {}
   * function baz() {}
   *
   * export = {
   *     foo,
   *     bar,
   *     baz
   * };
   * ```
   *
   * </td>
   * <td>
   *
   * ```js
   * function foo() {}
   * function bar() {}
   * function baz() {}
   *
   * module.exports = {
   *     foo,
   *     bar,
   *     baz
   * };
   * ```
   *
   * </td>
   * </tr>
   * </table>
   *
   * While this is a limitation, it does help make some issues more obvious.
   * For example, it's very common to forget to set the [`type` field in `package.json`](https://nodejs.org/api/packages.html#type) under `--module node16`.
   * As a result, developers would start writing CommonJS modules instead of ES modules without realizing it, giving surprising lookup rules and JavaScript output.
   * This new flag ensures that you're intentional about the file type you're using because the syntax is intentionally different.
   *
   * Because `--verbatimModuleSyntax` provides a more consistent story than `--importsNotUsedAsValues` and `--preserveValueImports`, those two existing flags are being deprecated in its favor.
   *
   * For more details, read up on [the original pull request](https://github.com/microsoft/TypeScript/pull/52203) and [its proposal issue](https://github.com/microsoft/TypeScript/issues/51479).
   */
  verbatimModuleSyntax?: boolean

  /**
   * Watch input files.
   */
  watch?: boolean

  /**
   * Specify the strategy for watching directories under systems that lack recursive file-watching functionality. Requires TypeScript version 3.8 or later.
   *
   * @default 'useFsEvents'
   */
  watchDirectory?: string

  /**
   * Specify the strategy for watching individual files. Requires TypeScript version 3.8 or later.
   *
   * @default 'useFsEvents'
   */
  watchFile?: string
}
