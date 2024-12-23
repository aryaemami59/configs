module.exports = (async () => {
  const path = await import('node:path')

  const { default: packageJson } = await import('./package.json', {
    with: { type: 'json' },
  })

  const vitestConfig = (
    await import('@aryaemami59/vitest-config')
  ).createVitestConfig({
    test: {
      name: `${packageJson.name}/${path.basename(__filename)}`,
      environment: 'jsdom',
      dir: 'tests',
      root: __dirname,
      // Other additional overrides
    },
  })

  return vitestConfig
})()
