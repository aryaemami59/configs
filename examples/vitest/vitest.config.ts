export = (async () => {
  const path = await import('node:path')

  const { default: packageJson } = await import('./package.json', {
    with: { type: 'json' },
  })

  const vitestConfig = (
    await import('@aryaemami59/vitest-config')
  ).createVitestProject({
    root: __dirname,

    test: {
      dir: path.join(__dirname, 'tests'),
      environment: 'jsdom',
      name: `${packageJson.name}-${path.extname(__filename).replace('.', '')}`,
      root: __dirname,

      typecheck: {
        tsconfig: path.join(__dirname, 'tsconfig.json'),
      },
      // Other additional overrides
    },
  })

  return vitestConfig
})()
