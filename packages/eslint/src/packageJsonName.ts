import packageJson from '../package.json' with { type: 'json' }

/**
 * This is used because if we import the package name from the
 * `package.json` file, it will be bundled into the final output,
 * which is not desired.
 *
 * @since 0.0.5
 * @internal
 */
export const packageJsonName = packageJson.name
