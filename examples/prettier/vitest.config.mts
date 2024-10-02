import { createVitestConfig } from '@aryaemami59/vitest-config'

export default createVitestConfig({
  test: {
    dir: 'tests',
    maxConcurrency: 100,
    reporters: ['verbose'],
    sequence: { concurrent: true },
  },
})
