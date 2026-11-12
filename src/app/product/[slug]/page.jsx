import { notFound } from 'next/navigation'
import ProductDetail from '@/components/product/ProductDetail'
import { getCatalog, slim } from '@/lib/sanity'
import { productHref } from '@/lib/format'
import { pickRelated } from '@/lib/picks'

const findProduct = async (slug) => (await getCatalog()).products.find((product) => product.slug === slug)

export async function generateStaticParams() {
  const { products } = await getCatalog()
  return products.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const product = await findProduct((await params).slug)
  if (!product) return { title: 'Product' }
  return { title: `${product.name.trim()} - ${product.brand}`, description: product.description || undefined, ...(product.image && { openGraph: { images: [product.image] } }) }
}

export default async function ProductPage({ params }) {
  const { slug } = await params
  const { products, store } = await getCatalog()
  const product = products.find((item) => item.slug === slug)
  if (!product) notFound()
  const url = store.siteUrl + productHref(product)
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Product', name: product.name.trim(), description: product.description || undefined, image: product.image || undefined,
    sku: product.model || undefined, url,
    brand: { '@type': 'Brand', name: product.brand },
    offers: { '@type': 'Offer', priceCurrency: 'PKR', price: product.discountedPrice, url, availability: product.stock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock' },
  }
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <ProductDetail product={product} related={pickRelated(product, products).map(slim)} />
  </>
}
