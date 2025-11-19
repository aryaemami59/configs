import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import type { TestProject } from 'vitest/node'
import { fixturesDirectoryPath } from './tests/test-utils.js'

const TSFileContent = 'export interface A {\n\tsomeProperty: string\n}\n'

const JSFileContent =
  "const someString = ''\n\nmodule.exports = { someString }\n"

const tempDirPathTS = path.join(fixturesDirectoryPath, 'ts')

const tempDirPathJS = path.join(fixturesDirectoryPath, 'js')

const TSFileToBeLinted = path.join(tempDirPathTS, 'test.ts')

const JSFileToBeLinted = path.join(tempDirPathJS, 'test.js')

/**
 * setup function for
 * {@linkcode https://vitest.dev/config/#globalsetup | globalSetup}
 *
 * @param project - The {@linkcode TestProject} object
 */
export async function setup(project: TestProject): Promise<void> {
  await fs.mkdir(tempDirPathTS, { recursive: true })

  await fs.mkdir(tempDirPathJS, { recursive: true })

  await fs.writeFile(TSFileToBeLinted, TSFileContent, { encoding: 'utf-8' })

  await fs.writeFile(JSFileToBeLinted, JSFileContent, { encoding: 'utf-8' })
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
