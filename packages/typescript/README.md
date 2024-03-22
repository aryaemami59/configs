# @arya/tsconfig

Simple TypeScript configuration.

## Installation

#### NPM

```bash
npm install --save-dev @arya/tsconfig
```

#### Yarn

```bash
yarn add --dev @arya/tsconfig
```

#### PNPM

```bash
pnpm add --save-dev @arya/tsconfig
```

#### Bun

```bash
bun add --dev @arya/tsconfig
```

## Usage

**Inside a file like `tsconfig.json`**:

```json
{
  "extends": "@arya/tsconfig/base",
  "compilerOptions": {
    "outDir": "dist"
  }
}
```
