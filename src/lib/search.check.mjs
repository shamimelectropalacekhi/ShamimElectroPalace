// Run: node src/lib/search.check.mjs
import assert from 'node:assert/strict'
import { searchProducts } from './search.js'

const products = [
  { name: 'PEL PAWM 1100 Fully Automatic Washing Machine', brand: 'PEL', category: 'Washing Machines', type: 'Top Load', model: 'PAWM 1100', cap: '11 kg' },
  { name: 'Haier HSU-18HFCF Split AC', brand: 'Haier', category: 'Air Conditioners', type: 'Split', model: 'HSU-18HFCF', cap: '1.5 Ton', inv: true },
  { name: 'Dawlance 9140 WB Avante GD Refrigerator', brand: 'Dawlance', category: 'Refrigerators', type: 'Glass Door', model: '9140 WB', cap: '8 cu ft' },
  { name: 'Westpoint Air Fryer WF-5257', brand: 'Westpoint', category: 'Small Kitchen Appliances', type: 'Air Fryer', model: 'WF-5257', description: 'Large 6.5 Liter Capacity' },
  { name: 'Haier 43 Inch Google TV', brand: 'Haier', category: 'LED TVs', type: 'Google TV', model: 'H43K800', cap: '43 inch' },
]
const names = (q) => searchProducts(products, q).map((p) => p.model)

assert.deepEqual(names('fridge'), ['9140 WB'])
assert.deepEqual(names('dawlance fridge'), ['9140 WB'])
assert.deepEqual(names('haier ac'), ['HSU-18HFCF'])
assert.deepEqual(names('ac'), ['HSU-18HFCF']) // not "machine"
assert.deepEqual(names('1.5 ton'), ['HSU-18HFCF'])
assert.deepEqual(names('wf5257'), ['WF-5257'])
assert.deepEqual(names('WF-5257'), ['WF-5257'])
assert.deepEqual(names('tv'), ['H43K800'])
assert.deepEqual(names('air fryers'), ['WF-5257'])
assert.deepEqual(names('6.5 liter'), ['WF-5257']) // description is searched too
assert.deepEqual(names('haier'), ['HSU-18HFCF', 'H43K800'])
assert.deepEqual(names('zzzz'), [])
assert.equal(searchProducts(products, '  ').length, products.length)
console.log('search ok')
