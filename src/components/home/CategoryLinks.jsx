import Link from 'next/link'
import { getCatalog } from '@/lib/sanity'
import { categoryHref } from '@/lib/format'
import ProductIcon from '@/components/product/ProductIcon'
import { SectionHead } from '@/components/product/ProductRow'

export default async function CategoryLinks() {
  const { categories } = await getCatalog()
  if (!categories.length) return null
  return <section>
    <SectionHead prefix="Shop by" accent="Category" href="/products" />
    <div className="cat-grid">{categories.map((c) => <Link key={c.name} href={categoryHref(c.name)}>
      <span className="cat-circle"><ProductIcon icon={c.icon} /></span>
      <b>{c.name}</b>
      {c.sub && <small>{c.sub}</small>}
    </Link>)}</div>
  </section>
}
