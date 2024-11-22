export = (async () => {
  const path = await import('node:path')
  const { default: packageJson } = await import('./package.json', {
    with: { type: 'json' },
  })

  return (await import('@aryaemami59/vitest-config')).createVitestConfig({
    test: {
      name: `${packageJson.name}/${path.basename(__filename)}`,
      root: __dirname,
      dir: 'tests',
      environment: 'jsdom',
      // Other additional overrides
    },
  })
})()
