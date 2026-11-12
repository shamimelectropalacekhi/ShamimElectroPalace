import { Headphones, Star, Store, Zap } from 'lucide-react'
import { getShell } from '@/lib/sanity'

export async function generateMetadata() {
  const { store } = await getShell()
  return { title: 'About & contact', description: `Visit ${store.name} at ${store.address}, or reach us by phone and WhatsApp.` }
}

export default async function AboutPage() {
  const { store } = await getShell()
  return <main className="about-page">
    <div>
      <p className="eyebrow">THE SHAMIM ELECTRO PALACE STORY</p>
      <h1>Appliances for the way you live.</h1>
      <p className="about-lead">{store.aboutText}</p>
      <div className="contact-list">
        <p><Store size={18} /><span><b>Showroom</b> {store.address}<span className="hours">{store.hours.split('\n').map((line) => <span key={line}>{line}</span>)}</span></span></p>
        <p><Headphones size={18} /><span><b>Phone</b> <a href={store.phoneHref}>{store.phone}</a> · <a href={`mailto:${store.email}`}>{store.email}</a></span></p>
        <p><Zap size={18} /><span><b>WhatsApp</b> <a href={`https://wa.me/${store.whatsapp}`} target="_blank" rel="noopener noreferrer">{store.whatsappDisplay}</a></span></p>
        <p><Star size={18} /><span><b>Reviews</b> <a href={store.mapsLink} target="_blank" rel="noopener noreferrer">See our reviews and directions on Google Maps ›</a></span></p>
      </div>
    </div>
    <iframe className="about-map" title={`${store.name} on Google Maps`} loading="lazy" src={`https://www.google.com/maps?q=${encodeURIComponent(`${store.name}, ${store.address}`)}&output=embed`} />
  </main>
}
