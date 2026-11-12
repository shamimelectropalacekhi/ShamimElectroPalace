'use client'
import { useStore } from '@/context/StoreContext'
import { generalEnquiry, whatsappLink } from '@/lib/whatsapp'
import WhatsAppIcon from './WhatsAppIcon'

// Floating button. On a product page it asks about that product.
export default function WhatsAppButton() {
  const { store, page } = useStore()
  return <a className="wa-float" href={whatsappLink(store.whatsapp, page.waText || generalEnquiry(store))} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
    <WhatsAppIcon size={30} />
  </a>
}
