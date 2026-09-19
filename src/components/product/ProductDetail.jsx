'use client'
import Link from 'next/link'
import { ArrowLeft, Phone } from 'lucide-react'
import { useStore } from '@/context/StoreContext'
import { store } from '@/data/store'
import { money, priceOf } from '@/lib/format'
import { whatsappLink } from '@/lib/whatsapp'
import WhatsAppIcon from '@/components/layout/WhatsAppIcon'

export default function ProductDetail({ slug }) {
  const { products } = useStore()
  const product = products.find((item) => item.slug === slug)
  if (!product) return <main className="detail-page"><div className="empty-state">Product not found.</div></main>

  const price = priceOf(product)
  // Orders happen over WhatsApp, so the message carries what the customer is looking at.
  const enquiry = product.stock
    ? `Hello ${store.name}, I would like to order the ${product.name} (${product.brand}) at ${money(price)}. Is it available?`
    : `Hello ${store.name}, is the ${product.name} (${product.brand}) back in stock?`

  return <main className="detail-page">
    <Link className="back-button" href="/products"><ArrowLeft size={16} /> Back to products</Link>
    <div className="detail-layout">
      <div className="gallery">
        <div className="gallery-main"><img src={product.image} alt={product.name} /></div>
      </div>
      <div className="detail-copy">
        <p className="product-brand">{product.brand} &middot; {product.category}</p>
        <h1>{product.name}</h1>
        <div className="detail-price"><strong>{money(price)}</strong>{price !== product.price && <del>{money(product.price)}</del>}</div>
        <p className={product.stock ? 'stock-detail' : 'stock-detail sold-text'}>{product.stock ? `In stock - ${product.stock} units ready to dispatch` : 'Currently out of stock'}</p>
        <p className="detail-description">{product.description}</p>
        <div className="detail-actions">
          <a className="primary-button" href={whatsappLink(enquiry)} target="_blank" rel="noreferrer"><WhatsAppIcon size={18} /> {product.stock ? 'Order on WhatsApp' : 'Ask about availability'}</a>
          <a className="outline-button" href={store.phoneHref}><Phone size={16} /> Call {store.phone}</a>
        </div>
        <div className="specs"><h2>Product specifications</h2>{Object.entries(product.specs).map(([key, value]) => <div key={key}><span>{key}</span><b>{value}</b></div>)}</div>
      </div>
    </div>
  </main>
}
