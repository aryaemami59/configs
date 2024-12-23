import path = require('node:path')
import packageJson = require('./package.json')
import vitestConfigModule = require('@aryaemami59/vitest-config')
import createVitestConfig = vitestConfigModule.createVitestConfig

const vitestConfig = createVitestConfig({
  test: {
    name: `${packageJson.name}/${path.basename(__filename)}`,
    dir: 'tests',
    environment: 'jsdom',
    root: __dirname,
    // Other additional overrides
  },
})

export = vitestConfig
