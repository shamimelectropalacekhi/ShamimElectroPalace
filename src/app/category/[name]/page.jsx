import { notFound } from 'next/navigation'
import ProductListing from '@/components/product/ProductListing'
import { getCatalog } from '@/lib/sanity'

// Pre-built at deploy time; categories added in Sanity later are built on first visit.
export async function generateStaticParams() {
  const { categories } = await getCatalog()
  return categories.map(({ name }) => ({ name }))
}

export async function generateMetadata({ params }) {
  const name = decodeURIComponent((await params).name)
  return { title: name, description: `Shop ${name.toLowerCase()} from trusted brands at Shamim Electro Palace.` }
}

export default async function CategoryPage({ params }) {
  const name = decodeURIComponent((await params).name)
  const { categories } = await getCatalog()
  if (!categories.some((c) => c.name === name)) notFound()
  return <ProductListing key={name} title={name} category={name} />
}
