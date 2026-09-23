import { notFound } from 'next/navigation'
import ProductListing from '@/components/product/ProductListing'
import { categories } from '@/data/products'

export const generateStaticParams = () => categories.map((name) => ({ name }))
export const dynamicParams = false

export async function generateMetadata({ params }) {
  const name = decodeURIComponent((await params).name)
  return { title: name, description: `Shop ${name.toLowerCase()} from trusted brands at Shamim Electro Palace.` }
}

export default async function CategoryPage({ params }) {
  const name = decodeURIComponent((await params).name)
  if (!categories.includes(name)) notFound()
  return <ProductListing key={name} title={name} category={name} />
}
