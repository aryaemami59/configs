#!/usr/bin/env node

import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import type { Options } from 'prettier'
import { format } from 'prettier'
import ts from 'typescript'
import tsconfigSchemaJson from '../../../tsconfig.schema.json' with { type: 'json' }
import packageJson from '../package.json' with { type: 'json' }
import type { ExcludeStrict, KebabCase, Simplify } from './typeHelpers.ts'
import type { Module, ModuleResolution, TsConfigJson } from './types.ts'

const element = Object.fromEntries(
  Object.entries(
    tsconfigSchemaJson.definitions.compilerOptionsDefinition.properties
      .compilerOptions.properties,
  ).map(
    ([key, value]) =>
      [
        key,
        {
          ...value,
          jsdoc: `  /**
   * ${('markdownDescription' in value
     ? value.markdownDescription
     : value.description
   ).replaceAll(
     '\n',
     `
   * `,
   )}${'default' in value ? `\n   *\n   * @default ${typeof value.default === 'string' ? `'${value.default}'` : value.default}` : ''}
   */`,
          markdownDescription:
            'markdownDescription' in value
              ? value.markdownDescription
              : value.description,
        },
      ] as const,
  ),
)

const element1 = `export type CompilerOptions = {\n${Object.entries(element)
  .map(
    ([key, value]) =>
      `${value.jsdoc}\n  ${key}?: ${
        'type' in value
          ? value.type
              .filter((e) => e !== 'null')
              .map((e) => (e === 'array' ? 'string[]' : e))
              .join(' | ')
          : 'string'
      },\n`,
  )
  .join('\n')}}\n`
  .replaceAll('/* app.css */', '\\/* app.css *\\/')
  .replaceAll(/\/\*(\*?\s[^*]+\s)\*\//gim, '\\/*$1*\\/')
  .replaceAll(
    `/**
   *  * Days available in a week
   *  * @internal
   *  */`,
    `\\/\\*\\*
   *  \\* Days available in a week
   *  \\* \\@internal
   *  *\\/`,
  )

const { ModuleKind, ModuleResolutionKind } = ts.server.protocol

type ModuleResolutionKindType = Simplify<typeof ModuleResolutionKind>

type ModuleKindType = Simplify<typeof ModuleKind>

const ROOT_DIRECTORY = path.join(import.meta.dirname, '..')

// fs.writeFile(path.join(ROOT_DIRECTORY, 'output.ts'), element1, {
//   encoding: 'utf-8',
// })

type CapitalizedModuleResolutionKinds = ExcludeStrict<
  ModuleResolution,
  'Classic'
>

type LowerCaseModuleResolutionKinds =
  Lowercase<CapitalizedModuleResolutionKinds>

type CapitalizedModuleKinds = ExcludeStrict<
  Module,
  'AMD' | 'None' | 'System' | 'UMD'
>

type LowerCaseModuleKinds = Lowercase<CapitalizedModuleKinds>

type CapitalizedToLowerCaseModuleResolutionKinds = {
  readonly [PascalCasedModuleResolutionKind in CapitalizedModuleResolutionKinds]: Lowercase<PascalCasedModuleResolutionKind>
}

type LowerCaseToCapitalizedModuleResolutionKinds = {
  readonly [PascalCasedModuleResolutionKind in CapitalizedModuleResolutionKinds as CapitalizedToLowerCaseModuleResolutionKinds[PascalCasedModuleResolutionKind]]: PascalCasedModuleResolutionKind
}

type PossibleModuleKinds = Simplify<{
  readonly [PascalCasedModuleResolutionKind in CapitalizedModuleResolutionKinds]: Simplify<
    Readonly<
      Record<
        'modules',
        CapitalizedToLowerCaseModuleResolutionKinds[PascalCasedModuleResolutionKind] extends 'bundler'
          ? readonly ['commonjs', 'esnext', 'preserve']
          : CapitalizedToLowerCaseModuleResolutionKinds[PascalCasedModuleResolutionKind] extends
                | 'node'
                | 'node10'
            ? readonly ['commonjs', 'esnext']
            : CapitalizedToLowerCaseModuleResolutionKinds[PascalCasedModuleResolutionKind] extends
                  | 'node16'
                  | 'nodenext'
              ? readonly [
                  CapitalizedToLowerCaseModuleResolutionKinds[PascalCasedModuleResolutionKind],
                  'node18',
                  'node20',
                ]
              : readonly [
                  CapitalizedToLowerCaseModuleResolutionKinds[PascalCasedModuleResolutionKind],
                ]
      >
    > & {
      readonly directory: KebabCase<PascalCasedModuleResolutionKind>
      readonly moduleResolution: CapitalizedToLowerCaseModuleResolutionKinds[PascalCasedModuleResolutionKind]
    }
  >
}>

type BaseConfigs = {
  readonly [PascalCasedModuleResolutionKind in CapitalizedModuleResolutionKinds as CapitalizedToLowerCaseModuleResolutionKinds[PascalCasedModuleResolutionKind]]: Simplify<{
    readonly directory: PossibleModuleKinds[PascalCasedModuleResolutionKind]['directory']
    readonly moduleResolution: PossibleModuleKinds[PascalCasedModuleResolutionKind]['moduleResolution']
    readonly modules: PossibleModuleKinds[PascalCasedModuleResolutionKind]['modules']
    // readonly subDirectories: PossibleModuleKinds[PascalCasedModuleResolutionKind]['subDirectories']
  }>
}

const baseConfigs = {
  bundler: {
    directory: 'bundler',
    moduleResolution: 'bundler',
    modules: ['commonjs', 'esnext', 'preserve'] as const,
    // subDirectories: ['commonjs', 'esnext', 'preserve'] as const,
  },
  node: {
    directory: 'node',
    moduleResolution: 'node',
    modules: ['commonjs', 'esnext'] as const,
    // subDirectories: ['commonjs', 'esnext'] as const,
  },
  node10: {
    directory: 'node-10',
    moduleResolution: 'node10',
    modules: ['commonjs', 'esnext'] as const,
    // subDirectories: ['commonjs', 'esnext'] as const,
  },
  node16: {
    directory: 'node-16',
    moduleResolution: 'node16',
    modules: ['node16', 'node18', 'node20'] as const,
    // subDirectories: ['node16'] as const,
  },
  nodenext: {
    directory: 'node-next',
    moduleResolution: 'nodenext',
    modules: ['nodenext', 'node18', 'node20'] as const,
    // subDirectories: ['nodenext'] as const,
  },
} as const satisfies BaseConfigs

// type AdditionalConfigs = Simplify<{
//   readonly [K in keyof PossibleModuleKinds as [1] extends [
//     PossibleModuleKinds[K]['module']['length'],
//   ]
//     ? never
//     : [undefined] extends [PossibleModuleKinds[K]['module']['1']]
//       ? never
//       : Lowercase<K>]: Simplify<
//     {
//       readonly directory: KebabCase<K>
//       readonly moduleResolution: PossibleModuleKinds[K]['moduleResolution']
//     } & {
//       [P in PossibleModuleKinds[K]['module'][ExtractStrict<
//         keyof PossibleModuleKinds[K]['module'],
//         number
//       >]]: {
//         readonly module: P
//         readonly subDirectory: P
//       }
//     }[ExcludeStrict<
//       PossibleModuleKinds[K]['module'][ExtractStrict<
//         keyof PossibleModuleKinds[K]['module'],
//         number
//       >],
//       PossibleModuleKinds[K]['module'][0]
//     >]
//   >
// }>

// const additionalConfigs = {
//   bundler: {
//     directory: 'bundler',
//     module: 'preserve',
//     moduleResolution: 'bundler',
//     subDirectory: 'preserve',
//   },
// } as const satisfies AdditionalConfigs

const build = async () => {
  await Promise.all(
    Object.entries(baseConfigs).map(
      async ([, { directory, moduleResolution, modules }]) => {
        await Promise.all(
          modules.map(async (moduleKind) => {
            const directoryPath = path.join(
              ROOT_DIRECTORY,
              'src',
              directory,
              moduleKind,
            )

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
              extends: [packageJson.name, moduleResolution, moduleKind]
                .filter((e) => !!e)
                .join('/'),
            } as const satisfies TsConfigJson

            const tsconfigJson = {
              ...baseTsconfigJson,
              compilerOptions: {
                ...(moduleKind !== baseConfigs.node.modules[0] &&
                  moduleKind !== baseConfigs.node.modules[1] && {
                    module: moduleKind,
                  }),
                ...(moduleResolution !== 'node' && {
                  // module: moduleKind,
                  moduleResolution,
                }),
                ...(moduleResolution === 'node' && {
                  allowSyntheticDefaultImports: true,
                  declaration: true,
                  esModuleInterop: true,
                  forceConsistentCasingInFileNames: true,
                  isolatedModules: true,
                  jsx: 'react',
                  lib: ['DOM', 'ESNext'],
                  module: moduleKind,
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
                  types: ['node'],
                  useDefineForClassFields: true,
                  useUnknownInCatchVariables: true,
                }),
              },
              display: `TypeScript configuration with module set to \`${moduleKind}\` and module resolution set to \`${moduleResolution}\`${moduleResolution === 'node' ? ', intended for TypeScript versions earlier than 5.0.' : moduleResolution === 'node10' ? '. It serves as a backwards compatible replacement for the deprecated `node` module resolution.' : ''}`,
              ...(moduleResolution !== 'node' && {
                extends: `${packageJson.name}/node/${moduleKind === 'commonjs' || moduleKind === 'esnext' ? moduleKind : 'esnext'}`,
              }),
            } as const satisfies TsConfigJson

            const prettierConfig = {
              semi: false,
              singleQuote: true,
            } as const satisfies Options

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
          }),
        )
      },
    ),
  )
}

void build()
