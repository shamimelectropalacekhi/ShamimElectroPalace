'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, Phone, Search, X } from 'lucide-react'
import { store } from '@/data/store'
import Brand from './Brand'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Shop' },
  { href: '/about', label: 'About & contact' },
  { href: '/admin', label: 'Admin' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [search, setSearch] = useState('')
  const router = useRouter()
  const pathname = usePathname()

  // Search submits rather than firing per keystroke, so the results page stays server-rendered.
  const onSubmit = (event) => {
    event.preventDefault()
    router.push(search ? `/products?q=${encodeURIComponent(search)}` : '/products')
  }

  return <header className="topbar">
    <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
    <Brand />
    <form className="search-box" onSubmit={onSubmit} role="search">
      <button type="submit" aria-label="Search"><Search size={17} /></button>
      <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products or brands" aria-label="Search products or brands" />
    </form>
    <nav className={menuOpen ? 'main-nav open' : 'main-nav'} onClick={() => setMenuOpen(false)}>
      {navLinks.map(({ href, label }) => <Link key={href} href={href} className={pathname === href ? 'active' : ''}>{label}</Link>)}
    </nav>
    <div className="header-actions"><a className="call-link" href={store.phoneHref}><Phone size={16} /> <span>{store.phone}</span></a></div>
  </header>
}
