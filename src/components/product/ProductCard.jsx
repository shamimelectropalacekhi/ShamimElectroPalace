'use client'
import Link from 'next/link'
import { money, offOf, priceOf } from '@/lib/format'
import { useStore } from '@/context/StoreContext'
import { productEnquiry, whatsappLink } from '@/lib/whatsapp'
import WhatsAppIcon from '@/components/layout/WhatsAppIcon'
import { ProductVisual } from './ProductIcon'

// The title link stretches over the whole card; the WhatsApp button sits above it.
export default function ProductCard({ product }) {
  const { store } = useStore()
  const price = priceOf(product)
  const discounted = price < product.price
  return <article className="card">
    <div className="card-media">
      <ProductVisual product={product} />
      {discounted && <div className="off-tag">{offOf(product)}<br />OFF</div>}
    </div>
    <div className="card-body">
      <Link className="card-title" href={`/product/${product.slug}`}>{product.name}</Link>
      <div className="card-spec">{product.summary || product.brand}</div>
      <div className="card-price"><b>{money(price)}</b>{discounted && <del>{money(product.price)}</del>}</div>
      <div className="card-rule" />
      {discounted && <div className="save">Save {money(product.price - price)}</div>}
      <div className="card-fill" />
      <a className="wa-btn card-wa" href={whatsappLink(store.whatsapp, productEnquiry(product))} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={17} /><span>Chat on WhatsApp</span></a>
    </div>
  </article>
}
