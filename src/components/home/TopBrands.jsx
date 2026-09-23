'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useStore } from '@/context/StoreContext'
import ProductIcon from '@/components/product/ProductIcon'
import { SectionHead } from '@/components/product/ProductRow'

// Scroll-snapped brand cards; one dot per snap position (6 on desktop, 8 on mobile).
export default function TopBrands() {
  const { brandDeals } = useStore()
  const ref = useRef(null)
  const [dots, setDots] = useState(1)
  const [index, setIndex] = useState(0)

  const measure = () => {
    if (!ref.current?.firstElementChild) return
    const el = ref.current
    const card = el.firstElementChild
    const max = el.scrollWidth - el.clientWidth
    const stepPx = card.offsetWidth + 16
    const n = Math.round(max / stepPx) + 1
    setDots(n)
    setIndex(max > 0 ? Math.round((el.scrollLeft / max) * (n - 1)) : 0)
  }
  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const scrollTo = (i) => {
    const el = ref.current
    el.scrollTo({ left: ((el.scrollWidth - el.clientWidth) * i) / (dots - 1), behavior: 'smooth' })
  }

  if (!brandDeals.length) return null
  return <section>
    <SectionHead prefix="Top" accent="Appliance Brands" href="/products" />
    <div className="brand-scroll" ref={ref} onScroll={measure}>
      {brandDeals.map((b) => <Link key={b.name} className="brand-card" href={`/products?brand=${encodeURIComponent(b.name)}`} style={{ background: b.bg, color: b.fg }}>
        <span className="brand-copy">
          {b.tag && <span className="brand-tag" style={{ background: b.tagBg }}>{b.tag}</span>}
          <span className="brand-logo" style={{ background: b.logoBg, color: b.logoFg }}>{b.name}</span>
          {b.off && <span className="brand-off">Up to {b.off}% OFF</span>}
        </span>
        <span className="brand-art">
          <span className="brand-circle" style={{ background: b.circle }} />
          <ProductIcon icon={b.icon} color={b.dark ? '#fff' : '#000'} />
        </span>
      </Link>)}
    </div>
    {dots > 1 && <div className="dots brand-dots">{Array.from({ length: dots }, (_, i) => <button key={i} className={i === index ? 'on' : ''} onClick={() => scrollTo(i)} aria-label="Scroll brands" />)}</div>}
  </section>
}
