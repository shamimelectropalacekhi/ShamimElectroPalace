'use client'
import { useStore } from '@/context/StoreContext'
import { categoryHref } from '@/lib/format'
import ProductRow, { SectionHead } from '@/components/product/ProductRow'

// One scrolling row of the five newest products per category; empty categories get no row.
export default function FeaturedProducts() {
  const { categories, products } = useStore()
  return categories.map((c) => {
    const items = products.filter((p) => p.category === c.name).slice(0, 5)
    return items.length > 0 && <section key={c.name}>
      <SectionHead prefix={c.prefix} accent={c.name} href={categoryHref(c.name)} />
      <ProductRow products={items} />
    </section>
  })
}
