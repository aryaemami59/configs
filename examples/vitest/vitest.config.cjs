const path = require('node:path')
const packageJson = require('./package.json')
const { createVitestConfig } = require('@aryaemami59/vitest-config')

const vitestConfig = createVitestConfig({
  test: {
    dir: `${__dirname}/tests`,
    environment: 'jsdom',
    name: `${packageJson.name}-${path.extname(__filename).replace('.', '')}`,
    root: __dirname,
    // Other additional overrides
  },
})

module.exports = vitestConfig
