import { getCatalog } from '@/lib/sanity'
import { generalEnquiry, whatsappLink } from '@/lib/whatsapp'
import WhatsAppIcon from './WhatsAppIcon'

export default async function WhatsAppButton() {
  const { store } = await getCatalog()
  return <a className="wa-float" href={whatsappLink(store.whatsapp, generalEnquiry(store))} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
    <WhatsAppIcon size={32} />
  </a>
}
