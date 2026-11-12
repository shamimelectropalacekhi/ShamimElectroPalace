'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CreditCard, Phone, Share2, ShieldCheck, Truck } from 'lucide-react'
import { useStore } from '@/context/StoreContext'
import { brandHref, categoryHref, money, offOf, priceOf } from '@/lib/format'
import { productEnquiry, shareLink, whatsappLink } from '@/lib/whatsapp'
import WhatsAppIcon from '@/components/layout/WhatsAppIcon'
import { ProductVisual } from './ProductIcon'
import ProductRow, { SectionHead } from './ProductRow'

// `product` is the full product; `related` are card-sized products for the "More ..." row. Both come from the server page.
export default function ProductDetail({ product, related = [] }) {
  const { store, setPage } = useStore()
  const [view, setView] = useState(0)
  const message = productEnquiry(product, store)

  // Tell the header which category to highlight and the floating WhatsApp button which product to ask about.
  useEffect(() => {
    setPage({ category: product.category, waText: message })
    return () => setPage({})
  }, [product.category, message, setPage])

  const price = priceOf(product)
  const discounted = price < product.price
  const photos = product.images || []
  const current = Math.min(view, Math.max(photos.length - 1, 0))
  const ownSpecs = Object.entries(product.specs || {})
  const specs = [['Brand', product.brand], product.model && ['Model', product.model], ...ownSpecs].filter(Boolean)
  const highlights = ownSpecs.slice(0, 4)
  const order = whatsappLink(store.whatsapp, message)

  return <main className="page">
    <div className="crumbs">
      <Link href="/">Home</Link><span>›</span>
      <Link href={categoryHref(product.category)}>{product.category}</Link><span>›</span>
      <span>{product.name}</span>
    </div>
    <div className="pd">
      <div className="pd-gallery">
        <div className="pd-main">
          <ProductVisual product={product} image={photos[current]} caption="Photo coming soon. Ask us on WhatsApp for pictures." eager />
          {discounted && <div className="off-tag">{offOf(product)}<br />OFF</div>}
        </div>
        {photos.length > 1 && <div className="pd-thumbs">{photos.map((photo, i) => <button key={i} className={i === current ? 'on' : ''} onClick={() => setView(i)} aria-label={`Photo ${i + 1} of ${photos.length}`} aria-pressed={i === current}>
          <ProductVisual product={product} image={{ url: photo.thumb, alt: '' }} />
        </button>)}</div>}
      </div>
      <div className="pd-info">
        <Link className="pd-brand" href={brandHref(product.brand)}>{product.brand}</Link>
        <h1>{product.name}</h1>
        <div className="pd-meta">
          {product.model && <span>Model: <b>{product.model}</b></span>}
          <span className={product.stock ? 'pd-stock' : 'pd-stock out'}><i />{product.stock ? 'Available at store' : 'Currently out of stock'}</span>
          <a className="pd-share" href={shareLink(product, store)} target="_blank" rel="noopener noreferrer"><Share2 size={15} />Share</a>
        </div>
        {product.description && <p className="pd-desc">{product.description}</p>}
        <div className="pd-price">
          <div><b>{money(price)}</b>{discounted && <><del>{money(product.price)}</del><span className="off-chip">{offOf(product)} OFF</span></>}</div>
          {discounted && <span className="save">Save {money(product.price - price)}</span>}
          <small>Prices can change. Message us to confirm today&apos;s price.</small>
        </div>
        {highlights.length > 0 && <div className="pd-features">
          <b>Key features</b>
          {highlights.map(([key, value]) => <div key={key}><i /><span><small>{key}:</small> {value}</span></div>)}
        </div>}
        <div className="pd-actions">
          <a className="wa-btn pd-wa" href={order} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={22} /><span>Chat on WhatsApp to Order</span></a>
          <a className="pd-call" href={store.phoneHref}><Phone size={20} /><span>Call Now</span></a>
        </div>
        <div className="pd-msg">Opens WhatsApp with this product&apos;s name, price and link already typed.</div>
        <div className="pd-perks">
          <span><ShieldCheck size={20} />Official brand warranty</span>
          {product.big && <span><Truck size={20} />Free delivery &amp; installation</span>}
          {product.big && <span><CreditCard size={20} />Easy installments</span>}
          <Link href="/help">Delivery &amp; warranty details ›</Link>
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

    {/* Phones: price and order button stay on screen. */}
    <div className="pd-bar">
      <span><small>{product.stock ? 'Price' : 'Out of stock'}</small><b>{money(price)}</b></span>
      <a className="pd-bar-call" href={store.phoneHref} aria-label={`Call ${store.phone}`}><Phone size={20} /></a>
      <a className="wa-btn" href={order} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={19} /><span>Order on WhatsApp</span></a>
    </div>
  </main>
}
