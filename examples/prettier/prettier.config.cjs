module.exports = (async () =>
  (await import('@arya/prettier-config')).createPrettierConfig({
    arrowParens: 'avoid',
    // ...Other additional overrides
  }))()
