'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Phone, Search } from 'lucide-react'
import { useStore } from '@/context/StoreContext'
import { categoryHref } from '@/lib/format'
import { generalEnquiry, whatsappLink } from '@/lib/whatsapp'
import WhatsAppIcon from './WhatsAppIcon'

export default function Header() {
  const [search, setSearch] = useState('')
  const router = useRouter()
  const pathname = usePathname()
  const { store, categories, products } = useStore()

  // Highlight the category pill on its listing page and on its products' pages.
  const slug = pathname.startsWith('/product/') && decodeURIComponent(pathname.slice(9))
  const active = pathname === '/' ? 'Home' : slug ? products.find((p) => p.slug === slug)?.category : decodeURIComponent(pathname.split('/category/')[1] || '')

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
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search ACs, refrigerators, washing machines…" aria-label="Search products" />
        <button type="submit">Search</button>
      </form>
      <div className="header-actions">
        <a className="call-link" href={store.phoneHref} aria-label={`Call ${store.phone}`}>
          <span className="call-icon"><Phone size={18} /></span>
          <span className="call-text"><small>Call us</small><b>{store.phone}</b></span>
        </a>
        <a className="wa-pill" href={whatsappLink(store.whatsapp, generalEnquiry(store))} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={18} /><span>WhatsApp</span></a>
      </div>
    </div>
    <nav className="cat-nav">
      {['Home', ...categories.map((c) => c.name)].map((label) => <Link key={label} href={label === 'Home' ? '/' : categoryHref(label)} className={label === active ? 'active' : ''}>{label}</Link>)}
    </nav>
  </header>
}
