import { createVitestConfig } from '@aryaemami59/vitest-config'
import * as path from 'node:path'
import packageJson from './package.json' with { type: 'json' }

const vitestConfig = createVitestConfig({
  root: import.meta.dirname,

  test: {
    dir: path.join(import.meta.dirname, 'examples'),
    name: packageJson.name,
    root: import.meta.dirname,

    workspace: [
      'examples/!(vitest)/vitest.config.mts',
      'examples/vitest/vitest.config.?(c|m)[tj]s',
    ],
  },
})

export default vitestConfig
