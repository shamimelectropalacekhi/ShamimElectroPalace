import { defineArrayMember, defineField, defineType } from 'sanity'

const money = (n) => (n == null ? '' : `Rs. ${n.toLocaleString('en-US')}`)

const DETAILS_HELP = `Paste the product text here. Lines like "Capacity: 8 Cubic Feet" become rows in the specifications table (the first four also show as "Key features"). Every other sentence becomes the description.

Example:
The Dawlance 9140WB Avante is a compact double-door refrigerator.
Capacity: 8 Cubic Feet
Warranty: 10 years compressor`

// One page, top to bottom in the order a product is usually added; rarely-needed fields are folded away.
export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fieldsets: [{ name: 'more', title: 'More options (optional)', description: 'Only needed for the website filters. Safe to skip.', options: { collapsible: true, collapsed: true } }],
  fields: [
    defineField({
      name: 'images', title: 'Photos', type: 'array',
      description: 'Drag photos in here. The first one is the main photo; drag to reorder. Any size works.',
      of: [defineArrayMember({
        type: 'image',
        options: { hotspot: true },
        fields: [defineField({ name: 'alt', title: 'What does this photo show? (optional)', type: 'string', description: 'e.g. "Front", "Inside", "Remote".' })],
      })],
    }),
    defineField({ name: 'name', title: 'Product name', type: 'string', description: 'e.g. "Dawlance 9140WB Avante Refrigerator".', validation: (r) => r.required() }),
    defineField({ name: 'category', title: 'Category', type: 'reference', to: [{ type: 'category' }], options: { disableNew: true }, validation: (r) => r.required() }),
    defineField({ name: 'brand', title: 'Brand', type: 'reference', to: [{ type: 'brand' }], description: 'Not in the list? Add it under "Brands" first.', options: { disableNew: true }, validation: (r) => r.required() }),
    defineField({ name: 'price', title: 'Price (Rs.)', type: 'number', description: 'The full price, e.g. 150000 (no commas).', validation: (r) => r.required().min(0) }),
    defineField({
      name: 'salePrice', title: 'Discounted price (Rs.)', type: 'number',
      description: 'What the customer pays after discount. Leave empty if there is no discount.',
      validation: (r) => r.min(0).custom((sale, { document }) => sale == null || document?.price == null || sale <= document.price || 'The discounted price must be lower than the price'),
    }),
    defineField({ name: 'inStock', title: 'In stock', type: 'boolean', description: 'Turn off when sold out. The product stays on the website, marked out of stock.', initialValue: true }),
    defineField({ name: 'description', title: 'Product details', type: 'text', rows: 12, description: DETAILS_HELP }),

    defineField({ name: 'model', title: 'Model number', type: 'string', fieldset: 'more', description: 'Shown on the product card, e.g. "9140WB".' }),
    defineField({ name: 'capacity', title: 'Size for the filter', type: 'string', fieldset: 'more', description: 'Write it the same way for every product, e.g. "1.5 Ton", "8 kg", "8 cu ft", "20 L".' }),
    defineField({ name: 'inverter', title: 'Inverter model', type: 'boolean', fieldset: 'more', initialValue: false }),
    defineField({ name: 'type', title: 'Type', type: 'string', fieldset: 'more', description: 'Shown on the product card, e.g. "Heat & Cool", "Front Load", "Glass Door".' }),
    defineField({ name: 'slug', title: 'Web address', type: 'slug', fieldset: 'more', description: 'Leave empty: it is made from the product name automatically.', options: { source: 'name', maxLength: 96 } }),
  ],
  orderings: [
    { title: 'Newest first', name: 'newest', by: [{ field: '_createdAt', direction: 'desc' }] },
    { title: 'Name', name: 'name', by: [{ field: 'name', direction: 'asc' }] },
    { title: 'Price, low to high', name: 'priceAsc', by: [{ field: 'price', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', brand: 'brand.name', price: 'price', sale: 'salePrice', inStock: 'inStock', media: 'images.0' },
    prepare: ({ title, brand, price, sale, inStock, media }) => ({
      title,
      subtitle: [brand, money(sale ?? price), inStock === false && 'OUT OF STOCK'].filter(Boolean).join(' · '),
      media,
    }),
  },
})
