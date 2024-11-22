const eslintConfig = (async () =>
  (await import('@aryaemami59/eslint-config')).createESLintConfig([
    { ignores: ['!temp/'] },
    {
      rules: {
        'no-console': [2],
      },
    },
    {
      // ...Other additional overrides
    },
  ]))()

export = eslintConfig
