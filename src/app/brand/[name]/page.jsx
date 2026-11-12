import { notFound } from 'next/navigation'
import ProductListing from '@/components/product/ProductListing'
import { getCatalog, slim } from '@/lib/sanity'

// One page per brand that has products. Brand cards on the home page and the footer link here.
export async function generateStaticParams() {
  const { brands } = await getCatalog()
  return brands.map(({ name }) => ({ name }))
}

const find = async (params) => {
  const name = decodeURIComponent((await params).name).toLowerCase()
  const { brands, products, store } = await getCatalog()
  const brand = brands.find((b) => b.name.toLowerCase() === name)
  return { brand, store, products: brand ? products.filter((p) => p.brand === brand.name) : [] }
}

export async function generateMetadata({ params }) {
  const { brand, store, products } = await find(params)
  if (!brand) return { title: 'Brand' }
  const kinds = [...new Set(products.map((p) => p.category.toLowerCase()))].slice(0, 4).join(', ')
  return { title: `${brand.name} appliances`, description: `${brand.name} ${kinds} at ${store.name}, ${store.city}. Prices and photos for ${products.length} products.` }
}

export default async function BrandPage({ params }) {
  const { brand, products } = await find(params)
  if (!brand) notFound()
  return <ProductListing key={brand.name} title={`${brand.name} products`} crumb={brand.name} brand={brand.name} products={products.map(slim)} />
}
