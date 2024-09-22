import type { Config } from 'prettier'

/**
 * Prettier configuration.
 *
 * @example
 * <caption>#### __ECMAScript Modules (ESM) usage inside a file like `prettier.config.mjs`__</caption>
 *
 * ```js
 * import { prettierConfig } from '@aryaemami59/prettier-config'
 *
 * export default prettierConfig
 * ```
 *
 * @example
 * <caption>#### __CommonJS (CJS) usage inside a file like `prettier.config.cjs` (using `require`)__</caption>
 *
 * ```js
 * const { prettierConfig } = require('@aryaemami59/prettier-config')
 *
 * module.exports = prettierConfig
 * ```
 *
 * @example
 * <caption>#### __CommonJS (CJS) usage inside a file like `prettier.config.cjs` (using dynamic import)__</caption>
 *
 * ```js
 * module.exports = (async () =>
 *   (await import('@aryaemami59/prettier-config')).prettierConfig)()
 * ```
 *
 * @public
 * @since 0.0.3
 */
export const prettierConfig: Config = {
  semi: false,
  singleQuote: true,
}

/**
 * A function that returns {@linkcode prettierConfig}
 * along with optional additional overrides.
 * It's made mainly to provide intellisense and eliminate
 * the need for manual type annotations using JSDoc comments.
 *
 * @param additionalOverrides - Optional additional overrides to apply to the configuration.
 * @returns An augmented version of the default {@linkcode prettierConfig}, incorporating any provided overrides.
 *
 * @example
 * <caption>#### __ECMAScript Modules (ESM) usage inside a file like `prettier.config.mjs`__</caption>
 *
 * ```js
 * import { createPrettierConfig } from '@aryaemami59/prettier-config'
 *
 * export default createPrettierConfig({
 *   arrowParens: 'avoid',
 *   // ...Other additional overrides
 * })
 * ```
 *
 * @example
 * <caption>#### __CommonJS (CJS) usage inside a file like `prettier.config.cjs` (using `require`)__</caption>
 *
 * ```js
 * const { createPrettierConfig } = require('@aryaemami59/prettier-config')
 *
 * module.exports = createPrettierConfig({
 *   arrowParens: 'avoid',
 *   // ...Other additional overrides
 * })
 * ```
 *
 * @example
 * <caption>#### __CommonJS (CJS) usage inside a file like `prettier.config.cjs` (using dynamic import)__</caption>
 *
 * ```js
 * module.exports = (async () =>
 *   (await import('@aryaemami59/prettier-config')).createPrettierConfig({
 *     arrowParens: 'avoid',
 *     // ...Other additional overrides
 *   }))()
 * ```
 *
 * @public
 * @since 0.0.3
 */
export const createPrettierConfig = (
  additionalOverrides: Config = {},
): Config => ({ ...prettierConfig, ...additionalOverrides })
