module.exports = (async () =>
  (await import('@aryaemami59/eslint-config')).createESLintConfig([
    {
      rules: {
        'no-console': [2],
      },
    },
    {
      // ...Other additional overrides
    },
  ]))()
