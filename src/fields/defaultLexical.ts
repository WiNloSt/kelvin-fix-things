import { Config } from 'payload'
import {
  BoldFeature,
  ItalicFeature,
  LinkFeature,
  ParagraphFeature,
  lexicalEditor,
  UnderlineFeature,
} from '@payloadcms/richtext-lexical'

export const defaultLexical: Config['editor'] = lexicalEditor({
  features: ({ defaultFeatures }) => {
    return [
      ...defaultFeatures,
      ParagraphFeature(),
      UnderlineFeature(),
      BoldFeature(),
      ItalicFeature(),
      LinkFeature({
        enabledCollections: ['pages', 'posts'],
        fields: ({ defaultFields }) => {
          const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
            if (field.name === 'url' || field.name === 'doc') return false
            return true
          })

          return [
            ...defaultFieldsWithoutUrl,
            {
              name: 'url',
              type: 'text',
              admin: {
                condition: (_, link) => {
                  return link.linkType !== 'internal'
                },
              },
              label: ({ t }) => t('fields:enterURL'),
              required: true,
              validate: (value: any, options: any) => {
                if (options?.siblingData?.linkType === 'internal') {
                  return true // no validation needed, as no url should exist for internal links
                }
                return value ? true : 'URL is required'
              },
            },
            // I'm not sure why the default `doc` field doesn't show up
            {
              name: 'doc',
              admin: {
                condition: (_, link) => {
                  return link.linkType === 'internal'
                },
              },
              type: 'relationship',
              filterOptions: null,
              relationTo: ['pages', 'posts'],
              required: true,
            },
          ]
        },
      }),
    ]
  },
})
