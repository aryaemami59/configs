# @aryaemami/prettier-config

Prettier configuration

## Installation

#### NPM

```bash
npm install --save-dev @aryaemami/prettier-config
```

#### Yarn

```bash
yarn add --dev @aryaemami/prettier-config
```

#### PNPM

```bash
pnpm add --save-dev @aryaemami/prettier-config
```

#### Bun

```bash
bun add --dev @aryaemami/prettier-config
```

## Usage

**ECMAScript Modules (ESM) usage inside a file like `prettier.config.mjs`**:

```js
import { prettierConfig } from '@aryaemami/prettier-config'

export default prettierConfig
```

**CommonJS (CJS) usage inside a file like `prettier.config.cjs`**:

```js
module.exports = (async () =>
  (await import('@aryaemami/prettier-config')).prettierConfig)()
```

To avoid having to write JSDocs we also provide a `createPrettierConfig` function. This function already includes the default `prettierConfig` and you can pass in additional overrides as an argument.

**ECMAScript Modules (ESM) usage inside a file like `prettier.config.mjs`**:

```js
import { createPrettierConfig } from '@aryaemami/prettier-config'

export default createPrettierConfig({
  arrowParens: 'avoid',
  // ...Other additional overrides
})
```

**CommonJS (CJS) usage inside a file like `prettier.config.cjs`**:

```js
module.exports = (async () =>
  (await import('@aryaemami/prettier-config')).createPrettierConfig({
    arrowParens: 'avoid',
    // ...Other additional overrides
  }))()
```
