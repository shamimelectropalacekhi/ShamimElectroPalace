import { store } from '@/data/store'
import { whatsappLink } from '@/lib/whatsapp'
import WhatsAppIcon from './WhatsAppIcon'

export default function WhatsAppButton() {
  return <a className="whatsapp" href={whatsappLink(`Hello ${store.name}, I have a question.`)} target="_blank" rel="noreferrer" aria-label={`Chat with ${store.name} on WhatsApp`}>
    <WhatsAppIcon size={21} /><span>Chat with us</span>
  </a>
}
