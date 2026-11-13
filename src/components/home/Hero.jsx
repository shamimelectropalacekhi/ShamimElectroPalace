'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useStore } from '@/context/StoreContext'
import { categoryHref } from '@/lib/format'
import { generalEnquiry, whatsappLink } from '@/lib/whatsapp'
import WhatsAppIcon from '@/components/layout/WhatsAppIcon'
import ProductIcon from '@/components/product/ProductIcon'

// Banner slides come from Store settings -> Home page banner.
export default function Hero() {
  const { store } = useStore()
  const slides = store.heroSlides
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false) // while the mouse or keyboard focus is on the banner
  const step = (by) => setIndex((i) => (i + by + slides.length) % slides.length)

  // Autoplay; re-arming on every change means a manual click restarts the 5.5s wait.
  // Off for visitors whose device asks for reduced motion.
  useEffect(() => {
    if (slides.length < 2 || paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = setTimeout(() => setIndex((i) => (i + 1) % slides.length), 5500)
    return () => clearTimeout(timer)
  }, [index, slides.length, paused])

  if (!slides.length) return null
  const slide = slides[index % slides.length]
  const dots = slides.length > 1 && slides.map((s, i) => <button key={i} className={i === index ? 'on' : ''} onClick={() => setIndex(i)} aria-label={`Go to slide ${i + 1}`} aria-current={i === index} />)
  const waHref = whatsappLink(store.whatsapp, slide.whatsappMessage || generalEnquiry(store))

  // A slide with a full banner picture is only that picture, edge to edge, and the whole banner is the link.
  let panel
  if (slide.full) {
    const spot = slide.fullSpot ? { objectPosition: `${slide.fullSpot.x * 100}% ${slide.fullSpot.y * 100}%` } : undefined
    const picture = <img className="hero-full-img" src={slide.full} alt={slide.title || store.name} style={spot} />
    panel = <div className="hero-panel hero-panel--full">
      {slide.category
        ? <Link className="hero-full" href={categoryHref(slide.category)}>{picture}</Link>
        : <a className="hero-full" href={waHref} target="_blank" rel="noopener noreferrer">{picture}</a>}
      {dots && <div className="dots hero-dots-over">{dots}</div>}
    </div>
  }
  return <section className="hero" aria-roledescription="carousel" aria-label="Offers"
    onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
    {panel || <div className="hero-panel">
      <div className="hero-copy">
        {slide.eyebrow && <div className="hero-eyebrow">{slide.eyebrow}</div>}
        <h2 className="hero-title">{slide.title}</h2>
        {slide.subtitle && <div className="hero-sub">{slide.subtitle}</div>}
        <div className="hero-ctas">
          <a className="wa-pill hero-wa" href={waHref} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={18} /><span>Chat on WhatsApp</span></a>
          {slide.category && <Link className="hero-browse" href={categoryHref(slide.category)}>Browse {slide.category} ›</Link>}
        </div>
        {dots && <div className="dots">{dots}</div>}
      </div>
      <div className="hero-art">
        <div className="hero-orb">
          {slide.image ? <img src={slide.image} alt="" /> : <ProductIcon icon={slide.icon} />}
        </div>
      </div>
    </div>}
    {slides.length > 1 && <>
      <button className="hero-arrow prev" onClick={() => step(-1)} aria-label="Previous slide"><ChevronLeft size={22} /></button>
      <button className="hero-arrow next" onClick={() => step(1)} aria-label="Next slide"><ChevronRight size={22} /></button>
    </>}
  </section>
}
