module.exports = (async () =>
  (await import('@arya/vitest-config')).createVitestConfig({
    test: {
      environment: 'jsdom',
      // Other additional overrides
    },
  }))()
