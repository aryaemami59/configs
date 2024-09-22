import vitestConfigModule = require('@aryaemami59/vitest-config')
import createVitestConfig = vitestConfigModule.createVitestConfig

export = createVitestConfig({
  test: {
    environment: 'jsdom',
    // Other additional overrides
  },
})
