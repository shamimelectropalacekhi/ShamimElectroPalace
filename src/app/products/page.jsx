import ProductListing from '@/components/product/ProductListing'

export const metadata = { title: 'All products', description: 'Browse air conditioners, refrigerators, washing machines, TVs and kitchen appliances.' }

export default async function ProductsPage({ searchParams }) {
  const { q = '' } = await searchParams
  return <ProductListing title="Shop bestsellers" query={q} />
}
