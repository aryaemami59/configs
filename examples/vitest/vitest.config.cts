import path = require('node:path')
import packageJson = require('./package.json')
import vitestConfigModule = require('@aryaemami59/vitest-config')
import createVitestConfig = vitestConfigModule.createVitestConfig

export = createVitestConfig({
  test: {
    name: `${packageJson.name}/${path.basename(__filename)}`,
    root: __dirname,
    dir: 'tests',
    environment: 'jsdom',
    // Other additional overrides
  },
})
