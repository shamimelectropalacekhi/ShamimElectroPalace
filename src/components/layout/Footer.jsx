import Link from 'next/link'
import { MapPin, Phone } from 'lucide-react'
import { getCatalog } from '@/lib/sanity'
import { categoryHref } from '@/lib/format'
import { generalEnquiry, whatsappLink } from '@/lib/whatsapp'
import WhatsAppIcon from './WhatsAppIcon'

export default async function Footer() {
  const { store, categories } = await getCatalog()
  return <footer className="site-footer" id="contact">
    <div className="footer-grid">
      <div className="footer-col">
        <div className="footer-brand"><img src={store.logo} alt="" width="56" height="56" /><span>Shamim Electro<br />Palace</span></div>
        {store.footerText && <p>{store.footerText}</p>}
        <div className="footer-hours"><b>Store Timings</b>{store.hours.split('\n').map((line) => <span key={line}>{line}</span>)}</div>
        {store.socials.length > 0 && <div className="socials">{store.socials.map(({ label, key, url }) => <a key={key} href={url} target="_blank" rel="noopener noreferrer" aria-label={label}><img src={`https://cdn.simpleicons.org/${key}/white`} alt="" width="17" height="17" /></a>)}</div>}
      </div>
      <div className="footer-col">
        <span className="footer-title">Contact Us</span>
        <a className="footer-contact" href={whatsappLink(store.whatsapp, generalEnquiry(store))} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={18} /><span><small>WhatsApp</small><b>{store.whatsappDisplay}</b></span></a>
        <a className="footer-contact" href={store.phoneHref}><Phone size={18} /><span><small>Call Us</small><b>{store.phone}</b></span></a>
        <div className="footer-contact"><MapPin size={18} /><span><small>Visit Us</small><b>{store.address}</b><a className="maps-link" href={store.mapsLink} target="_blank" rel="noopener noreferrer">Open in Google Maps ›</a></span></div>
      </div>
      <div className="footer-col">
        <span className="footer-title">Categories</span>
        {categories.map((c) => <Link key={c.name} className="footer-cat" href={categoryHref(c.name)}><b>{c.name}</b>{c.subs && <small>{c.subs}</small>}</Link>)}
      </div>
      <div className="footer-col footer-links">
        <span className="footer-title">Quick Links</span>
        <Link href="/about">• About Us</Link>
        <Link href="/about">• Contact</Link>
        <Link href="/products">• All Products</Link>
      </div>
    </div>
    <div className="footer-bottom"><span>&copy; {new Date().getFullYear()} {store.name}. All rights reserved.</span><span>Prices may change without notice — confirm on WhatsApp.</span></div>
  </footer>
}
