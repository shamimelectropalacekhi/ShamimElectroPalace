import { defineArrayMember, defineField, defineType } from 'sanity'

// One document only: the Studio sidebar opens it directly (see sanity.config.js).
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Store settings',
  type: 'document',
  groups: [
    { name: 'contact', title: 'Contact', default: true },
    { name: 'hero', title: 'Home page banner' },
    { name: 'rows', title: 'Home page rows' },
    { name: 'pages', title: 'About & Help pages' },
    { name: 'social', title: 'Social media' },
  ],
  fields: [
    defineField({ name: 'storeName', title: 'Store name', type: 'string', group: 'contact', validation: (r) => r.required() }),
    defineField({
      name: 'whatsappNumber', title: 'WhatsApp number', type: 'string', group: 'contact',
      description: 'Country code first, digits only, no + or spaces. e.g. 923001234567',
      validation: (r) => r.required().regex(/^\d{10,15}$/, { name: 'digits only, e.g. 923001234567' }),
    }),
    defineField({ name: 'phone', title: 'Phone number', type: 'string', group: 'contact', description: 'As customers should see it, e.g. "+92 51 512 3456".', validation: (r) => r.required() }),
    defineField({ name: 'email', title: 'Email', type: 'string', group: 'contact', validation: (r) => r.email() }),
    defineField({ name: 'address', title: 'Shop address', type: 'string', group: 'contact', validation: (r) => r.required() }),
    defineField({ name: 'city', title: 'Delivery area', type: 'string', group: 'contact', description: 'Used in text like "Free delivery across …", e.g. "Karachi".' }),
    defineField({ name: 'hours', title: 'Store timings', type: 'text', rows: 4, group: 'contact', description: 'One line per row, e.g. "Mon – Sat: 10:00 AM – 9:00 PM".' }),
    defineField({ name: 'mapsLink', title: 'Google Maps link', type: 'url', group: 'contact', description: 'Open the shop in Google Maps, click Share, copy the link. Leave empty to search by address.' }),
    defineField({ name: 'footerText', title: 'Footer description', type: 'text', rows: 2, group: 'contact', description: 'The short line under the logo in the footer.' }),

    defineField({
      name: 'heroSlides', title: 'Banner slides', type: 'array', group: 'hero',
      description: 'The rotating banner at the top of the home page.',
      validation: (r) => r.max(6),
      of: [defineArrayMember({
        type: 'object', name: 'heroSlide',
        fields: [
          defineField({
            name: 'fullImage', title: 'Full banner picture (optional)', type: 'image', options: { hotspot: true },
            description: 'Fills the whole banner, like a poster: the dark background, text and buttons below are not shown. Best as a wide picture, about 3 times wider than tall (e.g. 2400 × 750). Tapping it opens the "Browse button" category, or WhatsApp if no category is set. Use the hotspot to choose what stays visible on phones.',
          }),
          defineField({ name: 'eyebrow', title: 'Small top line', type: 'string', description: 'e.g. "Best deals on air conditioners"' }),
          defineField({ name: 'title', title: 'Big headline', type: 'string', description: 'e.g. "COOL SUMMER DEALS". With a full banner picture this is only used as its description for screen readers and Google.', validation: (r) => r.custom((title, { parent }) => Boolean(title || parent?.fullImage) || 'Add a headline, or a full banner picture') }),
          defineField({ name: 'subtitle', title: 'Line under the headline', type: 'string', description: 'e.g. "Inverter ACs up to 30% OFF"' }),
          defineField({ name: 'category', title: 'Browse button goes to', type: 'reference', to: [{ type: 'category' }] }),
          defineField({ name: 'whatsappMessage', title: 'WhatsApp message', type: 'string', description: 'Pre-filled when the customer taps "Chat on WhatsApp".' }),
          defineField({ name: 'image', title: 'Picture (optional)', type: 'image', options: { hotspot: true }, description: 'Replaces the icon on the right. A product photo on a transparent or dark background works best.' }),
        ],
        preview: { select: { title: 'title', subtitle: 'subtitle', media: 'image', full: 'fullImage' }, prepare: ({ title, subtitle, media, full }) => ({ title: title || 'Picture banner', subtitle: full ? 'Full banner picture' : subtitle, media: full || media }) },
      })],
    }),

    defineField({
      name: 'homeRows', title: 'Product rows on the home page', type: 'array', group: 'rows',
      description: 'Add a row for each category to show on the home page, in the order you want (drag to reorder). Each row shows five products: the ones you pick first, then the rest are filled automatically. Leave this list empty to show the first five categories from the menu.',
      validation: (r) => r.max(12),
      of: [defineArrayMember({
        type: 'object', name: 'homeRow',
        fields: [
          defineField({ name: 'category', title: 'Category', type: 'reference', to: [{ type: 'category' }], options: { disableNew: true }, validation: (r) => r.required() }),
          defineField({
            name: 'products', title: 'Products to show (up to 5, optional)', type: 'array',
            description: 'Pick from this row\'s category, in the order to show them. Leave empty, or pick fewer than five, and the row fills itself with a mix of brands.',
            validation: (r) => r.max(5).unique(),
            of: [defineArrayMember({
              type: 'reference', to: [{ type: 'product' }],
              options: {
                disableNew: true,
                // Only products in the category chosen above this list.
                filter: ({ document, parentPath }) => {
                  const key = parentPath.find((step) => step && typeof step === 'object' && '_key' in step)?._key
                  const category = document.homeRows?.find((row) => row._key === key)?.category?._ref
                  return category ? { filter: 'category._ref == $category', params: { category } } : {}
                },
              },
            })],
          }),
        ],
        preview: {
          select: { title: 'category.name', p0: 'products.0.name', p1: 'products.1.name', p2: 'products.2.name', p3: 'products.3.name', p4: 'products.4.name' },
          prepare: ({ title, ...picked }) => {
            const names = Object.values(picked).filter(Boolean)
            return { title: title || 'Choose a category', subtitle: names.length ? `${names.length} picked: ${names.join(', ')}` : 'Filled automatically' }
          },
        },
      })],
    }),

    defineField({ name: 'aboutText', title: 'About page text', type: 'text', rows: 4, group: 'pages', description: 'The paragraph under the heading on the About page. Leave empty to keep the standard text.' }),
    defineField({
      name: 'help', title: 'Help page (delivery, warranty, installments)', type: 'array', group: 'pages',
      description: 'One box per topic on the "Delivery, warranty & installments" page. Leave empty to keep the general text that just asks customers to message you.',
      of: [defineArrayMember({
        type: 'object', name: 'helpSection',
        fields: [
          defineField({ name: 'title', title: 'Topic', type: 'string', description: 'e.g. "Delivery"', validation: (r) => r.required() }),
          defineField({ name: 'text', title: 'Answer', type: 'text', rows: 4, description: 'One paragraph per line.', validation: (r) => r.required() }),
        ],
        preview: { select: { title: 'title', subtitle: 'text' } },
      })],
    }),

    defineField({ name: 'facebook', title: 'Facebook page', type: 'url', group: 'social' }),
    defineField({ name: 'instagram', title: 'Instagram', type: 'url', group: 'social' }),
    defineField({ name: 'tiktok', title: 'TikTok', type: 'url', group: 'social' }),
    defineField({ name: 'youtube', title: 'YouTube', type: 'url', group: 'social' }),
  ],
  preview: { prepare: () => ({ title: 'Store settings' }) },
})
