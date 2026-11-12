'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight, Phone, Search } from 'lucide-react'
import { useStore } from '@/context/StoreContext'
import { categoryHref } from '@/lib/format'
import { generalEnquiry, whatsappLink } from '@/lib/whatsapp'
import WhatsAppIcon from './WhatsAppIcon'

export default function Header() {
  const [search, setSearch] = useState('')
  const [edges, setEdges] = useState({ start: true, end: true })
  const nav = useRef(null)
  const router = useRouter()
  const pathname = usePathname()
  const { store, categories, page } = useStore()

  // Highlight the category pill on its listing page and on its products' pages.
  const active = pathname === '/' ? 'Home' : page.category || decodeURIComponent(pathname.split('/category/')[1] || '')

  // The menu scrolls sideways when it doesn't fit; arrows and a fade show there is more.
  const measure = () => {
    const el = nav.current
    if (el) setEdges({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 4 })
  }
  useEffect(() => {
    const el = nav.current
    const pill = el?.querySelector('.active')
    if (pill) el.scrollLeft = pill.offsetLeft - (el.clientWidth - pill.offsetWidth) / 2 // keep the current category in view
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [active])
  const slide = (by) => nav.current.scrollBy({ left: by * nav.current.clientWidth * 0.7, behavior: 'smooth' })

  const onSubmit = (event) => {
    event.preventDefault()
    const q = search.trim()
    router.push(q ? `/products?q=${encodeURIComponent(q)}` : '/products')
  }

  return <header className="site-header">
    <div className="header-row">
      <Link href="/" className="brand">
        <img src={store.logo} alt={store.name} width="56" height="56" />
        <span><b>Shamim <em>Electro</em> Palace</b><small>Electronics &amp; Home Appliances</small></span>
      </Link>
      <form className="header-search" onSubmit={onSubmit} role="search">
        <Search size={18} aria-hidden="true" />
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search ACs, fridges, washing machines…" aria-label="Search products" enterKeyHint="search" />
        <button type="submit">Search</button>
      </form>
      <div className="header-actions">
        <a className="call-link" href={store.phoneHref} aria-label={`Call ${store.phone}`}>
          <span className="call-icon"><Phone size={18} /></span>
          <span className="call-text"><small>Call us</small><b>{store.phone}</b></span>
        </a>
        <a className="wa-pill" href={whatsappLink(store.whatsapp, generalEnquiry(store))} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"><WhatsAppIcon size={18} /><span>WhatsApp</span></a>
      </div>
    </div>
    <div className={`cat-nav-wrap${edges.start ? '' : ' more-start'}${edges.end ? '' : ' more-end'}`}>
      <button className="nav-arrow prev" onClick={() => slide(-1)} aria-label="Scroll categories back" tabIndex={-1}><ChevronLeft size={18} /></button>
      <nav className="cat-nav" ref={nav} onScroll={measure} aria-label="Categories">
        {['Home', ...categories.map((c) => c.name)].map((label) => <Link key={label} href={label === 'Home' ? '/' : categoryHref(label)} className={label === active ? 'active' : ''} aria-current={label === active ? 'page' : undefined}>{label}</Link>)}
      </nav>
      <button className="nav-arrow next" onClick={() => slide(1)} aria-label="Scroll categories forward" tabIndex={-1}><ChevronRight size={18} /></button>
    </div>
  </header>
}
