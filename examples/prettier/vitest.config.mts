import { createVitestConfig } from '@aryaemami59/vitest-config'

export default createVitestConfig({
  test: {
    sequence: { concurrent: true },
    isolate: false,
    fileParallelism: false,
  },
})
