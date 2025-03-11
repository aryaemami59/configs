import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import type { TestProject } from 'vitest/node'
import { fixturesDirectoryPath } from './test-utils.js'

type FixtureFile = {
  content: string
  fileName: string
  absolutePath: string
}

/**
 * @todo We still need to figure out how to get the desired behavior
 * when {@linkcode FileExtension} is set to `'js' | 'ts'`.
 * We need to make sure that the {@linkcode Fixture.files} property
 * only contains the files that are relevant to the specified file extension.
 * So if it should be a discriminated union between `ts` and `js` extensions.
 * So if we specify `ts` the type should not allow us to specify `js`.
 *
 * @example
 * <caption>### Here is an example</caption>
 *
 * ```ts
 * const fixture = {
 *   files: {
 *     ts: { content: '', absolutePath: '', fileName: '' },
 *     mts: { content: '', absolutePath: '', fileName: '' },
 *     cts: { content: '', absolutePath: '', fileName: '' },
 *
 *     // This should cause a TS error.
 *     js: { content: '', absolutePath: '', fileName: '' },
 *   },
 *
 *   fixtureDirectory: '',
 *   tsconfigPath: '',
 * } as const satisfies Fixture<'js' | 'ts'>
 * ```
 */
type FixtureFiles<FileExtension extends 'js' | 'ts' = 'js' | 'ts'> = [
  'js' | 'ts',
] extends [FileExtension]
  ?
      | Record<'ts' | 'mts' | 'cts', FixtureFile>
      | Record<'js' | 'mjs' | 'cjs', FixtureFile>
  : ['js'] extends [FileExtension]
    ? Record<'js' | 'mjs' | 'cjs', FixtureFile>
    : ['ts'] extends [FileExtension]
      ? Record<'ts' | 'mts' | 'cts', FixtureFile>
      : Record<'ts' | 'mts' | 'cts', FixtureFile> &
          Record<'js' | 'mjs' | 'cjs', FixtureFile>

type Fixture<FileExtension extends 'js' | 'ts' = 'js' | 'ts'> = {
  fixtureDirectory: string
  tsconfigPath: string
  files: FixtureFiles<FileExtension>
}

class FileFixtures<FileExtension extends 'js' | 'ts' = 'js' | 'ts'> {
  public constructor(public readonly fileExtension: FileExtension) {}

  public getFixtureDirectory(type: 'good' | 'bad'): string {
    return path.join(fixturesDirectoryPath, type, this.fileExtension)
  }

  public getFileContent(type: 'good' | 'bad'): string {
    if (this.fileExtension === 'ts') {
      return type === 'good'
        ? 'export const someNumber: number = 1\n'
        : 'export const someNumber: string = 1\n'
    } else if (this.fileExtension === 'js') {
      return type === 'good'
        ? "/** \n * @type {string}\n */\nexport const someString = ''\n"
        : "/** \n * @type {number}\n */\nexport const someString = ''\n"
    }

    throw new Error('Unsupported file extension')
  }

  public getFileName(variant: 'neutral' | 'ESM' | 'CJS'): string {
    const prefix =
      variant === 'ESM' ? `m${this.fileExtension}` : this.fileExtension
    return `.test-${prefix}.${prefix}`
  }

  public getAbsolutePath(
    fixtureDirectory: string,
    variant: 'neutral' | 'ESM' | 'CJS',
  ): string {
    return path.join(fixtureDirectory, this.getFileName(variant))
  }

  public getFixtures(type: 'good' | 'bad'): Fixture<FileExtension> {
    const fixtureDirectory = this.getFixtureDirectory(type)

    return {
      fixtureDirectory,

      tsconfigPath: path.join(fixtureDirectory, 'tsconfig.json'),

      files: this.isTSFile()
        ? ({
            ts: {
              content: this.getFileContent(type),
              fileName: this.getFileName('neutral'),
              absolutePath: this.getAbsolutePath(fixtureDirectory, 'neutral'),
            },

            mts: {
              content: this.getFileContent(type),
              fileName: this.getFileName('ESM'),
              absolutePath: this.getAbsolutePath(fixtureDirectory, 'ESM'),
            },

            cts: {
              content: this.getFileContent(type),
              fileName: this.getFileName('CJS'),
              absolutePath: this.getAbsolutePath(fixtureDirectory, 'CJS'),
            },
          } satisfies FixtureFiles<'ts'> as FixtureFiles<'ts'>)
        : ({
            js: {
              content: this.getFileContent(type),
              fileName: this.getFileName('neutral'),
              absolutePath: this.getAbsolutePath(fixtureDirectory, 'neutral'),
            },

            mjs: {
              content: this.getFileContent(type),
              fileName: this.getFileName('ESM'),
              absolutePath: this.getAbsolutePath(fixtureDirectory, 'ESM'),
            },

            cjs: {
              content: this.getFileContent(type),
              fileName: this.getFileName('CJS'),
              absolutePath: this.getAbsolutePath(fixtureDirectory, 'CJS'),
            },
          } satisfies FixtureFiles<'js'> as FixtureFiles<'js'>),
    } as Fixture<FileExtension>
  }

