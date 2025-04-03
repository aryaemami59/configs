import { createVitestConfig } from '@aryaemami59/vitest-config'

const vitestConfig = createVitestConfig({
  test: {
    workspace: [
      'examples/!(vitest)/vitest.config.mts',
      'examples/vitest/vitest.config.?(c|m)[tj]s',
    ],
  },
})

export default vitestConfig
