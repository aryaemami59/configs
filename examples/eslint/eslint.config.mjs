import { createESLintConfig } from '@aryaemami59/eslint-config'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import packageJson from './package.json' with { type: 'json' }

const __filename = fileURLToPath(import.meta.url)

const basename = `${packageJson.name}/${path.extname(__filename).replace('.', '')}-config-file/overrides`

const eslintConfig = createESLintConfig([
  {
    ignores: ['!temp/'],
    name: `${basename}/global-ignores`,
  },
  {
    name: `${basename}/main`,
    rules: {
      'no-console': [2],
    },
  },
  {
    name: `${basename}/additional`,
    // ...Other additional overrides
  },
])

export default eslintConfig
