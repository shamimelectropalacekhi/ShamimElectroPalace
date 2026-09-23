import { defineField, defineType } from 'sanity'

export const categoryIcons = [
  { title: 'Air conditioner', value: 'air-conditioner' },
  { title: 'Washing machine', value: 'washing-machine' },
  { title: 'Refrigerator', value: 'refrigerator' },
  { title: 'Microwave / kitchen', value: 'microwave' },
  { title: 'Other', value: 'other' },
]

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fieldsets: [{ name: 'text', title: 'Home page text & filters (optional)', options: { collapsible: true, collapsed: true } }],
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', description: 'Shown in the menu, e.g. "Air Conditioners".', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Web address', type: 'slug', hidden: true, options: { source: 'name', maxLength: 60 } }),
    defineField({ name: 'order', title: 'Menu position', type: 'number', description: '1 = first in the menu and on the home page.', initialValue: 10 }),
    defineField({ name: 'icon', title: 'Icon', type: 'string', options: { list: categoryIcons, layout: 'radio' }, initialValue: 'other' }),
    defineField({ fieldset: 'text', name: 'subtitle', title: 'Short description', type: 'string', description: 'Under the category circle on the home page, e.g. "DC inverter & split ACs".' }),
    defineField({ fieldset: 'text', name: 'footerLine', title: 'Footer line', type: 'string', description: 'Under the category in the footer, e.g. "Inverter ACs · Split ACs · Heat & Cool".' }),
    defineField({ fieldset: 'text', name: 'rowHeading', title: 'Home page row heading', type: 'string', description: 'Text before the category name, e.g. "Shop the best deals on".', initialValue: 'Best prices on' }),
    defineField({ fieldset: 'text', name: 'capacityLabel', title: 'Capacity filter label', type: 'string', description: 'e.g. "Tonnage" for ACs, "Capacity" for everything else.', initialValue: 'Capacity' }),
    defineField({ fieldset: 'text', name: 'inverterFilter', title: 'Show inverter / non-inverter filter', type: 'boolean', initialValue: true }),
  ],
  orderings: [{ title: 'Menu position', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'subtitle' } },
})
