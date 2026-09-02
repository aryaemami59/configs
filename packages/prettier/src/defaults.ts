import type { Config } from './external.js'

/**
 * Default
 * {@link https://prettier.io/docs/configuration | Prettier configuration options}.
 *
 * **Note:** Previously referred to as `prettierConfig` in versions prior to 0.0.9.
 *
 * @example
 * <caption>__ECMAScript Modules (ESM) usage inside a file like `prettier.config.mts` or `prettier.config.mjs`__</caption>
 *
 * ```js
 * import { prettierConfigDefaults } from '@aryaemami59/prettier-config';
 *
 * export default prettierConfigDefaults;
 * ```
 *
 * @example
 * <caption>__CommonJS (CJS) usage inside a file like `prettier.config.cts` or `prettier.config.cjs` (using `require`)__</caption>
 *
 * ```js
 * const { prettierConfigDefaults } = require('@aryaemami59/prettier-config');
 *
 * module.exports = prettierConfigDefaults;
 * ```
 *
 * @example
 * <caption>__CommonJS (CJS) usage inside a file like `prettier.config.cts` or `prettier.config.cjs` (using dynamic import)__</caption>
 *
 * ```js
 * module.exports = (async () =>
 *   (await import('@aryaemami59/prettier-config')).prettierConfigDefaults)();
 * ```
 *
 * @public
 * @since 0.0.3
 */
export const prettierConfigDefaults = {
  semi: false,
  singleQuote: true,
} as const satisfies Config
