# @aryaemami59/vitest-config

Shareable [**Vitest**](https://vitest.dev) configuration tailored for projects using TypeScript.

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

### **`vitestConfig`**

Shareable [**Vitest**](https://vitest.dev) configuration tailored for projects using TypeScript.

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

### **`vitestProject`**

Shareable [**Vitest**](https://vitest.dev) configuration tailored for projects using TypeScript.

**ECMAScript Modules (ESM) usage inside a file like `vitest.config.mts` or `vitest.config.mjs`**

```ts
import { vitestProject } from '@aryaemami59/vitest-config'
export default vitestProject
```

**CommonJS (CJS) usage inside a file like `vitest.config.cts` or `vitest.config.cjs` (using `require`)**

```ts
const { vitestProject } = require('@aryaemami59/vitest-config')
module.exports = vitestProject
```

**CommonJS (CJS) usage inside a file like `vitest.config.cts` or `vitest.config.cjs` (using dynamic import)**

```ts
module.exports = (async () =>
  (await import('@aryaemami59/vitest-config')).vitestProject)()
```

**CommonJS (CJS) usage inside a file like `vitest.config.cts` (using import and export assignment)**

```ts
import vitestConfigModule = require('@aryaemami59/vitest-config')
import vitestProject = vitestConfigModule.vitestProject
export = vitestProject
```

### **`createVitestConfig`**

To avoid having to write JSDocs we also provide a `createVitestConfig` function. This function already includes the default **<a href="#vitestConfig">`vitestConfig`</a>** and you can pass in additional overrides as an argument.

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

### **`createVitestProject`**

A function that returns **<a href="#vitestProject">`vitestProject`</a>**
along with optional additional overrides.

**ECMAScript Modules (ESM) usage inside a file like `vitest.config.mts` or `vitest.config.mjs`**

```ts
import { createVitestProject } from '@aryaemami59/vitest-config'
export default createVitestProject({
  test: {
    environment: 'jsdom',
    // Other additional overrides
  },
})
```

**CommonJS (CJS) usage inside a file like `vitest.config.cts` or `vitest.config.cjs` (using `require`)**

```ts
const { createVitestProject } = require('@aryaemami59/vitest-config')
module.exports = createVitestProject({
  test: {
    environment: 'jsdom',
    // Other additional overrides
  },
})
```

**CommonJS (CJS) usage inside a file like `vitest.config.cts` or `vitest.config.cjs` (using dynamic import)**

```ts
module.exports = (async () =>
  (await import('@aryaemami59/vitest-config')).createVitestProject({
    test: {
      environment: 'jsdom',
      // Other additional overrides
    },
  }))()
```

**CommonJS (CJS) usage inside a file like `vitest.config.cts` (using import and export assignment)**

```ts
import vitestConfigModule = require('@aryaemami59/vitest-config')
import createVitestProject = vitestConfigModule.createVitestProject
export = createVitestProject({
  test: {
    environment: 'jsdom',
    // Other additional overrides
  },
})
```
