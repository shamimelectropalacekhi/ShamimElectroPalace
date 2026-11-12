// Listing filters. Pure, so it runs on the server render and in filterProducts.check.mjs.
const priceOf = (product) => product.discountedPrice || product.price

export const PAGE = 24 // products shown before "Show more"
export const emptyFilters = () => ({ cats: [], brands: [], types: [], price: null, sizes: [], inv: null })

export const sortOptions = [
  { value: 'new', label: 'Sort: Newest' },
  { value: 'low', label: 'Price: Low to High' },
  { value: 'high', label: 'Price: High to Low' },
  { value: 'off', label: 'Biggest Discount' }, // only offered when something is discounted
]

// Cheaper ranges when everything listed is under Rs. 100,000 (small appliances).
export const priceBuckets = (products) => products.length && products.every((p) => priceOf(p) < 100000)
  ? [[0, 10000, 'Under Rs. 10,000'], [10000, 25000, 'Rs. 10,000 – 25,000'], [25000, 50000, 'Rs. 25,000 – 50,000'], [50000, Infinity, 'Above Rs. 50,000']]
  : [[0, 100000, 'Under Rs. 100,000'], [100000, 175000, 'Rs. 100,000 – 175,000'], [175000, 250000, 'Rs. 175,000 – 250,000'], [250000, Infinity, 'Above Rs. 250,000']]

export const inBucket = (product, [min, max]) => priceOf(product) >= min && priceOf(product) < max
const discount = (product) => 1 - priceOf(product) / product.price

// Fridge and freezer sizes arrive as "8 cu ft" from some price lists and "380 L" from others.
// Both become one of four cu ft ranges so the filter is short; other sizes ("1.5 Ton", "8 kg", "43 inch") stay as written.
export function sizeGroup(cap) {
  if (!cap) return null
  const n = parseFloat(cap)
  const unit = cap.replace(/^[\d.\s]+/, '').toLowerCase()
  const cuft = unit.startsWith('cu') ? n : unit === 'l' && n >= 100 ? n / 28.32 : null
  if (cuft == null || Number.isNaN(cuft)) return cap
  const whole = Math.round(cuft)
  return whole <= 9 ? 'Up to 9 cu ft' : whole <= 13 ? '10 – 13 cu ft' : whole <= 17 ? '14 – 17 cu ft' : '18 cu ft & above'
}
export const sizeOrder = (label) => parseFloat(label) || 0 // "Up to 9 cu ft" sorts first

// `skip` ignores one facet, so each facet's counts show what picking it would give.
export function passes(product, f, buckets, skip) {
  return (skip === 'cat' || !f.cats.length || f.cats.includes(product.category)) &&
    (skip === 'brand' || !f.brands.length || f.brands.includes(product.brand)) &&
    (skip === 'type' || !f.types.length || f.types.includes(product.type)) &&
    (skip === 'price' || f.price == null || !buckets[f.price] || inBucket(product, buckets[f.price])) &&
    (skip === 'size' || !f.sizes.length || f.sizes.includes(product.size)) &&
    (skip === 'inv' || f.inv == null || Boolean(product.inv) === (f.inv === 'inv'))
}

export function filterProducts(base, f, buckets, sort) {
  const result = base.filter((p) => passes(p, f, buckets))
  if (sort === 'low') result.sort((a, b) => priceOf(a) - priceOf(b))
  if (sort === 'high') result.sort((a, b) => priceOf(b) - priceOf(a))
  if (sort === 'off') result.sort((a, b) => discount(b) - discount(a))
  return result // 'new' keeps catalog order (newest first)
}

export const countIn = (base, f, buckets, skip, test) => base.filter((p) => test(p) && passes(p, f, buckets, skip)).length

// Filters live in the page address (?brand=Orient&sort=low) so Back and shared links keep them.
const LISTS = [['cat', 'cats'], ['brand', 'brands'], ['type', 'types'], ['size', 'sizes']]
const list = (value) => String(value || '').split(',').map((x) => x.trim()).filter(Boolean)

export function fromQuery(params = {}) {
  const get = (key) => (typeof params.get === 'function' ? params.get(key) : params[key]) || ''
  const f = emptyFilters()
  for (const [key, field] of LISTS) f[field] = list(get(key))
  if (/^[0-3]$/.test(get('price'))) f.price = Number(get('price'))
  if (get('tech') === 'inv' || get('tech') === 'non') f.inv = get('tech')
  const sort = sortOptions.some((option) => option.value === get('sort')) ? get('sort') : 'new'
  const shown = Math.min(Math.max(parseInt(get('n'), 10) || PAGE, PAGE), 2000)
  return { f, sort, shown }
}

export function toQuery({ f, sort, shown }, keep = {}) {
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(keep)) if (value) params.set(key, value)
  for (const [key, field] of LISTS) if (f[field].length) params.set(key, f[field].join(','))
  if (f.price != null) params.set('price', String(f.price))
  if (f.inv) params.set('tech', f.inv)
  if (sort !== 'new') params.set('sort', sort)
  if (shown > PAGE) params.set('n', String(shown))
  return params.toString()
}
