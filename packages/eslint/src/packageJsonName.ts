import packageJson from '@aryaemami59/eslint-config/package.json' with { type: 'json' }

/**
 * The name of this package, read from its `package.json` file.
 *
 * The value is extracted here because importing the package name from the
 * `package.json` file at each use site would bundle that file into the final
 * output, which is not desired.
 *
 * @since 0.0.5
 * @internal
 */
export const packageJsonName = packageJson.name
