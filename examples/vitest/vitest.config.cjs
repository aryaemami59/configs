const path = require('node:path')
const packageJson = require('./package.json')
const { createVitestConfig } = require('@aryaemami59/vitest-config')

module.exports = createVitestConfig({
  test: {
    name: `${packageJson.name}/${path.basename(__filename)}`,
    root: __dirname,
    dir: 'tests',
    environment: 'jsdom',
    // Other additional overrides
  },
})
