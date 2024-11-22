import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import type { TestProject } from 'vitest/node'

const TSFileContent = 'export interface A {\n\tsomeProperty: string\n}\n'

const JSFileContent = `const someString = ''\n`

const tempDirPathTS = path.resolve('temp', 'ts')

const tempDirPathJS = path.resolve('temp', 'js')

const TSFileToBeLinted = path.join(tempDirPathTS, 'test.ts')

const JSFileToBeLinted = path.join(tempDirPathJS, 'test.js')

export async function setup({ provide, config }: TestProject) {
  await fs.mkdir(tempDirPathTS, { recursive: true })

  await fs.mkdir(tempDirPathJS, { recursive: true })

  await fs.writeFile(TSFileToBeLinted, TSFileContent, 'utf-8')

  await fs.writeFile(JSFileToBeLinted, JSFileContent, 'utf-8')
}

export async function teardown() {
  await fs.rm('temp', { recursive: true, force: true })
}
