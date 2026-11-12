import { getCatalog, slim } from '@/lib/sanity'
import { categoryHref } from '@/lib/format'
import { pickFeatured } from '@/lib/picks'
import ProductRow, { SectionHead } from '@/components/product/ProductRow'

const ROWS = 5 // the first five categories (by menu position) that have products; the rest are one tap away in "Shop by Category"

// One row per main category: products marked "Featured" in the Studio first, then a mix of brands.
export default async function FeaturedProducts() {
  const { categories, products } = await getCatalog()
  return categories
    .map((c) => ({ c, items: pickFeatured(products.filter((p) => p.category === c.name)) }))
    .filter(({ items }) => items.length)
    .slice(0, ROWS)
    .map(({ c, items }) => <section key={c.name}>
      <SectionHead prefix={c.prefix} accent={c.name} href={categoryHref(c.name)} />
      <ProductRow products={items.map(slim)} />
    </section>)
}
