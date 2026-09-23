// Run: node src/lib/filterProducts.check.mjs
import assert from 'node:assert/strict'
import { baseProducts, countIn, emptyFilters, filterProducts, priceBuckets } from './filterProducts.js'

const AC = 'Air Conditioners'
const products = [
  { name: 'A', brand: 'Haier', category: AC, cap: '1 Ton', inv: true, price: 200000, discountedPrice: 150000 },
  { name: 'B', brand: 'Gree', category: AC, cap: '1.5 Ton', inv: false, price: 100000, discountedPrice: 90000 },
  { name: 'C', brand: 'Haier', category: 'Refrigerators', cap: '1 Ton', inv: true, price: 50000, discountedPrice: 50000 },
]
const base = baseProducts(products, { category: AC })
const buckets = priceBuckets(base)
assert.equal(priceBuckets([products[2]])[0][2], 'Under Rs. 10,000')
assert.deepEqual(base.map((p) => p.name), ['A', 'B'])
assert.deepEqual(baseProducts(products, { query: 'gree' }).map((p) => p.name), ['B'])

const f = { ...emptyFilters(), brands: ['Haier'] }
assert.deepEqual(filterProducts(base, f, buckets, 'pop').map((p) => p.name), ['A'])
// Brand counts skip the brand facet itself; inverter counts respect it.
assert.equal(countIn(base, f, buckets, 'brand', (p) => p.brand === 'Gree'), 1)
assert.equal(countIn(base, f, buckets, 'inv', (p) => !p.inv), 0)
assert.deepEqual(filterProducts(base, emptyFilters(), buckets, 'low').map((p) => p.name), ['B', 'A'])
assert.deepEqual(filterProducts(base, emptyFilters(), buckets, 'off').map((p) => p.name), ['A', 'B'])
assert.deepEqual(filterProducts(base, { ...emptyFilters(), price: 0 }, buckets, 'pop').map((p) => p.name), ['B'])
console.log('filterProducts ok')
