import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import type { TestProject } from 'vitest/node'

const TSFileContent = 'export const someNumber: string = 1\n'

const JSFileContent = `/** \n * @type {number}\n */\nexport const someString = ''\n`

const tempDirPathTS = path.resolve('temp', 'ts')

const tempDirPathJS = path.resolve('temp', 'js')

const TSfileToGetTypeChecked = path.join(tempDirPathTS, '.test-ts.ts')

const JSfileToGetTypeChecked = path.join(tempDirPathJS, '.test-js.js')

export async function setup({ provide, config }: TestProject) {
  await fs.mkdir(tempDirPathTS, { recursive: true })

  await fs.mkdir(tempDirPathJS, { recursive: true })

  await fs.writeFile(TSfileToGetTypeChecked, TSFileContent, 'utf-8')

  await fs.writeFile(JSfileToGetTypeChecked, JSFileContent, 'utf-8')

  const tsconfigFileContentForTS = JSON.stringify(
    {
      extends: '@aryaemami59/tsconfig/node-next',
      compilerOptions: {
        noEmitOnError: true,
        outDir: './dist',
      },
      files: ['.test-ts.ts'],
    },
    null,
    2,
  )

  const tsconfigFileContentForJS = JSON.stringify(
    {
      extends: '@aryaemami59/tsconfig/node-next/with-js',
      compilerOptions: {
        noEmitOnError: true,
        outDir: './dist',
      },
      files: ['.test-js.js'],
    },
    null,
    2,
  )

  await fs.writeFile(
    path.join(tempDirPathTS, 'tsconfig.json'),
    tsconfigFileContentForTS,
    'utf-8',
  )

  await fs.writeFile(
    path.join(tempDirPathJS, 'tsconfig.json'),
    tsconfigFileContentForJS,
    'utf-8',
  )
}

export async function teardown() {
  await fs.rm('temp', { recursive: true, force: true })
}
