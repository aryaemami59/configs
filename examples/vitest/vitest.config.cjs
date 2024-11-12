const { createVitestConfig } = require('@aryaemami59/vitest-config')

module.exports = createVitestConfig({
  test: {
    dir: 'tests',
    environment: 'jsdom',
    reporters: [['verbose']],
    // Other additional overrides
  },
})
