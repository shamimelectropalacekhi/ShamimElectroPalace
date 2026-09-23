import { defineArrayMember, defineField, defineType } from 'sanity'

// One document only: the Studio sidebar opens it directly (see sanity.config.js).
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Store settings',
  type: 'document',
  groups: [
    { name: 'contact', title: 'Contact', default: true },
    { name: 'hero', title: 'Home page banner' },
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
    defineField({ name: 'city', title: 'Delivery area', type: 'string', group: 'contact', description: 'Used in text like "Free delivery across …", e.g. "Rawalpindi & Islamabad".' }),
    defineField({ name: 'hours', title: 'Store timings', type: 'text', rows: 2, group: 'contact', description: 'One line per row, e.g. "Mon – Sat: 10:00 AM – 9:00 PM".' }),
    defineField({ name: 'mapsLink', title: 'Google Maps link', type: 'url', group: 'contact', description: 'Open the shop in Google Maps, click Share, copy the link. Leave empty to search by address.' }),
    defineField({ name: 'footerText', title: 'Footer description', type: 'text', rows: 2, group: 'contact', description: 'The short line under the logo in the footer.' }),

    defineField({
      name: 'heroSlides', title: 'Banner slides', type: 'array', group: 'hero',
      description: 'The rotating banner at the top of the home page.',
      validation: (r) => r.max(6),
      of: [defineArrayMember({
        type: 'object', name: 'heroSlide',
        fields: [
          defineField({ name: 'eyebrow', title: 'Small top line', type: 'string', description: 'e.g. "Best deals on air conditioners"' }),
          defineField({ name: 'title', title: 'Big headline', type: 'string', description: 'e.g. "COOL SUMMER DEALS"', validation: (r) => r.required() }),
          defineField({ name: 'subtitle', title: 'Line under the headline', type: 'string', description: 'e.g. "Inverter ACs up to 30% OFF"' }),
          defineField({ name: 'category', title: 'Browse button goes to', type: 'reference', to: [{ type: 'category' }] }),
          defineField({ name: 'whatsappMessage', title: 'WhatsApp message', type: 'string', description: 'Pre-filled when the customer taps "Chat on WhatsApp".' }),
          defineField({ name: 'image', title: 'Picture (optional)', type: 'image', options: { hotspot: true }, description: 'Replaces the icon on the right. A product photo on a transparent or dark background works best.' }),
        ],
        preview: { select: { title: 'title', subtitle: 'subtitle', media: 'image' } },
      })],
    }),

    defineField({ name: 'facebook', title: 'Facebook page', type: 'url', group: 'social' }),
    defineField({ name: 'instagram', title: 'Instagram', type: 'url', group: 'social' }),
    defineField({ name: 'tiktok', title: 'TikTok', type: 'url', group: 'social' }),
    defineField({ name: 'youtube', title: 'YouTube', type: 'url', group: 'social' }),
  ],
  preview: { prepare: () => ({ title: 'Store settings' }) },
})
