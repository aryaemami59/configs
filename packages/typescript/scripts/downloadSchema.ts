#!/usr/bin/env node

import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import type { Options } from 'prettier'
import { format } from 'prettier'

/**
 * The Prettier options used to format the downloaded schema before writing it
 * to disk.
 */
const DEFAULT_PRETTIER_CONFIG = {
  semi: false,
  singleQuote: true,
} as const satisfies Options

// const TSCONFIG_SCHEMA_URL = 'https://json.schemastore.org/tsconfig'
/**
 * The SchemaStore endpoint the `tsconfig` JSON schema is downloaded from.
 */
const TSCONFIG_SCHEMA_URL = 'https://www.schemastore.org/tsconfig'

/**
 * The root of the `@aryaemami59/tsconfig` package, resolved relative to this
 * script.
 */
const ROOT_DIRECTORY = path.join(import.meta.dirname, '..')

/**
 * Where the pristine, unmodified schema is written. It lives at the repo root
 * next to the hand-patched `tsconfig.schema.json` so the two can be diffed.
 */
const SCHEMA_OUTPUT_PATH = path.join(
  ROOT_DIRECTORY,
  '..',
  '..',
  'original_tsconfig.schema.json',
)

/**
 * Downloads the `tsconfig` JSON schema from SchemaStore and writes a formatted
 * copy to {@linkcode SCHEMA_OUTPUT_PATH}.
 *
 * @returns A {@linkcode Promise | promise} that resolves once the schema has been written to disk.
 * @throws An {@linkcode Error} if the request completes with a non-`2xx` status.
 */
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
