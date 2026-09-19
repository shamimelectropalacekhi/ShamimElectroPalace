import { store } from '@/data/store'
import Brand from './Brand'

export default function Footer() {
  return <footer id="contact">
    <div className="footer-main">
      <div><Brand className="footer-brand" /><p className="footer-copy">Making everyday living a little more effortless since 2014.</p></div>
      <div><p className="footer-label">Visit our showroom</p><p>{store.address}<br />{store.hours}</p></div>
      <div>
        <p className="footer-label">Talk to us</p>
        <a href={store.phoneHref}>{store.phone}</a>
        <a href={`mailto:${store.email}`}>{store.email}</a>
        <a href={`https://wa.me/${store.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp {store.whatsappDisplay}</a>
      </div>
    </div>
    <div className="footer-bottom"><span>&copy; 2024 {store.name}. All rights reserved.</span><span>Visit the showroom or order over WhatsApp</span></div>
  </footer>
}
