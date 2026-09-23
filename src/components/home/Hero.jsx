'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { categoryHref } from '@/lib/format'
import { whatsappLink } from '@/lib/whatsapp'
import WhatsAppIcon from '@/components/layout/WhatsAppIcon'
import ProductIcon from '@/components/product/ProductIcon'

const slides = [
  { eyebrow: 'Best deals on air conditioners', title: 'COOL SUMMER DEALS', sub: 'Inverter ACs up to 30% OFF', category: 'Air Conditioners', msg: "Hi, I'd like to know about your Cool Summer Deals on inverter ACs." },
  { eyebrow: 'Front load, top load & twin tub', title: 'WASH DAY, SORTED.', sub: 'Automatic washers from Rs. 84,999', category: 'Washing Machines', msg: "Hi, I'd like to know about your washing machine offers." },
  { eyebrow: 'Glass door & inverter fridges', title: 'STAY FRESH LONGER.', sub: 'Refrigerators up to 20% OFF', category: 'Refrigerators', msg: "Hi, I'd like to know about your refrigerator offers." },
  { eyebrow: 'Air fryers, microwaves & more', title: 'SMART KITCHEN WEEK.', sub: 'Small appliances up to 25% OFF', category: 'Small Kitchen Appliances', msg: "Hi, I'd like to know about your kitchen appliance offers." },
]

export default function Hero() {
  const [index, setIndex] = useState(0)
  const step = (by) => setIndex((i) => (i + by + slides.length) % slides.length)

  // Autoplay; re-arming on every change means a manual click restarts the 5.5s wait.
  useEffect(() => {
    const timer = setTimeout(() => step(1), 5500)
    return () => clearTimeout(timer)
  }, [index])

  const slide = slides[index]
  return <section className="hero" aria-roledescription="carousel">
    <div className="hero-panel">
      <div className="hero-copy">
        <div className="hero-eyebrow">{slide.eyebrow}</div>
        <div className="hero-title">{slide.title}</div>
        <div className="hero-sub">{slide.sub}</div>
        <div className="hero-ctas">
          <a className="wa-pill hero-wa" href={whatsappLink(slide.msg)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={18} /><span>Chat on WhatsApp</span></a>
          <Link className="hero-browse" href={categoryHref(slide.category)}>Browse {slide.category} ›</Link>
        </div>
        <div className="dots">{slides.map((s, i) => <button key={s.title} className={i === index ? 'on' : ''} onClick={() => setIndex(i)} aria-label={`Go to slide ${i + 1}`} />)}</div>
      </div>
      <div className="hero-art">
        <div className="hero-orb"><ProductIcon category={slide.category} /><span>product image</span></div>
      </div>
    </div>
    <button className="hero-arrow prev" onClick={() => step(-1)} aria-label="Previous"><ChevronLeft size={22} /></button>
    <button className="hero-arrow next" onClick={() => step(1)} aria-label="Next"><ChevronRight size={22} /></button>
  </section>
}