  public get good(): Fixture<FileExtension> {
    return this.getFixtures('good')
  }

  public get bad(): Fixture<FileExtension> {
    return this.getFixtures('bad')
  }

  public isTSFile(): this is FileFixtures<'ts'> {
    return this.fileExtension === 'ts'
  }

  public isJSFile(): this is FileFixtures<'js'> {
    return this.fileExtension === 'js'
  }

  public get tsconfigContent(): string {
    if (this.isTSFile()) {
      return JSON.stringify(
        {
          extends: '@aryaemami59/tsconfig/node-next',
          compilerOptions: {
            noEmitOnError: true,
            outDir: './dist',
          },
          files: [this.good.files.ts.fileName, this.good.files.mts.fileName],
        },
        null,
        2,
      )
    } else if (this.isJSFile()) {
      return JSON.stringify(
        {
          extends: '@aryaemami59/tsconfig/node-next/with-js',
          compilerOptions: {
            noEmitOnError: true,
            outDir: './dist',
          },
          files: [this.good.files.js.fileName, this.good.files.mjs.fileName],
        },
        null,
        2,
      )
    }

    throw new Error('Unsupported file extension')
  }
}

const TSFiles = new FileFixtures('ts')

const JSFiles = new FileFixtures('js')

/**
 * setup function for
 * {@linkcode https://vitest.dev/config/#globalsetup | globalSetup}
 *
 * @param testProject - The {@linkcode TestProject} object
 */
export async function setup(testProject: TestProject): Promise<void> {
  await fs.rm(fixturesDirectoryPath, { force: true, recursive: true })

  await fs.mkdir(TSFiles.bad.fixtureDirectory, { recursive: true })

  await fs.mkdir(TSFiles.good.fixtureDirectory, { recursive: true })

  await fs.mkdir(JSFiles.bad.fixtureDirectory, { recursive: true })

  await fs.mkdir(JSFiles.good.fixtureDirectory, { recursive: true })

  await fs.writeFile(
    TSFiles.bad.files.ts.absolutePath,
    TSFiles.bad.files.ts.content,
    { encoding: 'utf-8' },
  )

  await fs.writeFile(
    TSFiles.good.files.ts.absolutePath,
    TSFiles.good.files.ts.content,
    { encoding: 'utf-8' },
  )

  await fs.cp(
    TSFiles.bad.files.ts.absolutePath,
    TSFiles.bad.files.mts.absolutePath,
    { recursive: true },
  )

  await fs.cp(
    TSFiles.good.files.ts.absolutePath,
    TSFiles.good.files.mts.absolutePath,
    { recursive: true },
  )

  await fs.writeFile(
    JSFiles.bad.files.js.absolutePath,
    JSFiles.bad.files.js.content,
    { encoding: 'utf-8' },
  )

  await fs.writeFile(
    JSFiles.good.files.js.absolutePath,
    JSFiles.good.files.js.content,
    { encoding: 'utf-8' },
  )

  await fs.cp(
    JSFiles.good.files.js.absolutePath,
    JSFiles.good.files.mjs.absolutePath,
    { recursive: true },
  )

  await fs.cp(
    JSFiles.bad.files.js.absolutePath,
    JSFiles.bad.files.mjs.absolutePath,
    { recursive: true },
  )

  await fs.cp(
    JSFiles.bad.files.js.absolutePath,
    JSFiles.bad.files.mjs.absolutePath,
    { recursive: true },
  )

  await fs.writeFile(TSFiles.bad.tsconfigPath, TSFiles.tsconfigContent, {
    encoding: 'utf-8',
  })

  await fs.writeFile(TSFiles.good.tsconfigPath, TSFiles.tsconfigContent, {
    encoding: 'utf-8',
  })

  await fs.writeFile(JSFiles.bad.tsconfigPath, JSFiles.tsconfigContent, {
    encoding: 'utf-8',
  })

  await fs.writeFile(JSFiles.good.tsconfigPath, JSFiles.tsconfigContent, {
    encoding: 'utf-8',
  })
}

/**
 * teardown function for
 * {@linkcode https://vitest.dev/config/#globalsetup | globalSetup}
 */
export async function teardown(): Promise<void> {
  await fs.rm(fixturesDirectoryPath, { force: true, recursive: true })
}
