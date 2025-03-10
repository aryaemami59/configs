import { createVitestProject } from '@aryaemami59/vitest-config'
import * as path from 'node:path'
import packageJson from './package.json' with { type: 'json' }

const vitestConfig = createVitestProject({
  test: {
    dir: `${import.meta.dirname}/tests`,
    environment: 'jsdom',
    name: `${packageJson.name}-${path.extname(__filename).replace('.', '')}`,
    root: import.meta.dirname,
    // Other additional overrides
  },
})

export default vitestConfig
