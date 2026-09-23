import { generalEnquiry, whatsappLink } from '@/lib/whatsapp'
import WhatsAppIcon from './WhatsAppIcon'

export default function WhatsAppButton() {
  return <a className="wa-float" href={whatsappLink(generalEnquiry)} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
    <WhatsAppIcon size={32} />
  </a>
}
