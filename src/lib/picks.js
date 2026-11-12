// Which products go in the home page rows and the "More ..." row on a product page. Pure.
const priceOf = (product) => product.discountedPrice || product.price

// Products switched to "Featured" in the Studio come first. The rest of the row is filled with
// products that have a photo, one brand at a time, so a single price-list import can't fill a row.
export function pickFeatured(products, count = 5) {
  const picked = products.filter((p) => p.featured).slice(0, count)
  const byBrand = new Map()
  for (const p of products) {
    if (p.featured || !p.thumb) continue
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
