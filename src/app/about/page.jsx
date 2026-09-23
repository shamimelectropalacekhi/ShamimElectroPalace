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
      <p className="about-lead">For more than a decade, we have helped families in Rawalpindi and Islamabad choose reliable appliances with honest advice and dependable after-sales support.</p>
      <div className="contact-list">
        <p><Store size={18} /><b>Showroom</b> {store.address} · {store.hours}</p>
        <p><Headphones size={18} /><b>Phone</b> {store.phone} · {store.email}</p>
        <p><Zap size={18} /><b>WhatsApp</b> {store.whatsappDisplay}</p>
      </div>
    </div>
    <div className="map-placeholder"><div className="map-pin"><Store size={23} /></div><span>Map embed placeholder</span><small>Showroom location will be connected here.</small></div>
  </main>
}
