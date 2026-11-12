import { Headphones, Store, Zap } from 'lucide-react'
import { getCatalog } from '@/lib/sanity'

export async function generateMetadata() {
  const { store } = await getCatalog()
  return { title: 'About & contact', description: `Visit ${store.name} on ${store.address}, or reach us by phone and WhatsApp.` }
}

export default async function AboutPage() {
  const { store } = await getCatalog()
  return <main className="about-page">
    <div>
      <p className="eyebrow">THE SHAMIM ELECTRO PALACE STORY</p>
      <h1>Appliances for the way you live.</h1>
      <p className="about-lead">We deal in home electronics and are proud dealers of Haier, Dawlance, PEL, Gree, GNE and many more brands. We help families in {store.city} choose reliable appliances with honest advice and dependable after-sales support.</p>
      <div className="contact-list">
        <p><Store size={18} /><b>Showroom</b> {store.address} · {store.hours.replace(/\n/g, ', ')}</p>
        <p><Headphones size={18} /><b>Phone</b> {store.phone} · {store.email}</p>
        <p><Zap size={18} /><b>WhatsApp</b> {store.whatsappDisplay}</p>
      </div>
    </div>
    <iframe className="about-map" title={`${store.name} on Google Maps`} loading="lazy" src={`https://www.google.com/maps?q=${encodeURIComponent(`${store.name}, ${store.address}`)}&output=embed`} />
  </main>
}
