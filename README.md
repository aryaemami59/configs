# Configs

A collection of shareable configurations for ESLint, Prettier, TypeScript, and
Vitest, tuned for TypeScript projects and published as independent, installable
packages.

This is a [Yarn](https://yarnpkg.com) workspaces monorepo: each tool lives in its
own package under [`packages/`](./packages), can be installed on its own, and ships
both ESM and CommonJS entry points.

## What's Included

| Package                                           | npm name                       | Description                               |
| ------------------------------------------------- | ------------------------------ | ----------------------------------------- |
| [**ESLint**](./packages/eslint/README.md)         | `@aryaemami59/eslint-config`   | Flat ESLint configuration for TypeScript  |
| [**Prettier**](./packages/prettier/README.md)     | `@aryaemami59/prettier-config` | Prettier configuration                    |
| [**TypeScript**](./packages/typescript/README.md) | `@aryaemami59/tsconfig`        | A collection of TypeScript configurations |
| [**Vitest**](./packages/vitest/README.md)         | `@aryaemami59/vitest-config`   | Vitest configuration for TypeScript       |

Each package has its own README with full installation and usage instructions for
ESM, CommonJS (`require`, dynamic `import`, and `import`/`export` assignment), and
every supported package manager.

## Features

- **TypeScript-first** - every config is written for and tested against TypeScript
  projects.
- **Dual ESM / CJS output** - packages expose `import` and `require` entry points,
  so they work in `.mjs`/`.mts` and `.cjs`/`.cts` config files alike.
- **Composable** - each package ships a `create*` helper
  (`createESLintConfig`, `createPrettierConfig`, `createVitestConfig`,
  `createVitestProject`) that merges your overrides on top of the defaults with full
  IntelliSense.
- **Independently versioned** - install only the configs you need.

## Requirements

- [Node.js](https://nodejs.org) and a package manager
  ([npm](https://www.npmjs.com), [Yarn](https://yarnpkg.com),
  [pnpm](https://pnpm.io), or [Bun](https://bun.sh)).
- Each config declares its tool as a peer dependency:

  | Package                        | Peer dependencies                           |
  | ------------------------------ | ------------------------------------------- |
  | `@aryaemami59/eslint-config`   | `eslint@^9 \|\| ^10`, `typescript`          |
  | `@aryaemami59/prettier-config` | `prettier@^2 \|\| ^3`                       |
  | `@aryaemami59/vitest-config`   | `vite`, `vitest@^1 \|\| ^2 \|\| ^3 \|\| ^4` |
  | `@aryaemami59/tsconfig`        | _none_                                      |

## Quick Start

Install the config you need (examples use npm; substitute your package manager):

```bash
# ESLint
npm install --save-dev @aryaemami59/eslint-config

# Prettier
npm install --save-dev @aryaemami59/prettier-config

# TypeScript
npm install --save-dev @aryaemami59/tsconfig

# Vitest
npm install --save-dev @aryaemami59/vitest-config
```

Then reference it from the matching config file:

```ts
// eslint.config.mjs
import { flatESLintConfig } from '@aryaemami59/eslint-config'

export default flatESLintConfig
```

```js
// prettier.config.mjs
import { prettierConfigDefaults } from '@aryaemami59/prettier-config'

export default prettierConfigDefaults
```

```json
// tsconfig.json
{
  "extends": "@aryaemami59/tsconfig/node/esnext",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

```ts
// vitest.config.mts
import { vitestConfig } from '@aryaemami59/vitest-config'

export default vitestConfig
```

For overrides, CommonJS variants, and every export, see each package's README linked
in [What's Included](#whats-included).

## Repository Structure

```text
configs/
├── packages/        # Published configuration packages
│   ├── eslint/
│   ├── prettier/
│   ├── typescript/
│   └── vitest/
└── examples/        # Runnable consumer examples for each package
    ├── eslint/
    ├── prettier/
    ├── typescript/
    └── vitest/
```

The [`examples/`](./examples) workspaces consume the packages exactly as an end user
would, across ESM and CommonJS config-file flavors.

## Development

This repo uses [Yarn 4](https://yarnpkg.com) workspaces. Clone it and install
dependencies (the `postinstall` script builds every package):

```bash
git clone https://github.com/aryaemami59/configs.git
cd configs
yarn install
```

Available root scripts (each fans out across the workspaces):

| Script              | Description                                  |
| ------------------- | -------------------------------------------- |
| `yarn build`        | Build every workspace.                       |
| `yarn clean`        | Remove build artifacts from every workspace. |
| `yarn lint`         | Lint with the repo's own ESLint config.      |
| `yarn lint-fix`     | Lint and apply autofixes.                    |
| `yarn format`       | Format files with Prettier.                  |
| `yarn format-check` | Check formatting without writing.            |
| `yarn test`         | Run the Vitest test suite.                   |

## License

[MIT](./LICENSE) © [Arya Emami](https://github.com/aryaemami59)
