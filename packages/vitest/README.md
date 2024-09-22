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

**ECMAScript Modules (ESM) usage inside a file like `vitest.config.mts` or `vitest.config.mjs`**:

```ts
import { vitestConfig } from '@aryaemami59/vitest-config'

export default vitestConfig
```

**CommonJS (CJS) usage inside a file like `vitest.config.cts` or `vitest.config.cjs` (using `require`)**:

```ts
const { vitestConfig } = require('@aryaemami59/vitest-config')

module.exports = vitestConfig
```

**CommonJS (CJS) usage inside a file like `vitest.config.cts` or `vitest.config.cjs` (using dynamic import)**:

```ts
module.exports = (async () =>
  (await import('@aryaemami59/vitest-config')).vitestConfig)()
```

**CommonJS (CJS) usage inside a file like `vitest.config.cts` (using import and export assignment)**:

```ts
import vitestConfigModule = require('@aryaemami59/vitest-config')
import vitestConfig = vitestConfigModule.vitestConfig

export = vitestConfig
```

To avoid having to write JSDocs we also provide a `createVitestConfig` function. This function already includes the default `vitestConfig` and you can pass in additional overrides as an argument.

**ECMAScript Modules (ESM) usage inside a file like `vitest.config.mts` or `vitest.config.mjs`**:

```ts
import { createVitestConfig } from '@aryaemami59/vitest-config'

export default createVitestConfig({
  test: {
    environment: 'jsdom',
    // Other additional overrides
  },
})
```

**CommonJS (CJS) usage inside a file like `vitest.config.cts` or `vitest.config.cjs` (using `require`)**:

```ts
const { createVitestConfig } = require('@aryaemami59/vitest-config')

module.exports = createVitestConfig({
  test: {
    environment: 'jsdom',
    // Other additional overrides
  },
})
```

**CommonJS (CJS) usage inside a file like `vitest.config.cts` or `vitest.config.cjs` (using dynamic import)**:

```ts
module.exports = (async () =>
  (await import('@aryaemami59/vitest-config')).createVitestConfig({
    test: {
      environment: 'jsdom',
      // Other additional overrides
    },
  }))()
```

**CommonJS (CJS) usage inside a file like `vitest.config.cts` (using import and export assignment)**:

```ts
import vitestConfigModule = require('@aryaemami59/vitest-config')
import createVitestConfig = vitestConfigModule.createVitestConfig

export = createVitestConfig({
  test: {
    environment: 'jsdom',
    // Other additional overrides
  },
})
```
