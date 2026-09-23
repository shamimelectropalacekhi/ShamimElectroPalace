import { notFound } from 'next/navigation'
import ProductDetail from '@/components/product/ProductDetail'
import { getCatalog } from '@/lib/sanity'

const findProduct = async (slug) => (await getCatalog()).products.find((product) => product.slug === slug)

export async function generateStaticParams() {
  const { products } = await getCatalog()
  return products.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const product = await findProduct((await params).slug)
  if (!product) return { title: 'Product' }
  return { title: `${product.name} - ${product.brand}`, description: product.description, ...(product.image && { openGraph: { images: [product.image] } }) }
}

export default async function ProductPage({ params }) {
  const { slug } = await params
  const product = await findProduct(slug)
  if (!product) notFound()
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Product', name: product.name, description: product.description, image: product.image || undefined,
    brand: { '@type': 'Brand', name: product.brand },
    offers: { '@type': 'Offer', priceCurrency: 'PKR', price: product.discountedPrice, availability: product.stock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock' },
  }
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <ProductDetail slug={slug} />
  </>
}
