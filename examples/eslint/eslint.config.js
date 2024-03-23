module.exports = (async () =>
  (await import('@aryaemami/eslint-config')).createESLintConfig([
    {
      rules: {
        'no-console': [2],
      },
    },
    {
      // ...Other additional overrides
    },
  ]))()
