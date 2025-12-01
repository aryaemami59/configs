import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import type { TestProject } from 'vitest/node'
import { fixturesDirectoryPath } from './tests/test-utils.js'

type FixtureFile = {
  absolutePath: string
  content: string
  fileName: string
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
      | Record<'cjs' | 'js' | 'mjs', FixtureFile>
      | Record<'cts' | 'mts' | 'ts', FixtureFile>
  : ['js'] extends [FileExtension]
    ? Record<'cjs' | 'js' | 'mjs', FixtureFile>
    : ['ts'] extends [FileExtension]
      ? Record<'cts' | 'mts' | 'ts', FixtureFile>
      : Record<'cts' | 'mts' | 'ts', FixtureFile> &
          Record<'cjs' | 'js' | 'mjs', FixtureFile>

type Fixture<FileExtension extends 'js' | 'ts' = 'js' | 'ts'> = {
  files: FixtureFiles<FileExtension>
  fixtureDirectory: string
  tsconfigPath: string
}

class FileFixtures<FileExtension extends 'js' | 'ts' = 'js' | 'ts'> {
  public get bad(): Fixture<FileExtension> {
    return this.getFixtures('bad')
  }

  public get good(): Fixture<FileExtension> {
    return this.getFixtures('good')
  }

  public get tsconfigContent(): string {
    if (this.isTSFile()) {
      return JSON.stringify(
        {
          compilerOptions: {
            noEmitOnError: true,
            outDir: './dist',
          },
          extends: '@aryaemami59/tsconfig/node-next',
          files: [this.good.files.ts.fileName, this.good.files.mts.fileName],
        },
        null,
        2,
      )
    } else if (this.isJSFile()) {
      return JSON.stringify(
        {
          compilerOptions: {
            noEmitOnError: true,
            outDir: './dist',
          },
          extends: '@aryaemami59/tsconfig/node-next/with-js',
          files: [this.good.files.js.fileName, this.good.files.mjs.fileName],
        },
        null,
        2,
      )
    }

    throw new Error('Unsupported file extension')
  }

  public constructor(public readonly fileExtension: FileExtension) {}

  public getAbsolutePath(
    fixtureDirectory: string,
    variant: 'CJS' | 'ESM' | 'neutral',
  ): string {
    return path.join(fixtureDirectory, this.getFileName(variant))
  }

  public getFileContent(type: 'bad' | 'good'): string {
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

  public getFileName(variant: 'CJS' | 'ESM' | 'neutral'): string {
    const prefix =
      variant === 'ESM' ? `m${this.fileExtension}` : this.fileExtension
    return `.test-${prefix}.${prefix}`
  }

  public getFixtureDirectory(type: 'bad' | 'good'): string {
    return path.join(fixturesDirectoryPath, this.fileExtension, type)
  }

  public getFixtures(type: 'bad' | 'good'): Fixture<FileExtension> {
    const fixtureDirectory = this.getFixtureDirectory(type)

    return {
      files: this.isTSFile()
        ? ({
            cts: {
              absolutePath: this.getAbsolutePath(fixtureDirectory, 'CJS'),
              content: this.getFileContent(type),
              fileName: this.getFileName('CJS'),
            },

            mts: {
              absolutePath: this.getAbsolutePath(fixtureDirectory, 'ESM'),
              content: this.getFileContent(type),
              fileName: this.getFileName('ESM'),
            },

            ts: {
              absolutePath: this.getAbsolutePath(fixtureDirectory, 'neutral'),
              content: this.getFileContent(type),
              fileName: this.getFileName('neutral'),
            },
          } satisfies FixtureFiles<'ts'> as FixtureFiles<'ts'>)
        : ({
            cjs: {
              absolutePath: this.getAbsolutePath(fixtureDirectory, 'CJS'),
              content: this.getFileContent(type),
              fileName: this.getFileName('CJS'),
            },

            js: {
              absolutePath: this.getAbsolutePath(fixtureDirectory, 'neutral'),
              content: this.getFileContent(type),
              fileName: this.getFileName('neutral'),
            },

            mjs: {
              absolutePath: this.getAbsolutePath(fixtureDirectory, 'ESM'),
              content: this.getFileContent(type),
              fileName: this.getFileName('ESM'),
            },
          } satisfies FixtureFiles<'js'> as FixtureFiles<'js'>),

      fixtureDirectory,

      tsconfigPath: path.join(fixtureDirectory, 'tsconfig.json'),
    } as Fixture<FileExtension>
  }

  public isJSFile(): this is FileFixtures<'js'> {
    return this.fileExtension === 'js'
  }

  public isTSFile(): this is FileFixtures<'ts'> {
    return this.fileExtension === 'ts'
  }
}

const TSFiles = new FileFixtures('ts')

const JSFiles = new FileFixtures('js')

/**
 * setup function for
 * {@linkcode https://vitest.dev/config/#globalsetup | globalSetup}
 *
 * @param project - The {@linkcode TestProject} object
 */
export async function setup(project: TestProject): Promise<void> {
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
  if (process.env.KEEP_TEMP_DIR !== 'true') {
    await fs.rm(fixturesDirectoryPath, { recursive: true })
  }
}
