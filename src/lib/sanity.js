import { cache } from 'react'
import { createClient } from '@sanity/client'
import { store as defaults } from '@/data/store'
import { parseDetails } from './parseDetails'
import { sizeGroup } from './filterProducts'

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
  "brands": *[_type == "brand"] | order(order asc, name asc){ name, showInTopBrands, cardTag, upToOff, cardColor, logoColor, "icon": cardCategory->icon, "logo": logo.asset->url },
  "products": *[_type == "product" && defined(name)] | order(_createdAt desc){
    "id": _id, "slug": slug.current, "updatedAt": _updatedAt, name, model, price, salePrice, inStock, featured, description, capacity, inverter, type,
    "brand": brand->name, "category": category->name, "icon": category->icon, "images": images[]{ alt, "url": asset->url }
  }
}`

// Where the site lives. Netlify sets URL; set SITE_URL once the shop has its own domain.
const siteUrl = (process.env.SITE_URL || process.env.URL || 'https://shamimelectropalace.netlify.app').replace(/\/$/, '')

// Sanity's image CDN resizes on the fly.
const sized = (url, width) => url && `${url}?w=${width}&auto=format&fit=max`

// Dark card backgrounds get white text, light ones dark text (the design's two card styles).
function isDark(hex = '') {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) || 0)
  return 0.299 * r + 0.587 * g + 0.114 * b < 140
}

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

// A category left on the "Other" icon in the Studio still gets a fitting picture from its name.
const ICON_BY_NAME = [[/\btvs?\b|television/i, 'tv'], [/dispenser/i, 'water-dispenser'], [/freezer/i, 'freezer'], [/personal|beauty|grooming/i, 'personal-care'], [/home/i, 'home']]
const iconFor = (name = '', icon) => (icon && icon !== 'other' ? icon : ICON_BY_NAME.find(([pattern]) => pattern.test(name))?.[1] || 'other')

// "Free delivery & installation" and "Easy installments" are only promised on these.
const BIG = ['air-conditioner', 'washing-machine', 'refrigerator']

const toProduct = (p) => {
  const details = parseDetails(p.description)
  const images = (p.images || []).filter((image) => image.url).map((image) => ({ url: sized(image.url, 1000), thumb: sized(image.url, 400), alt: image.alt || p.name }))
  return {
    id: p.id, slug: p.slug || slugify(p.name), name: p.name, brand: p.brand || '', category: p.category || '', icon: iconFor(p.category, p.icon),
    model: p.model, cap: p.capacity, size: sizeGroup(p.capacity), inv: Boolean(p.inverter), type: p.type, featured: Boolean(p.featured), big: BIG.includes(p.icon),
    price: p.price || 0, discountedPrice: p.salePrice ?? p.price ?? 0, stock: p.inStock === false ? 0 : 1,
    images, image: images[0]?.url || '', thumb: images[0]?.thumb || '', description: details.description,
    specs: Object.fromEntries(details.specs), updatedAt: p.updatedAt,
    summary: [p.model, p.inverter && 'Inverter', p.type].filter(Boolean).join(' · '),
  }
}

// Only what a product card and the listing filters need. Listing pages send this to the browser, not the full product.
export const slim = (p) => ({
  id: p.id, slug: p.slug, name: p.name, brand: p.brand, category: p.category, icon: p.icon, model: p.model, type: p.type,
  size: p.size, inv: p.inv, price: p.price, discountedPrice: p.discountedPrice, stock: p.stock, thumb: p.thumb, summary: p.summary,
})

const toBrand = (b, count) => {
  const bg = b.cardColor || '#EFEFEF'
  const dark = isDark(bg)
  return {
    name: b.name, count, top: b.showInTopBrands === true, tag: b.cardTag, off: b.upToOff, icon: b.icon, bg, logo: sized(b.logo, 800),
    logoBg: b.logoColor || '#111111', logoFg: '#fff', dark,
    fg: dark ? '#fff' : '#222', tagBg: dark ? 'rgba(255,255,255,.12)' : 'rgba(0,0,0,.07)', circle: dark ? 'rgba(255,255,255,.06)' : 'rgba(255,255,255,.55)',
  }
}

function toStore(s = {}) {
  const whatsapp = s.whatsappNumber || defaults.whatsapp
  const phone = s.phone || defaults.phone
  return {
    ...defaults,
    siteUrl,
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
    aboutText: s.aboutText || defaults.aboutText,
    help: (s.help || []).filter((section) => section.title && section.text).map(({ title, text }) => ({ title, text })),
    socials: [['Facebook', 'facebook'], ['Instagram', 'instagram'], ['TikTok', 'tiktok'], ['YouTube', 'youtube']]
      .filter(([, key]) => s[key]).map(([label, key]) => ({ label, key, url: s[key] })),
    heroSlides: (s.heroSlides || []).map((slide) => ({ ...slide, image: sized(slide.image, 700) })),
  }
}

async function loadCatalog() {
  const { settings, categories, brands, products: rows } = await client.fetch(QUERY)
  const products = rows.map(toProduct).map((product, i, all) => {
    const same = all.slice(0, i).filter((other) => other.slug === product.slug).length
    return same ? { ...product, slug: `${product.slug}-${same + 1}` } : product
  })
  const perBrand = new Map()
  for (const p of products) perBrand.set(p.brand, (perBrand.get(p.brand) || 0) + 1)
  // A brand with nothing listed has no page and no home card (its card would open an empty list).
  const stocked = brands.filter((b) => perBrand.get(b.name)).map((b) => toBrand(b, perBrand.get(b.name)))
  return {
    store: toStore(settings || undefined),
    categories: categories.map((c) => ({
      name: c.name, icon: iconFor(c.name, c.icon), big: BIG.includes(c.icon), sub: c.subtitle || '', subs: c.footerLine || '', prefix: c.rowHeading || 'Best prices on',
      capacityLabel: c.capacityLabel || 'Capacity', inverterFilter: c.inverterFilter !== false,
    })),
    brands: stocked,
    brandDeals: stocked.filter((b) => b.top),
    products,
  }
}

// One Sanity query a minute at most, shared by every page (and by the whole build).
// ponytail: in-memory, per server instance; move to a Sanity webhook + revalidateTag if edits must appear instantly.
let memo = { at: 0, promise: null }
export const getCatalog = cache(() => {
  if (Date.now() - memo.at > 60_000) {
    const promise = loadCatalog().catch((error) => { memo = { at: 0, promise: null }; throw error })
    memo = { at: Date.now(), promise }
  }
  return memo.promise
})

// What every page needs (header, footer, WhatsApp links). No products: each page sends only the ones it shows.
export const getShell = async () => {
  const { store, categories, brands, brandDeals } = await getCatalog()
  return { store, categories, brands: brands.map(({ name, count }) => ({ name, count })), brandDeals }
}
