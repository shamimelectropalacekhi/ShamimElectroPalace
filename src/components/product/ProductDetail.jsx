'use client'
import { useState } from 'react'
import Link from 'next/link'
import { CreditCard, Phone, ShieldCheck, Truck } from 'lucide-react'
import { useStore } from '@/context/StoreContext'
import { categoryHref, money, offOf, priceOf } from '@/lib/format'
import { productEnquiry, whatsappLink } from '@/lib/whatsapp'
import WhatsAppIcon from '@/components/layout/WhatsAppIcon'
import { ProductVisual } from './ProductIcon'
import ProductRow, { SectionHead } from './ProductRow'

// Placeholder gallery labels, shown only while a product has no photos.
const views = {
  'air-conditioner': ['Indoor unit', 'Outdoor unit', 'Remote', 'Installed'],
  'washing-machine': ['Front', 'Drum', 'Control panel', 'Side'],
  refrigerator: ['Front', 'Interior', 'Freezer', 'Side'],
}
const defaultViews = ['Front', 'Top', 'Accessories', 'In use']

export default function ProductDetail({ slug }) {
  const { store, products } = useStore()
  const [view, setView] = useState(0)
  const product = products.find((item) => item.slug === slug)
  if (!product) return <main className="page"><div className="no-results"><b>Product not found.</b><Link href="/products">Browse all products ›</Link></div></main>

  const price = priceOf(product)
  const discounted = price < product.price
  const photos = product.images || []
  const labels = photos.length ? photos.map((photo) => photo.alt) : views[product.icon] || defaultViews
  const current = Math.min(view, labels.length - 1)
  const ownSpecs = Object.entries(product.specs || {})
  const specs = [['Brand', product.brand], product.model && ['Model', product.model], ...ownSpecs].filter(Boolean)
  const highlights = ownSpecs.slice(0, 4)
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 5)
  const message = productEnquiry(product)

  return <main className="page">
    <div className="crumbs">
      <Link href="/">Home</Link><span>›</span>
      <Link href={categoryHref(product.category)}>{product.category}</Link><span>›</span>
      <span>{product.name}</span>
    </div>
    <div className="pd">
      <div className="pd-gallery">
        <div className="pd-main">
          <ProductVisual product={product} image={photos[current]} caption={`${labels[current].toLowerCase()} · product photo`} />
          {discounted && <div className="off-tag">{offOf(product)}<br />OFF</div>}
        </div>
        {labels.length > 1 && <div className="pd-thumbs">{labels.map((label, i) => <button key={i} className={i === current ? 'on' : ''} onClick={() => setView(i)} aria-label={label}>
          <ProductVisual product={product} image={photos[i]} caption={label} />
        </button>)}</div>}
      </div>
      <div className="pd-info">
        <span className="pd-brand">{product.brand}</span>
        <h1>{product.name}</h1>
        <div className="pd-meta">
          {product.model && <span>Model: <b>{product.model}</b></span>}
          <span className={product.stock ? 'pd-stock' : 'pd-stock out'}><i />{product.stock ? 'Available at store' : 'Currently out of stock'}</span>
        </div>
        {product.description && <p className="pd-desc">{product.description}</p>}
        <div className="pd-price">
          <div><b>{money(price)}</b>{discounted && <><del>{money(product.price)}</del><span className="off-chip">{offOf(product)} OFF</span></>}</div>
          {discounted && <span className="save">Save {money(product.price - price)}</span>}
        </div>
        {highlights.length > 0 && <div className="pd-features">
          <b>Key features</b>
          {highlights.map(([key, value]) => <div key={key}><i /><span><small>{key}:</small> {value}</span></div>)}
        </div>}
        <div className="pd-actions">
          <a className="wa-btn pd-wa" href={whatsappLink(store.whatsapp, message)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={22} /><span>Chat on WhatsApp to Order</span></a>
          <a className="pd-call" href={store.phoneHref}><Phone size={20} /><span>Call Now</span></a>
        </div>
        <div className="pd-msg">Opens WhatsApp with: “{message}”</div>
        <div className="pd-perks">
          <span><ShieldCheck size={20} />Official brand warranty</span>
          <span><Truck size={20} />Free delivery &amp; installation</span>
          <span><CreditCard size={20} />Easy installments</span>
        </div>
      </div>
    </div>

    <section className="pd-section">
      <SectionHead prefix="Product" accent="Specifications" />
      <div className="spec-table">{specs.map(([key, value]) => <div key={key}><span>{key}</span><b>{value}</b></div>)}</div>
    </section>

    {related.length > 0 && <section className="pd-section">
      <SectionHead prefix="More" accent={product.category} href={categoryHref(product.category)} />
      <ProductRow products={related} />
    </section>}
  </main>
}
