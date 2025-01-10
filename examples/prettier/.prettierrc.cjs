const { createPrettierConfig } = require('@aryaemami59/prettier-config')

const prettierConfig = createPrettierConfig({
  arrowParens: 'avoid',
  // ...Other additional overrides
})

module.exports = prettierConfig
