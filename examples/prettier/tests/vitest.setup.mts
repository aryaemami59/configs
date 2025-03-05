import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import type { TestProject } from 'vitest/node'
import { fixturesDirectoryPath } from './test-utils.js'

const TSFileContent =
  'const someFunction: (...args: any[]) => any = (arg) => arg\n'

const JSFileContent = "const someString = ''\n"

const tempDirPathTS = path.join(fixturesDirectoryPath, 'ts')

const tempDirPathJS = path.join(fixturesDirectoryPath, 'js')

const TSFileToBeLinted = path.join(tempDirPathTS, 'test.ts')

const JSFileToBeLinted = path.join(tempDirPathJS, 'test.js')

export async function setup(testProject: TestProject) {
  await fs.rm(fixturesDirectoryPath, { force: true, recursive: true })

  await fs.mkdir(tempDirPathTS, { recursive: true })

  await fs.mkdir(tempDirPathJS, { recursive: true })

  await fs.writeFile(TSFileToBeLinted, TSFileContent, { encoding: 'utf-8' })

  await fs.writeFile(JSFileToBeLinted, JSFileContent, { encoding: 'utf-8' })
}

export async function teardown() {
  await fs.rm(fixturesDirectoryPath, { force: true, recursive: true })
}
