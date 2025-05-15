import path = require('node:path')
import packageJson = require('./package.json')
import vitestConfigModule = require('@aryaemami59/vitest-config')
import createVitestProject = vitestConfigModule.createVitestProject

const vitestConfig = createVitestProject({
  root: __dirname,

  test: {
    dir: path.join(__dirname, 'tests'),
    environment: 'jsdom',
    name: `${packageJson.name}-${path.extname(__filename).replace('.', '')}`,
    root: __dirname,

    typecheck: {
      tsconfig: path.join(__dirname, 'tsconfig.json'),
    },
    // Other additional overrides
  },
})

export = vitestConfig
