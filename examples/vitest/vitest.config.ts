module.exports = (async () =>
  (await import('@aryaemami59/vitest-config')).createVitestConfig({
    test: {
      environment: 'jsdom',
      // Other additional overrides
    },
  }))()
