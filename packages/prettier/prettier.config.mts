import type { Config } from 'prettier'

/**
 * Prettier configuration
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
 * @returns An augmented version of the default `prettierConfig`, incorporating any provided overrides.
 */
export const createPrettierConfig = (
  additionalOverrides: Partial<Config> = {},
): Config => ({
  ...prettierConfig,
  ...additionalOverrides,
})

export default prettierConfig
