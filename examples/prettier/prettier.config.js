module.exports = (async () =>
  (await import('@aryaemami/prettier-config')).createPrettierConfig({
    arrowParens: 'avoid',
    // ...Other additional overrides
  }))()
