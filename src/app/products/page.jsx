import ProductListing from '@/components/product/ProductListing'
import { getCatalog, slim } from '@/lib/sanity'
import { searchProducts } from '@/lib/search'

const first = (value) => (Array.isArray(value) ? value[0] : value) || ''

export async function generateMetadata({ searchParams }) {
  const q = first((await searchParams).q).trim()
  return q
    ? { title: `Search: ${q}`, robots: { index: false }, alternates: { canonical: '/products' } }
    : { title: 'All products', description: 'Browse air conditioners, refrigerators, washing machines and kitchen appliances.' }
}

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams
  const q = first(params.q).trim()
  const { products } = await getCatalog()
  const initial = Object.fromEntries(Object.entries(params).map(([key, value]) => [key, first(value)]))
  // Keyed so a new header search starts from fresh filters.
  return <ProductListing key={q} query={q} products={searchProducts(products, q).map(slim)} initial={initial} />
}
