const { createVitestConfig } = require('@aryaemami59/vitest-config')

module.exports = createVitestConfig({
  test: {
    environment: 'jsdom',
    // Other additional overrides
  },
})
