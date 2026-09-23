import ProductDetail from '@/components/product/ProductDetail'
import { seedProducts } from '@/data/products'

const findSeed = (slug) => seedProducts.find((product) => product.slug === slug)

export const generateStaticParams = () => seedProducts.map(({ slug }) => ({ slug }))

// ponytail: SEO data comes from seed products; switch to a DB lookup here once products live in MongoDB.
export async function generateMetadata({ params }) {
  const product = findSeed((await params).slug)
  if (!product) return { title: 'Product' }
  return { title: `${product.name} - ${product.brand}`, description: product.description, ...(product.image && { openGraph: { images: [product.image] } }) }
}

export default async function ProductPage({ params }) {
  const { slug } = await params
  const product = findSeed(slug)
  const jsonLd = product && {
    '@context': 'https://schema.org', '@type': 'Product', name: product.name, description: product.description, image: product.image || undefined,
    brand: { '@type': 'Brand', name: product.brand },
    offers: { '@type': 'Offer', priceCurrency: 'PKR', price: product.discountedPrice, availability: product.stock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock' },
  }
  return <>
    {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
    <ProductDetail slug={slug} />
  </>
}
