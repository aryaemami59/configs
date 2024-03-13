module.exports = (async () =>
  (await import('@arya/eslint-config')).createESLintConfig([
    {
      rules: {
        'no-console': [2],
      },
    },
    {
      // ...Other additional overrides
    },
  ]))()
