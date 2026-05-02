import { createPrettierConfig } from '@aryaemami59/prettier-config'
// /**
//  * @import { type Options } from 'prettier-plugin-jsdoc'
//  */
// import { defaultOptions, name, options, parsers } from 'prettier-plugin-jsdoc'

// const { jsdocPrintWidth, jsdocSingleLineComment, ...rest } = defaultOptions

// /**
//  * @satisfies {Options}
//  */
// const jsdocOptions = {
//   ...rest,
//   jsdocAddDefaultToDescription: true,
//   jsdocBracketSpacing: false,
//   jsdocCapitalizeDescription: true,
//   jsdocCommentLineStrategy: 'multiline',
//   jsdocDescriptionTag: false,
//   jsdocDescriptionWithDot: false,
//   jsdocEmptyCommentStrategy: 'remove',
//   jsdocFormatImports: true,
//   jsdocKeepUnParseAbleExampleIndent: false,
//   jsdocLineWrappingStyle: 'greedy',
//   jsdocMergeImports: true,
//   jsdocNamedImportLineSplitting: true,
//   jsdocNamedImportPadding: true,
//   jsdocPreferCodeFences: true,
//   jsdocSeparateReturnsFromParam: true,
//   jsdocSeparateTagGroups: false,
//   jsdocSpaces: 1,
//   jsdocVerticalAlignment: false,
//   tsdoc: true,
// }

const prettierConfig = createPrettierConfig({
  // ...jsdocOptions,
  // plugins: [name, { options, parsers }],
})

export default prettierConfig
