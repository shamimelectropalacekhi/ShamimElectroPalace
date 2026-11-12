// Run: node src/lib/filterProducts.check.mjs
import assert from 'node:assert/strict'
import { countIn, emptyFilters, filterProducts, fromQuery, PAGE, priceBuckets, sizeGroup, toQuery } from './filterProducts.js'
import { pickRelated, pickRow } from './picks.js'

const AC = 'Air Conditioners'
const base = [
  { id: 1, name: 'A', brand: 'Haier', category: AC, type: 'Split', size: '1 Ton', inv: true, price: 200000, discountedPrice: 150000, thumb: 'a.jpg' },
  { id: 2, name: 'B', brand: 'Gree', category: AC, type: 'Floor Standing', size: '1.5 Ton', inv: false, price: 100000, discountedPrice: 90000, thumb: 'b.jpg' },
  { id: 3, name: 'C', brand: 'Haier', category: AC, type: 'Split', size: '1.5 Ton', inv: true, price: 120000, discountedPrice: 120000 },
]
const buckets = priceBuckets(base)
assert.equal(priceBuckets([{ price: 50000 }])[0][2], 'Under Rs. 10,000')

const f = { ...emptyFilters(), brands: ['Haier'] }
assert.deepEqual(filterProducts(base, f, buckets, 'new').map((p) => p.name), ['A', 'C'])
// Brand counts skip the brand facet itself; inverter counts respect it.
assert.equal(countIn(base, f, buckets, 'brand', (p) => p.brand === 'Gree'), 1)
assert.equal(countIn(base, f, buckets, 'inv', (p) => !p.inv), 0)
assert.deepEqual(filterProducts(base, emptyFilters(), buckets, 'low').map((p) => p.name), ['B', 'C', 'A'])
assert.deepEqual(filterProducts(base, emptyFilters(), buckets, 'off').map((p) => p.name), ['A', 'B', 'C'])
assert.deepEqual(filterProducts(base, { ...emptyFilters(), price: 0 }, buckets, 'new').map((p) => p.name), ['B'])
assert.deepEqual(filterProducts(base, { ...emptyFilters(), types: ['Split'], sizes: ['1.5 Ton'] }, buckets, 'new').map((p) => p.name), ['C'])

// Fridge sizes in either unit land in the same four ranges; other units are left alone.
assert.equal(sizeGroup('8 cu ft'), 'Up to 9 cu ft')
assert.equal(sizeGroup('246 L'), 'Up to 9 cu ft')
assert.equal(sizeGroup('380 L'), '10 – 13 cu ft')
assert.equal(sizeGroup('16 cu ft'), '14 – 17 cu ft')
assert.equal(sizeGroup('622 L'), '18 cu ft & above')
assert.equal(sizeGroup('1.5 Ton'), '1.5 Ton')
assert.equal(sizeGroup('20 L'), '20 L') // a microwave, not a fridge
assert.equal(sizeGroup(undefined), null)

// Address round trip.
const state = { f: { ...emptyFilters(), brands: ['Haier', 'Gree'], price: 1, inv: 'inv' }, sort: 'low', shown: PAGE * 3 }
const query = toQuery(state, { q: 'ac' })
assert.equal(query, 'q=ac&brand=Haier%2CGree&price=1&tech=inv&sort=low&n=72')
assert.deepEqual(fromQuery(new URLSearchParams(query)), state)
assert.deepEqual(fromQuery({ brand: 'Haier' }).f.brands, ['Haier']) // plain object from the server
assert.equal(toQuery({ f: emptyFilters(), sort: 'new', shown: PAGE }), '')
assert.deepEqual(fromQuery({ sort: 'bogus', price: '9', n: '-5' }), { f: emptyFilters(), sort: 'new', shown: PAGE })

// Home rows: hand-picked first (in the order picked), then products with photos, mixing brands.
const row = [
  { id: 1, brand: 'PEL', thumb: 'x' }, { id: 2, brand: 'PEL', thumb: 'x' }, { id: 3, brand: 'PEL' },
  { id: 4, brand: 'Haier', thumb: 'x' }, { id: 5, brand: 'Orient', thumb: 'x' },
]
assert.deepEqual(pickRow(row, [], 4).map((p) => p.id), [1, 4, 5, 2])
assert.deepEqual(pickRow(row, [3, 5], 4).map((p) => p.id), [3, 5, 1, 4]) // a picked product shows even without a photo
assert.deepEqual(pickRow(row, ['gone', 2, 2], 2).map((p) => p.id), [2, 1]) // deleted or repeated picks are skipped
assert.equal(pickRow(row, [1, 2, 3, 4, 5, 6]).length, 5)
// Related: same brand and close price first.
const related = pickRelated({ id: 1, brand: 'Haier', category: AC, price: 150000 }, [
  { id: 1, brand: 'Haier', category: AC, price: 150000 }, { id: 2, brand: 'Gree', category: AC, price: 151000 },
  { id: 3, brand: 'Haier', category: AC, price: 170000 }, { id: 4, brand: 'Haier', category: 'Refrigerators', price: 150000 },
], 2)
assert.deepEqual(related.map((p) => p.id), [3, 2])
console.log('filterProducts ok')
