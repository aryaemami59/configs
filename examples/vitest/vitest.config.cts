import vitestConfigModule = require('@aryaemami59/vitest-config')
import createVitestConfig = vitestConfigModule.createVitestConfig

export = createVitestConfig({
  test: {
    dir: 'tests',
    environment: 'jsdom',
    reporters: ['verbose'],
    // Other additional overrides
  },
})
