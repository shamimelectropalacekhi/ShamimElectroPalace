import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { money, priceOf } from '@/lib/format'

export default function ProductCard({ product }) {
  const price = priceOf(product)
  const href = `/product/${product.slug}`
  return <article className="product-card">
    <Link className="product-image" href={href}>
      <img src={product.image} alt={product.name} loading="lazy" />
      <span className={product.stock ? 'product-badge' : 'product-badge sold'}>{product.stock ? product.badge : 'Out of stock'}</span>
      <span className="zoom-icon"><ArrowRight size={17} /></span>
    </Link>
    <div className="product-info">
      <p className="product-brand">{product.brand} <span>·</span> {product.category}</p>
      <h3>{product.name}</h3>
      <div className="stock-line">{product.stock ? <><span className="stock-dot" /> In stock · {product.stock} left</> : <span className="sold-text">Currently unavailable</span>}</div>
      <div className="price-row"><strong>{money(price)}</strong>{price !== product.price && <del>{money(product.price)}</del>}</div>
      <Link className="add-button" href={href}>View product <ArrowRight size={15} /></Link>
    </div>
  </article>
}
