import { getShell } from '@/lib/sanity'
import { generalEnquiry, whatsappLink } from '@/lib/whatsapp'
import WhatsAppIcon from '@/components/layout/WhatsAppIcon'

export const metadata = { title: 'Delivery, warranty & installments', description: 'How delivery, installation, warranty and installment plans work at our store.' }

// Shown until the shop writes its own answers in Store settings -> Help page. Kept general on purpose:
// they promise nothing specific (areas, charges, banks), only that the shop will answer on WhatsApp.
const fallback = (store) => [
  { title: 'Delivery', text: `We deliver in ${store.city}. Send us your area on WhatsApp and we will confirm the delivery time and any charge before you order.` },
  { title: 'Installation', text: 'Air conditioners and other large appliances can be installed for you. Ask us what is included for the product you are buying.' },
  { title: 'Warranty', text: 'Products come with the manufacturer’s warranty. The length and what it covers differ by brand and model, so ask us about the product you are interested in.' },
  { title: 'Installments', text: 'Installment plans may be available on some products. Message us with the product and we will tell you the current options.' },
  { title: 'Prices', text: 'Prices on this website can change without notice. Please confirm today’s price on WhatsApp or by phone before visiting.' },
]

export default async function HelpPage() {
  const { store } = await getShell()
  const sections = store.help.length ? store.help : fallback(store)
  return <main className="listing-page help-page">
    <p className="eyebrow">GOOD TO KNOW</p>
    <h1 className="notfound-title">Delivery, warranty &amp; installments</h1>
    <div className="help-list">
      {sections.map(({ title, text }) => <section key={title}><h2>{title}</h2>{text.split('\n').filter(Boolean).map((line) => <p key={line}>{line}</p>)}</section>)}
    </div>
    <a className="wa-btn help-wa" href={whatsappLink(store.whatsapp, generalEnquiry(store))} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={20} /><span>Ask us on WhatsApp</span></a>
  </main>
}
