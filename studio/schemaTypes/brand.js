import { defineField, defineType } from 'sanity'

const hex = (r) => r.regex(/^#[0-9a-fA-F]{6}$/, { name: 'colour like #1F2A44' })

export const brand = defineType({
  name: 'brand',
  title: 'Brand',
  type: 'document',
  fieldsets: [{ name: 'card', title: 'How the card looks (optional)', options: { collapsible: true, collapsed: true } }],
  fields: [
    defineField({ name: 'name', title: 'Brand name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Web address', type: 'slug', hidden: true, options: { source: 'name', maxLength: 60 } }),

    defineField({ name: 'showInTopBrands', title: 'Show on the home page in "Top Appliance Brands"', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', title: 'Position in Top Brands', type: 'number', fieldset: 'card', description: '1 = first card.', initialValue: 10 }),
    defineField({ name: 'cardTag', title: 'Card label', type: 'string', fieldset: 'card', description: 'Small label at the top, e.g. "INVERTER ACS".' }),
    defineField({ name: 'upToOff', title: 'Discount on card (%)', type: 'number', fieldset: 'card', description: 'Shown as "Up to 30% OFF". Leave empty to hide.', validation: (r) => r.min(1).max(90).integer() }),
    defineField({ name: 'cardCategory', title: 'Card picture', type: 'reference', to: [{ type: 'category' }], fieldset: 'card', description: 'The card shows this category\'s icon.' }),
    defineField({ name: 'cardColor', title: 'Card background colour', type: 'string', fieldset: 'card', description: 'e.g. #FFF4D6. Leave empty for light grey.', validation: hex }),
    defineField({ name: 'logoColor', title: 'Brand name badge colour', type: 'string', fieldset: 'card', description: 'The brand\'s own colour, e.g. #E30613 for Dawlance.', validation: hex }),
  ],
  orderings: [{ title: 'Top Brands position', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'name', top: 'showInTopBrands' },
    prepare: ({ title, top }) => ({ title, subtitle: top ? 'In Top Brands' : '' }),
  },
})
