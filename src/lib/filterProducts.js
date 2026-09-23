// Listing filters. Pure, so it runs on the server render and in filterProducts.check.mjs.
const priceOf = (product) => product.discountedPrice || product.price
const KITCHEN = 'Small Kitchen Appliances'

export const emptyFilters = () => ({ brands: [], price: null, caps: [], inv: null })

export const sortOptions = [
  { value: 'pop', label: 'Sort: Popular' },
  { value: 'low', label: 'Price: Low to High' },
  { value: 'high', label: 'Price: High to Low' },
  { value: 'off', label: 'Biggest Discount' },
]

export const priceBuckets = (category) => category === KITCHEN
  ? [[0, 10000, 'Under Rs. 10,000'], [10000, 25000, 'Rs. 10,000 – 25,000'], [25000, 50000, 'Rs. 25,000 – 50,000'], [50000, Infinity, 'Above Rs. 50,000']]
  : [[0, 100000, 'Under Rs. 100,000'], [100000, 175000, 'Rs. 100,000 – 175,000'], [175000, 250000, 'Rs. 175,000 – 250,000'], [250000, Infinity, 'Above Rs. 250,000']]

const inBucket = (product, [min, max]) => priceOf(product) >= min && priceOf(product) < max
const discount = (product) => 1 - priceOf(product) / product.price

// Products in the category that match the search text, before any sidebar filter.
export const baseProducts = (products, { category, query = '' }) => {
  const q = query.toLowerCase()
  return products.filter((p) => (!category || p.category === category) &&
    (!q || `${p.name} ${p.brand} ${p.model || ''} ${p.type || ''} ${p.category}`.toLowerCase().includes(q)))
}

// `skip` ignores one facet, so each facet's counts show what picking it would give.
export function passes(product, f, buckets, skip) {
  return (skip === 'brand' || !f.brands.length || f.brands.includes(product.brand)) &&
    (skip === 'price' || f.price == null || inBucket(product, buckets[f.price])) &&
    (skip === 'cap' || !f.caps.length || f.caps.includes(product.cap)) &&
    (skip === 'inv' || f.inv == null || Boolean(product.inv) === (f.inv === 'inv'))
}

export function filterProducts(base, f, buckets, sort) {
  const result = base.filter((p) => passes(p, f, buckets))
  if (sort === 'low') result.sort((a, b) => priceOf(a) - priceOf(b))
  if (sort === 'high') result.sort((a, b) => priceOf(b) - priceOf(a))
  if (sort === 'off') result.sort((a, b) => discount(b) - discount(a))
  return result // 'pop' keeps catalog order
}

export const countIn = (base, f, buckets, skip, test) => base.filter((p) => test(p) && passes(p, f, buckets, skip)).length
export { inBucket }
