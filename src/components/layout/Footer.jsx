import Link from 'next/link'
import { MapPin, Phone } from 'lucide-react'
import { store } from '@/data/store'
import { categories, categoryInfo } from '@/data/products'
import { categoryHref } from '@/lib/format'
import { generalEnquiry, whatsappLink } from '@/lib/whatsapp'
import WhatsAppIcon from './WhatsAppIcon'

// ponytail: social links point nowhere until the store's pages exist; fill in the hrefs then.
const socials = [['Facebook', 'facebook'], ['Instagram', 'instagram'], ['TikTok', 'tiktok'], ['YouTube', 'youtube']]

export default function Footer() {
  return <footer className="site-footer" id="contact">
    <div className="footer-grid">
      <div className="footer-col">
        <div className="footer-brand"><img src={store.logo} alt="" width="56" height="56" /><span>Shamim Electro<br />Palace</span></div>
        <p>Authorized dealer for ACs, refrigerators, washing machines and kitchen appliances since 2014.</p>
        <div className="footer-hours"><b>Store Timings</b><span>{store.hours}</span></div>
        <div className="socials">{socials.map(([label, slug]) => <a key={slug} href="#" aria-label={label}><img src={`https://cdn.simpleicons.org/${slug}/white`} alt="" width="17" height="17" /></a>)}</div>
      </div>
      <div className="footer-col">
        <span className="footer-title">Contact Us</span>
        <a className="footer-contact" href={whatsappLink(generalEnquiry)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={18} /><span><small>WhatsApp</small><b>{store.whatsappDisplay}</b></span></a>
        <a className="footer-contact" href={store.phoneHref}><Phone size={18} /><span><small>Call Us</small><b>{store.phone}</b></span></a>
        <div className="footer-contact"><MapPin size={18} /><span><small>Visit Us</small><b>{store.address}</b><a className="maps-link" href={`https://maps.google.com/?q=${encodeURIComponent(`${store.name} ${store.address}`)}`} target="_blank" rel="noopener noreferrer">Open in Google Maps ›</a></span></div>
      </div>
      <div className="footer-col">
        <span className="footer-title">Categories</span>
        {categories.map((category) => <Link key={category} className="footer-cat" href={categoryHref(category)}><b>{category}</b><small>{categoryInfo[category].subs}</small></Link>)}
      </div>
      <div className="footer-col footer-links">
        <span className="footer-title">Quick Links</span>
        <Link href="/about">• About Us</Link>
        <Link href="/about">• Contact</Link>
        <Link href="/products">• All Products</Link>
        <Link href="/admin">• Admin</Link>
      </div>
    </div>
    <div className="footer-bottom"><span>&copy; {new Date().getFullYear()} {store.name}. All rights reserved.</span><span>Prices may change without notice — confirm on WhatsApp.</span></div>
  </footer>
}
