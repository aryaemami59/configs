# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this repo is

`configs-monorepo` - a private Yarn 4 workspace root that publishes four shared
configuration packages to npm. Every package is **also consumed by this repo
itself** (see [Dogfooding](#dogfooding)), which is the single most important
fact about the build.

| Directory             | npm package                    | Purpose                            |
| --------------------- | ------------------------------ | ---------------------------------- |
| `packages/eslint`     | `@aryaemami59/eslint-config`   | Flat ESLint config for TypeScript  |
| `packages/prettier`   | `@aryaemami59/prettier-config` | Prettier config                    |
| `packages/typescript` | `@aryaemami59/tsconfig`        | A collection of TypeScript configs |
| `packages/vitest`     | `@aryaemami59/vitest-config`   | Vitest config for TypeScript       |

Workspaces are `packages/*` and `examples/*`. All four packages, the private
root, and all four examples are kept at **one lockstep version** (currently
`0.0.8`).

## Commands

Run from the repo root unless noted:

```bash
yarn install       # NOTE: postinstall runs a full `yarn build`
yarn build         # yarn workspaces foreach -Atp run build
yarn clean
yarn typecheck     # tsc -p ${INIT_CWD}/tsconfig.json --noEmit
yarn lint          # yarn lint-fix to autofix
yarn format-check  # yarn format to write
yarn test          # vitest --run - this runs the examples/* projects
```

Before reporting a change complete, run `yarn typecheck`, `yarn lint`,
`yarn format-check`, and `yarn build`, and report the real result.

Full CI parity:

```bash
yarn dedupe --check --strategy highest
yarn workspaces foreach -Ap -j unlimited run format-check
yarn workspaces foreach -Ap -j unlimited run lint
yarn workspaces foreach -Ap -j unlimited run typecheck
cd packages/<pkg> && yarn pack   # then attw / publint against ./package.tgz
```

### The `${PROJECT_CWD}` / `${INIT_CWD}` pattern

Root scripts pin the **config** to the repo root and the **target** to the
directory the command was invoked from:

- `PROJECT_CWD` - repo root, Yarn-provided, constant. Selects which
  `eslint.config.mjs` / `prettier.config.mjs` to use.
- `INIT_CWD` - where you ran `yarn`. Selects what gets linted/formatted.

Child workspaces forward to the root script with `yarn run -T lint` while
keeping their own `INIT_CWD`. So `yarn lint` from `packages/eslint/` lints only
that folder, using the root config.

Exception: `test` and `typecheck` resolve `${INIT_CWD}/vitest.config.mts` and
`${INIT_CWD}/tsconfig.json`, so they only work from a directory that has those
files (the root and `examples/*`; `packages/*` define their own `typecheck`).

## Architecture

### Dogfooding

The root config files import the workspace packages' **built `dist/`**:

- `eslint.config.mjs` → `createESLintConfig` from `@aryaemami59/eslint-config`
- `prettier.config.mjs` → `createPrettierConfig`
- `vitest.config.mts` → `createVitestConfig`
- `tsconfig.json` → `extends: "@aryaemami59/tsconfig/nodenext/nodenext/with-js"`

Consequences, and they bite:

- `postinstall: yarn run build` exists because nothing can resolve its config
  until the packages are built. **A broken build blocks `yarn install`**, and
  `yarn add` / `yarn up` re-trigger it.
- Fix build errors before anything else; lint/format/test/typecheck cannot even
  load their configs otherwise.

### Package shape (eslint, prettier, vitest)

All three share an identical skeleton:

- `src/external.ts` is the **only** file that imports third-party modules.
  Everything else imports from it.
- `src/defaults.ts` holds plain data, `src/utils.ts` holds the `create*`
  factory, `src/index.ts` is a pure barrel.
- Dual publish via an `exports` map with a `bun` condition pointing at raw
  `src/index.ts` (which is why `files` ships `src/` as well as `dist/`).
- Built by **tsdown** (rolldown) via `tsdown.config.mts`, which emits **three
  separate builds**: ESM, CJS, and DTS-only (`generator: 'tsc'`). A local
  `removeCJSOutputsFromDTSBuilds` plugin strips non-`.d.*ts` chunks from the
  DTS pass. The three configs are effectively identical - keep them in sync.
- `tsconfig.json` (`noEmit`) for typechecking, `tsconfig.build.json`
  (`erasableSyntaxOnly`, `rootDir: ./src`) for the build.
- `publishConfig: { access: "public", provenance: true }`.

### `packages/typescript` is different

No `src/*.ts` - `src/` contains only generated tsconfig JSON. The real code is
in `scripts/` (and is published):

- `scripts/downloadSchema.ts` fetches `https://www.schemastore.org/tsconfig`
  into the repo-root `original_tsconfig.schema.json` (pristine copy, for
  diffing).
- `tsconfig.schema.json` at the repo root is the **hand-patched** copy.
- `scripts/build.ts` reads `tsconfig.schema.json` and generates both the 24
  tsconfig files under `src/` and `output.ts` (a 3.5k-line `CompilerOptions`
  type with JSDoc scraped from the schema).
- `src/create-react-app/tsconfig.json` is the one hand-written config - do not
  expect `build.ts` to regenerate it.
- `scripts/types.ts` and `scripts/typeHelpers.ts` are hand-maintained.

Adding a tsconfig variant means editing the `baseConfigs` table in
`scripts/build.ts`, re-running `yarn build`, **and** adding the matching
`exports` + `typesVersions` entries in `package.json`.

### Testing

**There are no tests inside `packages/*`.** All coverage lives in `examples/*`:

- Each example exists to prove the config loads from all six config-file
  flavors - `.ts .mts .cts .js .mjs .cjs`.
- `vitest.global.setup.mts` writes fixture files into `temp/` at run time and
  deletes them in teardown (set `KEEP_TEMP_DIR=true` to inspect them).
- Tests shell out to the **real CLI** (`eslint`, `tsc`, `prettier`) and assert
  on stdout/stderr, including Node 22.0-22.13 `ExperimentalWarning` carve-outs
  for `.cjs` configs.
- The root `vitest.config.mts` aggregates the examples as `projects`.
- CI goes further: it `yarn pack`s each package and installs the **tarball**
  into the example, so tests run against the published artifact, not the
  workspace link.

When adding an export, the test to add is usually in `examples/<pkg>/tests/`,
not in the package.

## Code conventions

Enforced by the repo's own ESLint/Prettier config - match them exactly.

- **No semicolons, single quotes.** Never reformat beyond the lines you touch.
- **`perfectionist` sorts everything alphabetically**: object keys, object-type
  and union members, named exports, ESLint rule keys, array includes, switch
  cases. `sort-imports` (declaration order) and `sort-modules` are off.
- **Type-only imports use a separate statement** - `import type { X } from 'y'`,
  never the inline `import { type X }` form. Same for exports.
- **`type` over `interface`** (`consistent-type-definitions: [2, 'type']`).
  `{}` is banned; use `EmptyObject` / `AnyObject` / `AnyNonNullishValue`.
- **Rule severities are numbers in arrays**: `[2]`, `[0]`, `[2, options]` -
  never `'error'` / `'off'`.
- **Chained `satisfies`** is the house idiom for validating literals against two
  type systems at once, e.g.
  `satisfies TSESLintFlatConfig.Config[] satisfies ConfigObject[]`.
- Relative imports carry an explicit extension: `.js` in the packages'
  `src/` (nodenext + `verbatimModuleSyntax`), `.ts` in
  `packages/typescript/scripts/`.
- Node builtins use namespace imports with the protocol:
  `import * as path from 'node:path'`.
- JSON imports use `with { type: 'json' }`.
- Every exported config object carries a `name` derived from
  `${packageJson.name}/...`.
- Files are named after their primary export.
- **JSDoc on every public symbol**: description, `@example` with a
  `<caption>__...__</caption>` showing the ESM/CJS usage forms,
  `{@linkcode X}` / `{@link url | text}` cross-refs, then `@since` and
  `@public` / `@internal` last.
- Deferred work is a `// TODO:` plus a link to the upstream issue, with the
  affected code commented out in place rather than deleted.

## Git and releases

- Work happens on **`develop`**; `master` is the default branch and gets
  fast-forwarded. Tags live on `master`.
- **Conventional Commits**, scope = the _package directory_ name (`eslint`,
  `typescript`, `vitest`, `prettier`), omitted for repo-wide changes. Breaking
  changes use `!` before the colon, never a `BREAKING CHANGE:` footer.
- Backtick every identifier, filename, dependency, and option in the subject.
- **No trailers, no `Co-authored-by`, no issue/PR refs, no emoji** - the entire
  360-commit history has zero of each. Do not add them.
- Bodies are optional; when present they are markdown bullet lists wrapped at
  ~72 columns.
- Recurring canonical subjects: `chore: update dependencies`,
  `chore: update Yarn to version X.Y.Z`, `ci: update GitHub actions`,
  `release <x.y.z>`.
- Releases are **manual**: hand-edit the version in all 9 `package.json` files,
  then run the `workflow_dispatch`-only `publish.yml` (per-package, with npm
  provenance). No changesets, no semantic-release.
- `release-commit.yml` publishes preview builds for every commit/PR via
  `pkg-pr-new`.

## Gotchas

- `yarn install`, `yarn add`, and `yarn up` all run a full build via
  `postinstall`. Budget time for it, and expect install to fail if the build is
  broken.
- `enableTransparentWorkspaces: false` and `nmSelfReferences: false` - local
  packages resolve **only** through the explicit `workspace:^` protocol, and a
  workspace cannot import itself by name.
- `.yarn/cache` is gitignored (no zero-installs); `yarn install` needs network.
- Prettier's ignore file is `.gitignore` (`--ignore-path`), not a
  `.prettierignore`.
- `.gitattributes` forces LF. On Windows, check `core.autocrlf` before
  committing.
- Local TypeScript is pinned `~6.0.3`; TS 7 is available as the alias
  `@typescript/native-preview: npm:typescript@^7.0.2`.
- Stale untracked `build/` directories exist next to `dist/` in some packages.
  Nothing references them and `yarn clean` does not remove them.

### Known-failing CI

As of 2026-07-28, the `CI` workflow is red on `develop`. Only the `typecheck`
job at `ts: 7.0` and `ts: next` fails: `yarn up typescript@7` re-triggers
`postinstall` → the tsdown DTS build crashes with
`TypeError: Cannot read properties of undefined (reading 'useCaseSensitiveFileNames')`.
Every other job, and the `Release Commit` workflow, is green. Do not treat this
as a regression from your change - but do verify it is still the _only_ failure.
