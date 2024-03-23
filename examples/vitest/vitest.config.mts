import { createVitestConfig } from '@aryaemami/vitest-config'

export default createVitestConfig({
  test: {
    environment: 'jsdom',
    // Other additional overrides
  },
})
