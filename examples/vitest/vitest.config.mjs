import { createVitestConfig } from '@aryaemami59/vitest-config'

export default createVitestConfig({
  test: {
    dir: 'tests',
    environment: 'jsdom',
    reporters: ['verbose'],
    // Other additional overrides
  },
})
