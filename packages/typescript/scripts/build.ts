#!/usr/bin/env node

import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import { format, resolveConfig } from 'prettier'
import * as ts from 'typescript'
import packageJson from '../package.json' with { type: 'json' }
import type { Module, ModuleResolution, TsConfigJson } from './types.ts'

const { ModuleResolutionKind, ModuleKind } = ts.server.protocol

type ModuleResolutionKindType = typeof ModuleResolutionKind

type ModuleKindType = typeof ModuleKind

const ROOT_DIRECTORY = path.join(import.meta.dirname, '..')

type DistributedOmit<
  ObjectType,
  KeyType extends keyof ObjectType,
> = ObjectType extends unknown ? Omit<ObjectType, KeyType> : never

/**
 * Any function with unknown arguments.
 *
 * @internal
 */
type UnknownFunction = (...args: unknown[]) => unknown

/**
 * An alias for type `{}`. Represents any value that is not `null` or `undefined`.
 * It is mostly used for semantic purposes to help distinguish between an
 * empty object type and `{}` as they are not the same.
 *
 * @internal
 */
type AnyNonNullishValue = NonNullable<unknown>

/**
 * Useful to flatten the type output to improve type hints shown in editors.
 * And also to transform an interface into a type to aide with assignability.
 * @see {@link https://github.com/sindresorhus/type-fest/blob/main/source/simplify.d.ts Source}
 *
 * @internal
 */
export type Simplify<T> = T extends UnknownFunction
  ? T
  : {
      [KeyType in keyof T]: T[KeyType]
    } & AnyNonNullishValue

export type ExtractStrict<
  T,
  U extends [U] extends [
    // Ensure every member of `U` extracts something from `T`
    U extends unknown ? (Extract<T, U> extends never ? never : U) : never,
  ]
    ? unknown
    : T,
> = Extract<T, U>

export type ExcludeStrict<
  T,
  U extends [U] extends [
    // Ensure every member of `U` excludes something from `T`
    U extends unknown ? ([T] extends [Exclude<T, U>] ? never : U) : never,
  ]
    ? unknown
    : T,
> = Exclude<T, U>

type KebabCase<
  StringType extends string,
  FirstRun extends boolean = true,
> = StringType extends `${infer FirstLetter}${infer Rest}`
  ? `${FirstLetter extends Lowercase<FirstLetter>
      ? FirstLetter extends `${number}`
        ? Rest extends `${number}`
          ? '-'
          : ''
        : ''
      : FirstRun extends true
        ? ''
        : '-'}${Lowercase<FirstLetter>}${KebabCase<Rest, false>}`
  : StringType

type ExtractLowercase<StringType extends string> =
  StringType extends Lowercase<StringType> ? StringType : never

type ExtractCapitalized<StringType extends string> =
  StringType extends Capitalize<StringType> ? StringType : never

type LowerCaseModuleResolutionKinds = ExcludeStrict<
  ExtractLowercase<ModuleResolution>,
  'classic'
>

type CapitalizedModuleResolutionKinds = ExcludeStrict<
  ExtractCapitalized<ModuleResolution>,
  'Classic'
>

type CapitalizedModuleKinds = ExcludeStrict<
  ExtractCapitalized<Module>,
  'AMD' | 'None' | 'System' | 'UMD'
>

type LowerCaseModuleKinds = ExcludeStrict<
  ExtractLowercase<Module>,
  'amd' | 'none' | 'system' | 'umd'
>

type CapitalizedToLowerCaseModuleResolutionKinds = {
  readonly [K in CapitalizedModuleResolutionKinds]: Lowercase<K>
}

type LowerCaseToCapitalizedModuleResolutionKinds = {
  readonly [K in CapitalizedModuleResolutionKinds as Lowercase<K>]: K
}

type PossibleModuleKinds = Simplify<{
  readonly [K in CapitalizedModuleResolutionKinds]: {
    readonly moduleResolution: Lowercase<K>
    readonly module: Lowercase<K> extends 'bundler'
      ? readonly ['esnext', 'preserve']
      : Lowercase<K> extends 'node' | 'node10'
        ? readonly ['esnext']
        : Lowercase<K> extends 'node16'
          ? readonly ['node16']
          : Lowercase<K> extends 'nodenext'
            ? readonly ['nodenext']
            : readonly ['esnext']
  }
}>

type BaseConfigs = {
  readonly [K in CapitalizedModuleResolutionKinds as Lowercase<K>]: Simplify<{
    readonly directory: KebabCase<K>
    readonly module: PossibleModuleKinds[K]['module'][0]
    readonly moduleResolution: Lowercase<K>
    readonly subDirectory: [1] extends [
      PossibleModuleKinds[K]['module']['length'],
    ]
      ? ''
      : PossibleModuleKinds[K]['module'][0]
  }>
}

const baseConfigs = {
  bundler: {
    directory: 'bundler',
    module: 'esnext',
    moduleResolution: 'bundler',
    subDirectory: 'esnext',
  },
  node: {
    directory: 'node',
    module: 'esnext',
    moduleResolution: 'node',
    subDirectory: '',
  },
  node10: {
    directory: 'node-10',
    module: 'esnext',
    moduleResolution: 'node10',
    subDirectory: '',
  },
  node16: {
    directory: 'node-16',
    module: 'node16',
    moduleResolution: 'node16',
    subDirectory: '',
  },
  nodenext: {
    directory: 'node-next',
    module: 'nodenext',
    moduleResolution: 'nodenext',
    subDirectory: '',
  },
} as const satisfies BaseConfigs

