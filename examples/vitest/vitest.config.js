module.exports = (async () =>
  (await import('@aryaemami59/vitest-config')).createVitestConfig({
    test: {
      dir: 'tests',
      environment: 'jsdom',
      reporters: [['verbose']],
      // Other additional overrides
    },
  }))()
