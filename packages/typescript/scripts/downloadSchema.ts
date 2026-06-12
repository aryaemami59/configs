#!/usr/bin/env node

import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import type { Options } from 'prettier'
import { format } from 'prettier'

const DEFAULT_PRETTIER_CONFIG = {
  semi: false,
  singleQuote: true,
} as const satisfies Options

// const TSCONFIG_SCHEMA_URL = 'https://json.schemastore.org/tsconfig'
const TSCONFIG_SCHEMA_URL = 'https://www.schemastore.org/tsconfig'

const ROOT_DIRECTORY = path.join(import.meta.dirname, '..')

const SCHEMA_OUTPUT_PATH = path.join(
  ROOT_DIRECTORY,
  '..',
  '..',
  'original_tsconfig.schema.json',
)

const downloadSchema = async () => {
  const response = await fetch(TSCONFIG_SCHEMA_URL)

  if (!response.ok) {
    throw new Error(
      `Failed to download schema from ${TSCONFIG_SCHEMA_URL}: ${response.status} ${response.statusText}`,
    )
  }

  const schema = await response.json()

  const formattedSchema = await format(JSON.stringify(schema), {
    ...DEFAULT_PRETTIER_CONFIG,
    filepath: SCHEMA_OUTPUT_PATH,
  })

  await fs.writeFile(SCHEMA_OUTPUT_PATH, formattedSchema, {
    encoding: 'utf-8',
  })
}

void downloadSchema()
