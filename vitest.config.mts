import { createVitestConfig } from '@aryaemami59/vitest-config'

const vitestConfig = createVitestConfig({
  test: {
    // Without this we get `ERR_REQUIRE_CYCLE_MODULE` error.
    env: {
      NODE_OPTIONS: '--no-experimental-require-module',
    },

    workspace: [
      'examples/!(vitest)/vitest.config.mts',
      'examples/vitest/vitest.config.?(c|m)[tj]s',
    ],
  },
})

export default vitestConfig
