const path = require('node:path')
const packageJson = require('./package.json')
const { createVitestConfig } = require('@aryaemami59/vitest-config')

const vitestConfig = createVitestConfig({
  test: {
    name: `${packageJson.name}/${path.basename(__filename)}`,
    dir: 'tests',
    environment: 'jsdom',
    root: __dirname,
    // Other additional overrides
  },
})

module.exports = vitestConfig
