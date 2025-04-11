import { createESLintConfig } from '@aryaemami59/eslint-config'
import * as path from 'node:path'
import packageJson from './package.json' with { type: 'json' }

const basename = `${packageJson.name}/${path.extname(import.meta.filename).replace('.', '')}-config-file/overrides`

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
