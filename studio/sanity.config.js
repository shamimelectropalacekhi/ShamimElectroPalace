import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'

const SETTINGS = 'siteSettings'

export default defineConfig({
  name: 'default',
  title: 'Shamim Electro Palace',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [structureTool({
    // Sidebar: the one settings document, then the three lists.
    structure: (S) => S.list().title('Content').items([
      S.listItem().title('Store settings').id(SETTINGS).child(S.document().schemaType(SETTINGS).documentId(SETTINGS)),
      S.divider(),
      S.documentTypeListItem('product').title('Products'),
      S.documentTypeListItem('brand').title('Brands'),
      S.documentTypeListItem('category').title('Categories'),
    ]),
  })],

  schema: {
    types: schemaTypes,
    // Store settings can't be created again from the "+" menu.
    templates: (templates) => templates.filter(({ schemaType }) => schemaType !== SETTINGS),
  },

  document: {
    // ...nor deleted or duplicated.
    actions: (actions, { schemaType }) => schemaType === SETTINGS
      ? actions.filter(({ action }) => !['delete', 'duplicate', 'unpublish'].includes(action))
      : actions,
  },
})
