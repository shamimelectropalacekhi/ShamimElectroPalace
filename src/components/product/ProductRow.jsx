import Link from 'next/link'
import ProductCard from './ProductCard'

// Underlined section title: "prefix <blue>accent</blue>", optional "View All" link.
export function SectionHead({ prefix, accent, href }) {
  return <div className="sec-head">
    <h2>{prefix} <span>{accent}</span></h2>
    {href && <Link className="view-all" href={href}>View All <span>›</span></Link>}
  </div>
}

// Horizontally scrolling, snap-aligned row of cards.
export default function ProductRow({ products }) {
  return <div className="row-scroll">{products.map((product) => <div key={product.id}><ProductCard product={product} /></div>)}</div>
}
