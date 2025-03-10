export = (async () => {
  const path = await import('node:path')

  const { default: packageJson } = await import('./package.json', {
    with: { type: 'json' },
  })

  const vitestConfig = (
    await import('@aryaemami59/vitest-config')
  ).createVitestProject({
    test: {
      dir: `${__dirname}/tests`,
      environment: 'jsdom',
      name: `${packageJson.name}-${path.extname(__filename).replace('.', '')}`,
      root: __dirname,
      // Other additional overrides
    },
  })

  return vitestConfig
})()
