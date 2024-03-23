module.exports = (async () =>
  (await import('@aryaemami/vitest-config')).createVitestConfig({
    test: {
      environment: 'jsdom',
      // Other additional overrides
    },
  }))()
