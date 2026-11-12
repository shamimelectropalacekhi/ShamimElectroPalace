import { notFound } from 'next/navigation'
import ProductListing from '@/components/product/ProductListing'
import { getCatalog, slim } from '@/lib/sanity'

// Pre-built at deploy time; categories added in Sanity later are built on first visit.
export async function generateStaticParams() {
  const { categories } = await getCatalog()
  return categories.map(({ name }) => ({ name }))
}

export async function generateMetadata({ params }) {
  const name = decodeURIComponent((await params).name)
  const { store } = await getCatalog()
  return { title: name, description: `Shop ${name.toLowerCase()} from trusted brands at ${store.name}, ${store.city}.` }
}

export default async function CategoryPage({ params }) {
  const name = decodeURIComponent((await params).name)
  const { categories, products } = await getCatalog()
  if (!categories.some((c) => c.name === name)) notFound()
  return <ProductListing key={name} title={name} category={name} products={products.filter((p) => p.category === name).map(slim)} />
}
