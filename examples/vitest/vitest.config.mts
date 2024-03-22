import { createVitestConfig } from '@arya/vitest-config'

export default createVitestConfig({
  test: {
    environment: 'jsdom',
    // Other additional overrides
  },
})
