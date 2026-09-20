import Link from 'next/link'
import { ArrowRight, BadgeCheck, Headphones, Search } from 'lucide-react'
import { seedProducts } from '@/data/products'
import { money, priceOf } from '@/lib/format'

// Two chips float over the panel edge. Static picks, so the hero stays server-rendered.
const chips = [seedProducts[1], seedProducts[5]]

export default function Hero() {
  return <section className="hero-section">
    <div className="hero-panel">
      <img className="hero-bg" src="https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1600&q=90" alt="" />
      <div className="hero-copy">
        <p className="eyebrow">THE SMARTER HOME STARTS HERE</p>
        <h1>Make your home more <em>comfortable &amp; modern</em></h1>
        <p className="hero-intro">Genuine appliances from the brands you already trust, delivered and installed across Rawalpindi &amp; Islamabad.</p>
        {/* Plain GET form - /products already reads ?q=, so no client JS needed here. */}
        <form className="hero-search" action="/products">
          <input name="q" placeholder="Search appliances or brands" aria-label="Search appliances or brands" />
          <button type="submit" aria-label="Search"><Search size={18} /></button>
        </form>
        <div className="hero-notes"><span><BadgeCheck size={15} /> Genuine warranty</span><span><Headphones size={15} /> Installation support</span></div>
      </div>
    </div>
    {chips.map((product, index) => <Link key={product.id} className={`hero-chip ${index ? 'two' : 'one'}`} href={`/product/${product.slug}`}>
      <img src={product.image} alt="" />
      <span><small>{product.brand}</small><b>{product.name}</b><i>{money(priceOf(product))}</i></span>
      <ArrowRight size={15} />
    </Link>)}
  </section>
}
