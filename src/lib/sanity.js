import { cache } from 'react'
import { createClient } from '@sanity/client'
import { store as defaults } from '@/data/store'
import { parseDetails } from './parseDetails'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2025-02-19',
  useCdn: false, // freshest data; pages are cached by Next (revalidate in layout.jsx) anyway
  perspective: 'published', // drafts stay hidden until "Publish" is clicked
})

const QUERY = `{
  "settings": *[_id == "siteSettings"][0]{
    ..., heroSlides[]{ eyebrow, title, subtitle, whatsappMessage, "category": category->name, "icon": category->icon, "image": image.asset->url }
  },
  "categories": *[_type == "category"] | order(order asc, name asc){ name, icon, subtitle, footerLine, rowHeading, capacityLabel, inverterFilter },
  "brands": *[_type == "brand" && showInTopBrands == true] | order(order asc, name asc){ name, cardTag, upToOff, cardColor, logoColor, "icon": cardCategory->icon },
  "products": *[_type == "product" && defined(name)] | order(_createdAt desc){
    "id": _id, "slug": slug.current, name, model, price, salePrice, inStock, description, capacity, inverter, type,
    "brand": brand->name, "category": category->name, "icon": category->icon, "images": images[]{ alt, "url": asset->url }
  }
}`

// Sanity's image CDN resizes on the fly.
const sized = (url, width) => url && `${url}?w=${width}&auto=format&fit=max`

// Dark card backgrounds get white text, light ones dark text (the design's two card styles).
function isDark(hex = '') {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) || 0)
  return 0.299 * r + 0.587 * g + 0.114 * b < 140
}

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const toProduct = (p) => {
  const details = parseDetails(p.description)
  const images = (p.images || []).filter((image) => image.url).map((image) => ({ url: sized(image.url, 1000), alt: image.alt || p.name }))
  return {
    id: p.id, slug: p.slug || slugify(p.name), name: p.name, brand: p.brand || '', category: p.category || '', icon: p.icon,
    model: p.model, cap: p.capacity, inv: Boolean(p.inverter), type: p.type,
    price: p.price || 0, discountedPrice: p.salePrice ?? p.price ?? 0, stock: p.inStock === false ? 0 : 1,
    images, image: images[0]?.url || '', description: details.description,
    specs: Object.fromEntries(details.specs),
    summary: [p.model, p.inverter && 'Inverter', p.type].filter(Boolean).join(' · '),
  }
}

const toBrandCard = (b) => {
  const bg = b.cardColor || '#EFEFEF'
  const dark = isDark(bg)
  return {
    name: b.name, tag: b.cardTag, off: b.upToOff, icon: b.icon, bg, logoBg: b.logoColor || '#111111', logoFg: '#fff', dark,
    fg: dark ? '#fff' : '#222', tagBg: dark ? 'rgba(255,255,255,.12)' : 'rgba(0,0,0,.07)', circle: dark ? 'rgba(255,255,255,.06)' : 'rgba(255,255,255,.55)',
  }
}

function toStore(s = {}) {
  const whatsapp = s.whatsappNumber || defaults.whatsapp
  const phone = s.phone || defaults.phone
  return {
    ...defaults,
    name: s.storeName || defaults.name,
    whatsapp,
    whatsappDisplay: '+' + whatsapp.replace(/^(\d{2})(\d{3})(\d+)$/, '$1 $2 $3'),
    phone,
    phoneHref: `tel:${phone.replace(/[^\d+]/g, '')}`,
    email: s.email || defaults.email,
    address: s.address || defaults.address,
    city: s.city || defaults.city,
    hours: s.hours || defaults.hours,
    mapsLink: s.mapsLink || `https://maps.google.com/?q=${encodeURIComponent(`${s.storeName || defaults.name} ${s.address || defaults.address}`)}`,
    footerText: s.footerText || '',
    socials: [['Facebook', 'facebook'], ['Instagram', 'instagram'], ['TikTok', 'tiktok'], ['YouTube', 'youtube']]
      .filter(([, key]) => s[key]).map(([label, key]) => ({ label, key, url: s[key] })),
    heroSlides: (s.heroSlides || []).map((slide) => ({ ...slide, image: sized(slide.image, 700) })),
  }
}

// One query per page render; `cache` shares the result between the layout and the page.
export const getCatalog = cache(async () => {
  const { settings, categories, brands, products } = await client.fetch(QUERY)
  return {
    store: toStore(settings || undefined),
    categories: categories.map((c) => ({
      name: c.name, icon: c.icon, sub: c.subtitle || '', subs: c.footerLine || '', prefix: c.rowHeading || 'Best prices on',
      capacityLabel: c.capacityLabel || 'Capacity', inverterFilter: c.inverterFilter !== false,
    })),
    brandDeals: brands.map(toBrandCard),
    products: products.map(toProduct).map((product, i, all) => {
      const same = all.slice(0, i).filter((other) => other.slug === product.slug).length
      return same ? { ...product, slug: `${product.slug}-${same + 1}` } : product
    }),
  }
})
