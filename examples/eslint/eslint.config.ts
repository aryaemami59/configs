const eslintConfig = (async () => {
  const path = await import('node:path')
  const { default: packageJson } = await import('./package.json', {
    with: { type: 'json' },
  })

  const basename = `${packageJson.name}/${path.extname(__filename).replace('.', '')}-config-file/overrides`

  return (await import('@aryaemami59/eslint-config')).createESLintConfig([
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
      // ...Other additional overrides
    },
  ])
})()

export = eslintConfig
