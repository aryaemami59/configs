import { createVitestConfig } from '@aryaemami59/vitest-config'
import * as path from 'node:path'
import packageJson from './package.json' with { type: 'json' }

const vitestConfig = createVitestConfig({
  test: {
    name: `${packageJson.name}/${path.basename(import.meta.filename)}`,
    dir: `${import.meta.dirname}/tests`,
    environment: 'jsdom',
    root: import.meta.dirname,
    // Other additional overrides
  },
})

export default vitestConfig
