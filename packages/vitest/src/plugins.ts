import tsconfigPaths from 'vite-tsconfig-paths'
import type { Plugin } from 'vitest/config'

export const plugins: [Plugin] = [
  /* @__PURE__ */ tsconfigPaths({
    projects: ['./tsconfig.json'],
    configNames: ['tsconfig.json'],
  }),
] as const satisfies [Plugin]
