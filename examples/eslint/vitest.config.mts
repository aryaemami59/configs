import { createVitestConfig, vitestConfig } from '@aryaemami59/vitest-config'
import { platform } from 'node:os'

export default createVitestConfig({
  test: {
    testTimeout:
      platform() === 'darwin' ? 15_000 : vitestConfig.test?.testTimeout,
    sequence: { concurrent: true },
    isolate: false,
    fileParallelism: false,
  },
})
