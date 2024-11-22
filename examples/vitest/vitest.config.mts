import { createVitestConfig } from '@aryaemami59/vitest-config'
import * as path from 'node:path'
import packageJson from './package.json' with { type: 'json' }

export default createVitestConfig({
  test: {
    name: `${packageJson.name}/${path.basename(import.meta.filename)}`,
    root: import.meta.dirname,
    dir: 'tests',
    environment: 'jsdom',
    // Other additional overrides
  },
})
