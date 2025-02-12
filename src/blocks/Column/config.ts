import type { Block } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { CodeBlock } from '../Code/config'
import { MediaBlock } from '../MediaBlock/config'

export const columnBlock: Block = {
  slug: 'column',
  interfaceName: 'ColumnBlock',
  fields: [
    {
      name: 'leftColumn',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            BlocksFeature({ blocks: [CodeBlock, MediaBlock] }),
          ]
        },
      }),
      required: true,
    },
    {
      name: 'rightColumn',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            BlocksFeature({ blocks: [CodeBlock, MediaBlock] }),
          ]
        },
      }),
      required: true,
    },
  ],
}
