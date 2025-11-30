#!/usr/bin/env node

import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import * as ts from 'typescript'

const { ModuleResolutionKind, ModuleKind } = ts.server.protocol

type ModuleResolutionKindType = typeof ModuleResolutionKind

type ModuleKindType = typeof ModuleKind

const ROOT_DIRECTORY = path.join(import.meta.dirname, '..')

// type DistributedOmit<
//   ObjectType,
//   KeyType extends keyof ObjectType,
// > = ObjectType extends unknown ? Omit<ObjectType, KeyType> : never

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

// const moduleResolutionKinds = [
//   ...new Set(
//     Object.values(ModuleResolutionKind).filter(
//       (moduleResolutionKind) =>
//         moduleResolutionKind !== ModuleResolutionKind.Classic,
//     ),
//   ),
// ]

type KebabCase<
  S extends string,
  FirstRun extends boolean = true,
> = S extends `${infer FirstLetter}${infer Rest}`
  ? `${FirstLetter extends Lowercase<FirstLetter>
      ? FirstLetter extends `${number}`
        ? Rest extends `${number}`
          ? '-'
          : ''
        : ''
      : FirstRun extends true
        ? ''
        : '-'}${Lowercase<FirstLetter>}${KebabCase<Rest, false>}`
  : S

type ModuleResolutions = Simplify<
  {
    readonly [ModuleResolutionKey in ExcludeStrict<
      keyof ModuleResolutionKindType,
      'Classic' | 'NodeJs'
    > as ModuleResolutionKindType[ModuleResolutionKey]]: {
      readonly directory: ModuleResolutionKey extends 'Node'
        ? 'base'
        : KebabCase<ModuleResolutionKey>
    }
  } & {
    readonly [ModuleResolutionKey in ExtractStrict<
      ExcludeStrict<keyof ModuleResolutionKindType, 'Classic' | 'NodeJs'>,
      'Node' | 'Node10' | 'Bundler'
    > as ModuleResolutionKindType[ModuleResolutionKey]]: {
      readonly modules: {
        [K in ExtractStrict<
          keyof ModuleKindType,
          'ESNext'
        > as ModuleKindType[K]]: ModuleKindType[K]
      }
    }
  } & {
    readonly [ModuleResolutionKind.Bundler]: {
      readonly modules: {
        readonly [K in ExtractStrict<
          keyof ModuleKindType,
          'ESNext' | 'Preserve'
        > as ModuleKindType[K]]: ModuleKindType[K]
      }
    }
  } & {
    readonly [ModuleResolutionKind.Node16]: {
      readonly modules: {
        readonly [K in ExtractStrict<
          keyof ModuleKindType,
          'Node16'
        > as ModuleKindType[K]]: ModuleKindType[K]
      }
    }
  } & {
    readonly [ModuleResolutionKind.NodeNext]: {
      readonly modules: {
        readonly [K in ExtractStrict<
          keyof ModuleKindType,
          'NodeNext'
        > as ModuleKindType[K]]: ModuleKindType[K]
      }
    }
  }
>

const moduleResolutions = {
  [ModuleResolutionKind.Node]: {
    directory: 'base',
    modules: {
      [ModuleKind.ESNext]: ModuleKind.ESNext,
    },
  },
  [ModuleResolutionKind.Node10]: {
    directory: 'node-10',
    modules: {
      [ModuleKind.ESNext]: ModuleKind.ESNext,
    },
  },
  [ModuleResolutionKind.Node16]: {
    directory: 'node-16',
    modules: {
      [ModuleKind.Node16]: ModuleKind.Node16,
    },
  },
  [ModuleResolutionKind.NodeNext]: {
    directory: 'node-next',
    modules: {
      [ModuleKind.NodeNext]: ModuleKind.NodeNext,
    },
  },
  [ModuleResolutionKind.Bundler]: {
    directory: 'bundler',
    modules: {
      [ModuleKind.ESNext]: ModuleKind.ESNext,
      [ModuleKind.Preserve]: ModuleKind.Preserve,
    },
  },
} as const satisfies ModuleResolutions

const directories = Object.entries(moduleResolutions).map(
  ([, { directory }]) => directory,
)

// const absoluteDirectories = directories.map((directory) =>
//   path.join(ROOT_DIRECTORY, directory),
// )

const build = async () => {
  await Promise.all(
    Object.entries(moduleResolutions).map(
      async ([, { directory, modules }]) => {
        await fs.mkdir(path.join(ROOT_DIRECTORY, directory), {
          recursive: true,
        })

        const moduleEntries = Object.entries(modules)

        if (moduleEntries.length > 1) {
          await Promise.all(
            moduleEntries.map(async ([, moduleName]) => {
              const dir = await fs.mkdir(
                path.join(ROOT_DIRECTORY, directory, moduleName, 'with-js'),
                {
                  recursive: true,
                },
              )

              if (dir != null) {
                console.log(`${dir} created`)
              }
            }),
          )
        }
      },
    ),
  )
}

void build()
