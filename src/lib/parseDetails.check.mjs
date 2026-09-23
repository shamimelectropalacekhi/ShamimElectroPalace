// Run: node src/lib/parseDetails.check.mjs
import assert from 'node:assert/strict'
import { parseDetails } from './parseDetails.js'

const text = `The Dawlance 9140WB Avante is a compact, double-door direct-cool refrigerator designed for small families of 3 to 4 members.

Key Specifications.

Capacity: 8 Cubic Feet.
Dimensions: Width: 53 cm (20.9 in) | Depth: 50.5 cm (19.9 in) | Height: 126.9. cm (50 in).
• Compressor Type: Non-Inverter (Regular) compressor.
Warranty\t10 years`

const { description, specs } = parseDetails(text)
assert.equal(description, 'The Dawlance 9140WB Avante is a compact, double-door direct-cool refrigerator designed for small families of 3 to 4 members.')
assert.deepEqual(specs, [
  ['Capacity', '8 Cubic Feet'],
  ['Dimensions', 'Width: 53 cm (20.9 in) | Depth: 50.5 cm (19.9 in) | Height: 126.9. cm (50 in)'],
  ['Compressor Type', 'Non-Inverter (Regular) compressor'],
  ['Warranty', '10 years'],
])
assert.deepEqual(parseDetails('Features:\nJust a sentence.'), { description: 'Just a sentence.', specs: [] })
assert.deepEqual(parseDetails(), { description: '', specs: [] })
console.log('parseDetails ok')
