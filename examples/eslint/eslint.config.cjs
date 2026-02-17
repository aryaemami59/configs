const { createESLintConfig } = require('@aryaemami59/eslint-config')
const packageJson = require('./package.json')
const path = require('node:path')

const basename = `${packageJson.name}/${path.extname(__filename).replace('.', '')}-config-file/overrides`

const eslintConfig = createESLintConfig([
  {
    ignores: ['!temp/'],
    name: `${basename}/global-ignores`,
  },
  {
    name: `${basename}/main`,
    rules: {
      'no-console': [2],
    },
  },
  {
    name: `${basename}/additional`,
    rules: {
      '@typescript-eslint/consistent-type-definitions': [2, 'type'],
    },
    // ...Other additional overrides
  },
])

module.exports = eslintConfig
