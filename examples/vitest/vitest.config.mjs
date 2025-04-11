import { createVitestProject } from '@aryaemami59/vitest-config'
import * as path from 'node:path'
import packageJson from './package.json' with { type: 'json' }

const vitestConfig = createVitestProject({
  root: import.meta.dirname,

  test: {
    dir: path.join(import.meta.dirname, 'tests'),
    environment: 'jsdom',
    name: `${packageJson.name}-${path.extname(import.meta.filename).replace('.', '')}`,
    root: import.meta.dirname,
    // Other additional overrides
  },
})

export default vitestConfig
