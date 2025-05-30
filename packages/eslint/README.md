# @aryaemami59/eslint-config

Flat ESLint configuration tailored for projects using TypeScript.

## Installation

#### NPM

```bash
npm install --save-dev @aryaemami59/eslint-config
```

#### Yarn

```bash
yarn add --dev @aryaemami59/eslint-config
```

#### PNPM

```bash
pnpm add --save-dev @aryaemami59/eslint-config
```

#### Bun

```bash
bun add --dev @aryaemami59/eslint-config
```

## Usage

**ECMAScript Modules (ESM) usage inside a file like `eslint.config.mts` or `eslint.config.mjs`**:

```ts
import { flatESLintConfig } from '@aryaemami59/eslint-config'

export default flatESLintConfig
```

**CommonJS (CJS) usage inside a file like `eslint.config.cts` or `eslint.config.cjs` (using `require`)**:

```ts
const { flatESLintConfig } = require('@aryaemami59/eslint-config')

module.exports = flatESLintConfig
```

**CommonJS (CJS) usage inside a file like `eslint.config.cjs` or `eslint.config.cts` (using dynamic import)**:

```ts
module.exports = (async () =>
  (await import('@aryaemami59/eslint-config')).flatESLintConfig)()
```

**CommonJS (CJS) usage inside a file like `eslint.config.cts` (using import and export assignment)**:

```ts
import eslintConfigModule = require('@aryaemami59/eslint-config')
import flatESLintConfig = eslintConfigModule.flatESLintConfig

export = flatESLintConfig
```

Navigating ESLint's configuration options can occasionally feel overwhelming, especially when trying to take advantage of TypeScript's strong typing for better IntelliSense support. To alleviate this complexity and enhance your development experience, we also provide a function called `createESLintConfig` that you can import and use to create your own ESLint configuration. This function already includes the default `flatESLintConfig` and you can pass in an array of flat configs as additional overrides.

**ECMAScript Modules (ESM) usage inside a file like `eslint.config.mts` or `eslint.config.mjs`**:

```ts
import { createESLintConfig } from '@aryaemami59/eslint-config'

export default createESLintConfig([
  {
    rules: {
      'no-console': [0],
    },
  },
  {
    // ...Other additional overrides
  },
])
```

**CommonJS (CJS) usage inside a file like `eslint.config.cts` or `eslint.config.cjs` (using `require`)**:

```ts
const { createESLintConfig } = require('@aryaemami59/eslint-config')

module.exports = createESLintConfig([
  {
    rules: {
      'no-console': [0],
    },
  },
  {
    // ...Other additional overrides
  },
])
```

**CommonJS (CJS) usage inside a file like `eslint.config.cts` or `eslint.config.cjs` (using dynamic import)**:

```ts
module.exports = (async () =>
  (await import('@aryaemami59/eslint-config')).createESLintConfig([
    {
      rules: {
        'no-console': [0],
      },
    },
    {
      // ...Other additional overrides
    },
  ]))()
```

**CommonJS (CJS) usage inside a file like `eslint.config.cts` (using import and export assignment)**:

```ts
import eslintConfigModule = require('@aryaemami59/eslint-config')
import createESLintConfig = eslintConfigModule.createESLintConfig

export = createESLintConfig([
  {
    rules: {
      'no-console': [0],
    },
  },
  {
    // ...Other additional overrides
  },
])
```
