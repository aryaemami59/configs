# @aryaemami59/prettier-config

Prettier configuration.

## Installation

#### NPM

```bash
npm install --save-dev @aryaemami59/prettier-config
```

#### Yarn

```bash
yarn add --dev @aryaemami59/prettier-config
```

#### PNPM

```bash
pnpm add --save-dev @aryaemami59/prettier-config
```

#### Bun

```bash
bun add --dev @aryaemami59/prettier-config
```

## Usage

**ECMAScript Modules (ESM) usage inside a file like `prettier.config.mjs`**:

```js
import { prettierConfig } from '@aryaemami59/prettier-config'

export default prettierConfig
```

**CommonJS (CJS) usage inside a file like `prettier.config.cjs` (using `require`)**:

```js
const { prettierConfig } = require('@aryaemami59/prettier-config')

module.exports = prettierConfig
```

**CommonJS (CJS) usage inside a file like `prettier.config.cjs` (using dynamic import)**:

```js
module.exports = (async () =>
  (await import('@aryaemami59/prettier-config')).prettierConfig)()
```

To avoid having to write JSDocs we also provide a `createPrettierConfig` function. This function already includes the default `prettierConfig` and you can pass in additional overrides as an argument.

**ECMAScript Modules (ESM) usage inside a file like `prettier.config.mjs`**:

```js
import { createPrettierConfig } from '@aryaemami59/prettier-config'

export default createPrettierConfig({
  arrowParens: 'avoid',
  // ...Other additional overrides
})
```

**CommonJS (CJS) usage inside a file like `prettier.config.cjs` (using `require`)**:

```js
const { createPrettierConfig } = require('@aryaemami59/prettier-config')

module.exports = createPrettierConfig({
  arrowParens: 'avoid',
  // ...Other additional overrides
})
```

**CommonJS (CJS) usage inside a file like `prettier.config.cjs` (using dynamic import)**:

```js
module.exports = (async () =>
  (await import('@aryaemami59/prettier-config')).createPrettierConfig({
    arrowParens: 'avoid',
    // ...Other additional overrides
  }))()
```
