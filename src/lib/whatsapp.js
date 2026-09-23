import { store } from '@/data/store'

export const generalEnquiry = `Hi ${store.name}, I'd like to ask about a product.`
export const productEnquiry = (product) => `Hi, I'm interested in ${product.name}${product.model ? ` (${product.model})` : ''}. Is it available?`
export const whatsappLink = (text) => `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(text)}`
