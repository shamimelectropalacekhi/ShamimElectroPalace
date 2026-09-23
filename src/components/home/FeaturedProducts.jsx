'use client'
import { useStore } from '@/context/StoreContext'
import { categories, categoryInfo } from '@/data/products'
import { categoryHref } from '@/lib/format'
import ProductRow, { SectionHead } from '@/components/product/ProductRow'

// One scrolling row of five products per category.
export default function FeaturedProducts() {
  const { products } = useStore()
  return categories.map((category) => <section key={category}>
    <SectionHead prefix={categoryInfo[category].prefix} accent={category} href={categoryHref(category)} />
    <ProductRow products={products.filter((p) => p.category === category).slice(0, 5)} />
  </section>)
}