type AdditionalConfigs = {
  readonly [K in keyof PossibleModuleKinds as [1] extends [
    PossibleModuleKinds[K]['module']['length'],
  ]
    ? never
    : [undefined] extends [PossibleModuleKinds[K]['module']['1']]
      ? never
      : Lowercase<K>]: {
    readonly directory: KebabCase<K>
    readonly moduleResolution: PossibleModuleKinds[K]['moduleResolution']
  } & {
    [P in PossibleModuleKinds[K]['module'][ExtractStrict<
      keyof PossibleModuleKinds[K]['module'],
      number
    >]]: {
      readonly module: P
      readonly subDirectory: P
    }
  }[ExcludeStrict<
    PossibleModuleKinds[K]['module'][ExtractStrict<
      keyof PossibleModuleKinds[K]['module'],
      number
    >],
    PossibleModuleKinds[K]['module'][0]
  >]
}

const additionalConfigs = {
  bundler: {
    moduleResolution: 'bundler',
    module: 'preserve',
    directory: 'bundler',
    subDirectory: 'preserve',
  },
} as const satisfies AdditionalConfigs

const build = async () => {
  await Promise.all(
    [...Object.entries(baseConfigs), ...Object.entries(additionalConfigs)].map(
      async ([
        ,
        { directory, module: moduleKind, moduleResolution, subDirectory },
      ]) => {
        const directoryPath = path.join(ROOT_DIRECTORY, directory, subDirectory)

        const tsconfigJsonPath = path.join(directoryPath, 'tsconfig.json')

        const withJsDirectoryPath = path.join(directoryPath, 'with-js')

        const withJsTsConfigJsonPath = path.join(
          withJsDirectoryPath,
          'tsconfig.json',
        )

        await fs.mkdir(directoryPath, {
          recursive: true,
        })

        await fs.mkdir(withJsDirectoryPath, {
          recursive: true,
        })

        const baseTsconfigJson = {
          $schema: 'https://json.schemastore.org/tsconfig',
          compilerOptions: {},
          display: `TypeScript configuration with \`${moduleResolution}\` module resolution`,
        } as const satisfies TsConfigJson

        const withJsTsConfigJson = {
          ...baseTsconfigJson,
          compilerOptions: {
            allowJs: true,
            checkJs: true,
          },
          display: `TypeScript configuration with module set to \`${moduleKind}\`, module resolution set to \`${moduleResolution}\`, and JavaScript files support enabled`,
          extends: [packageJson.name, directory, subDirectory]
            .filter((e) => !!e)
            .join('/'),
        } as const satisfies TsConfigJson

        const tsconfigJson = {
          ...baseTsconfigJson,
          compilerOptions: {
            ...(moduleKind !== baseConfigs.node.module && {
              module: moduleKind,
            }),
            ...(moduleResolution !== 'node' && { moduleResolution }),
            ...(moduleResolution === 'node' && {
              allowSyntheticDefaultImports: true,
              declaration: true,
              esModuleInterop: true,
              forceConsistentCasingInFileNames: true,
              isolatedModules: true,
              jsx: 'react',
              lib: ['DOM', 'ESNext'],
              module: 'esnext',
              moduleDetection: 'force',
              moduleResolution,
              noEmit: false,
              noEmitOnError: true,
              noErrorTruncation: true,
              noFallthroughCasesInSwitch: true,
              noImplicitOverride: true,
              noImplicitReturns: true,
              resolveJsonModule: true,
              skipLibCheck: true,
              sourceMap: true,
              strict: true,
              target: 'esnext',
              types: ['node', 'vitest/globals', 'vitest/importMeta'],
              useDefineForClassFields: true,
              useUnknownInCatchVariables: true,
            }),
          },
          display: `TypeScript configuration with module set to \`${moduleKind}\` and module resolution set to \`${moduleResolution}\`${moduleResolution === 'node' ? ', intended for TypeScript versions earlier than 5.0.' : moduleResolution === 'node10' ? '. It serves as a backwards compatible replacement for the deprecated `node` module resolution.' : ''}`,
          ...(moduleResolution !== 'node' && {
            extends: `${packageJson.name}/node`,
          }),
        } as const satisfies TsConfigJson

        const prettierConfig = (await resolveConfig(tsconfigJsonPath)) ?? {}

        fs.writeFile(
          tsconfigJsonPath,
          await format(JSON.stringify(tsconfigJson, null, 2), {
            ...prettierConfig,
            filepath: tsconfigJsonPath,
          }),
          { encoding: 'utf-8' },
        )

        fs.writeFile(
          withJsTsConfigJsonPath,
          await format(JSON.stringify(withJsTsConfigJson, null, 2), {
            ...prettierConfig,
            filepath: withJsTsConfigJsonPath,
          }),
          { encoding: 'utf-8' },
        )
      },
    ),
  )
}

void build()
