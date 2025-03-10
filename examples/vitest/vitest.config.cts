import path = require('node:path')
import packageJson = require('./package.json')
import vitestConfigModule = require('@aryaemami59/vitest-config')
import createVitestProject = vitestConfigModule.createVitestProject

const vitestConfig = createVitestProject({
  test: {
    dir: `${__dirname}/tests`,
    environment: 'jsdom',
    name: `${packageJson.name}-${path.extname(__filename).replace('.', '')}`,
    root: __dirname,
    // Other additional overrides
  },
})

export = vitestConfig
