import Link from 'next/link'
import { categories, categoryInfo } from '@/data/products'
import { categoryHref } from '@/lib/format'
import ProductIcon from '@/components/product/ProductIcon'
import { SectionHead } from '@/components/product/ProductRow'

export default function CategoryLinks() {
  return <section>
    <SectionHead prefix="Shop by" accent="Category" href="/products" />
    <div className="cat-grid">{categories.map((category) => <Link key={category} href={categoryHref(category)}>
      <span className="cat-circle"><ProductIcon category={category} /></span>
      <b>{category}</b>
      <small>{categoryInfo[category].sub}</small>
    </Link>)}</div>
  </section>
}
