# @aryaemami59/vitest-config

Vitest configuration tailored for projects using TypeScript.

## Installation

#### NPM

```bash
npm install --save-dev @aryaemami59/vitest-config
```

#### Yarn

```bash
yarn add --dev @aryaemami59/vitest-config
```

#### PNPM

```bash
pnpm add --save-dev @aryaemami59/vitest-config
```

#### Bun

```bash
bun add --dev @aryaemami59/vitest-config
```

## Usage

**ECMAScript Modules (ESM) usage inside a file like `vitest.config.mjs`**:

```js
import { vitestConfig } from '@aryaemami59/vitest-config'

export default vitestConfig
```

**CommonJS (CJS) usage inside a file like `vitest.config.cjs`**:

```js
module.exports = (async () =>
  (await import('@aryaemami59/vitest-config')).vitestConfig)()
```

To avoid having to write JSDocs we also provide a `createVitestConfig` function. This function already includes the default `vitestConfig` and you can pass in additional overrides as an argument.

**ECMAScript Modules (ESM) usage inside a file like `vitest.config.mjs` or `vitest.config.mts`**:

```ts
import { createVitestConfig } from '@aryaemami59/vitest-config'

export default createVitestConfig({
  test: {
    environment: 'jsdom',
    // Other additional overrides
  },
})
```

**CommonJS (CJS) usage inside a file like `vitest.config.cjs` or `vitest.config.cts`**:

```ts
module.exports = (async () =>
  (await import('@aryaemami59/vitest-config')).createVitestConfig({
    test: {
      environment: 'jsdom',
      // Other additional overrides
    },
  }))()
```
