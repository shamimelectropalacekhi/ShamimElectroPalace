import ProductListing from '@/components/product/ProductListing'

export const metadata = { title: 'All products', description: 'Browse air conditioners, refrigerators, washing machines and kitchen appliances.' }

export default async function ProductsPage({ searchParams }) {
  const { q = '', brand = '' } = await searchParams
  // Keyed so a new header search or brand link starts from fresh filters.
  return <ProductListing key={`${q}|${brand}`} query={q} brand={brand} />
}
