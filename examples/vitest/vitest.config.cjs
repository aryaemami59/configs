const path = require('node:path')
const packageJson = require('./package.json')
const { createVitestProject } = require('@aryaemami59/vitest-config')

const vitestConfig = createVitestProject({
  root: __dirname,

  test: {
    dir: path.join(__dirname, 'tests'),
    environment: 'jsdom',
    name: `${packageJson.name}-${path.extname(__filename).replace('.', '')}`,
    root: __dirname,
    // Other additional overrides
  },
})

module.exports = vitestConfig
