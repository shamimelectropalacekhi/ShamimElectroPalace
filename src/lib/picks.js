// Which products go in the home page rows and the "More ..." row on a product page. Pure.
const priceOf = (product) => product.discountedPrice || product.price

export const ROW = 5 // products per home page row

// `chosen` are product ids picked for this row in Store settings -> Home page rows, in that order.
// Any space left is filled with products that have a photo, one brand at a time, so a single price-list import can't fill a row.
export function pickRow(products, chosen = [], count = ROW) {
  const byId = new Map(products.map((p) => [p.id, p]))
  const picked = [...new Set(chosen)].map((id) => byId.get(id)).filter(Boolean).slice(0, count)
  const taken = new Set(picked.map((p) => p.id))
  const byBrand = new Map()
  for (const p of products) {
    if (taken.has(p.id) || !p.thumb) continue
    if (!byBrand.has(p.brand)) byBrand.set(p.brand, [])
    byBrand.get(p.brand).push(p)
  }
  const queues = [...byBrand.values()]
  while (picked.length < count && queues.some((queue) => queue.length)) {
    for (const queue of queues) if (queue.length && picked.length < count) picked.push(queue.shift())
  }
  return picked
}

// Same category, closest in price, with a nudge towards the same brand.
export function pickRelated(product, products, count = 5) {
  const price = priceOf(product)
  const distance = (other) => Math.abs(priceOf(other) - price) + (other.brand === product.brand ? 0 : price * 0.15)
  return products
    .filter((other) => other.category === product.category && other.id !== product.id)
    .sort((a, b) => distance(a) - distance(b))
    .slice(0, count)
}
