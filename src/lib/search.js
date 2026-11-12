// Header search. Pure, so it runs on the server and in search.check.mjs.
// Every word of the query must match; products that match in their name/brand/category rank first.

// What customers type -> what the catalog calls it.
const SYNONYMS = {
  fridge: ['refrigerator'], refrigerator: ['refrigerator'],
  ac: ['air conditioner'], aircon: ['air conditioner'], airconditioner: ['air conditioner'],
  tv: ['led tv'], led: ['led tv'], television: ['led tv'],
  washer: ['washing machine'],
  cooler: ['dispenser'],
}

const lower = (text) => String(text || '').toLowerCase()
const compact = (text) => lower(text).replace(/[^a-z0-9]+/g, '')
const singular = (word) => (word.length > 3 && word.endsWith('s') ? word.slice(0, -1) : word)
const wordsOf = (text) => new Set(text.split(/[^a-z0-9.]+/).filter(Boolean))

function index(product) {
  const main = lower([product.name, product.brand, product.category, product.type, product.model, product.cap, product.inv ? 'inverter' : ''].join(' '))
  const all = `${main} ${lower(product.description)} ${lower(Object.values(product.specs || {}).join(' '))}`
  return { main, mainWords: wordsOf(main), all, allWords: wordsOf(all), allCompact: compact(all) }
}

function hit(token, text, words, squeezed) {
  const base = singular(token)
  const alts = SYNONYMS[token] || SYNONYMS[base]
  if (alts) return alts.some((alt) => text.includes(alt)) || words.has(token)
  // Numbers ("1.5", "8") and very short words must be whole words, or "ac" would match "machine".
  if (/^[\d.]+$/.test(token) || token.length <= 2) return words.has(token)
  if (text.includes(token) || text.includes(base)) return true
  // "wf5257" finds "WF-5257".
  const tight = compact(token)
  return Boolean(squeezed) && tight.length >= 4 && squeezed.includes(tight)
}

export function searchProducts(products, query = '') {
  const tokens = lower(query).split(/[\s,]+/).filter(Boolean)
  if (!tokens.length) return products
  const scored = []
  for (const product of products) {
    const i = index(product)
    let score = 0
    for (const token of tokens) {
      if (hit(token, i.main, i.mainWords)) score += 2
      else if (hit(token, i.all, i.allWords, i.allCompact)) score += 1
      else { score = -1; break }
    }
    if (score > 0) scored.push([score, product])
  }
  return scored.sort((a, b) => b[0] - a[0]).map(([, product]) => product) // sort is stable: catalog order within a score
}
