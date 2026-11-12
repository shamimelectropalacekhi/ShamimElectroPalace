import { getCatalog, slim } from '@/lib/sanity'
import { categoryHref } from '@/lib/format'
import { pickRow } from '@/lib/picks'
import ProductRow, { SectionHead } from '@/components/product/ProductRow'

const AUTO_ROWS = 5

// Product rows on the home page, set in Store settings -> Home page rows: which categories, in what order,
// and up to five hand-picked products each (the rest of a row fills itself with a mix of brands).
// With no rows set, the first five categories in menu order are shown.
export default async function FeaturedProducts() {
  const { store, categories, products } = await getCatalog()
  const byName = new Map(categories.map((c) => [c.name, c]))
  const rows = store.homeRows.length
    ? store.homeRows.filter((row) => byName.has(row.category)).map((row) => ({ c: byName.get(row.category), chosen: row.products }))
    : categories.slice(0, AUTO_ROWS * 2).map((c) => ({ c, chosen: [] }))
  return rows
    .map(({ c, chosen }) => {
      const inCategory = products.filter((p) => p.category === c.name)
      return { c, items: pickRow(inCategory, chosen) }
    })
    .filter(({ items }) => items.length)
    .slice(0, store.homeRows.length || AUTO_ROWS)
    .map(({ c, items }) => <section key={c.name}>
      <SectionHead prefix={c.prefix} accent={c.name} href={categoryHref(c.name)} />
      <ProductRow products={items.map(slim)} />
    </section>)
}
