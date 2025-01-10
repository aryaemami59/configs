const prettierConfig = (async () =>
  (await import('@aryaemami59/prettier-config')).createPrettierConfig({
    arrowParens: 'avoid',
    // ...Other additional overrides
  }))()

module.exports = prettierConfig
