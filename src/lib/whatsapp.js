import { store } from '@/data/store'

export const whatsappLink = (text) => `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(text)}`
