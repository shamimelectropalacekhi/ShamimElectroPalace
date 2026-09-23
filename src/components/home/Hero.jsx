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
  const step = (by) => setIndex((i) => (i + by + slides.length) % slides.length)

  // Autoplay; re-arming on every change means a manual click restarts the 5.5s wait.
  useEffect(() => {
    if (slides.length < 2) return
    const timer = setTimeout(() => setIndex((i) => (i + 1) % slides.length), 5500)
    return () => clearTimeout(timer)
  }, [index, slides.length])

  if (!slides.length) return null
  const slide = slides[index % slides.length]
  return <section className="hero" aria-roledescription="carousel">
    <div className="hero-panel">
      <div className="hero-copy">
        {slide.eyebrow && <div className="hero-eyebrow">{slide.eyebrow}</div>}
        <div className="hero-title">{slide.title}</div>
        {slide.subtitle && <div className="hero-sub">{slide.subtitle}</div>}
        <div className="hero-ctas">
          <a className="wa-pill hero-wa" href={whatsappLink(store.whatsapp, slide.whatsappMessage || generalEnquiry(store))} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={18} /><span>Chat on WhatsApp</span></a>
          {slide.category && <Link className="hero-browse" href={categoryHref(slide.category)}>Browse {slide.category} ›</Link>}
        </div>
        {slides.length > 1 && <div className="dots">{slides.map((s, i) => <button key={i} className={i === index ? 'on' : ''} onClick={() => setIndex(i)} aria-label={`Go to slide ${i + 1}`} />)}</div>}
      </div>
      <div className="hero-art">
        <div className="hero-orb">
          {slide.image ? <img src={slide.image} alt="" /> : <><ProductIcon icon={slide.icon} /><span>product image</span></>}
        </div>
      </div>
    </div>
    {slides.length > 1 && <>
      <button className="hero-arrow prev" onClick={() => step(-1)} aria-label="Previous"><ChevronLeft size={22} /></button>
      <button className="hero-arrow next" onClick={() => step(1)} aria-label="Next"><ChevronRight size={22} /></button>
    </>}
  </section>
}
