import { money, priceOf, productHref } from './format'

export const generalEnquiry = (store) => `Hi ${store.name}, I'd like to ask about a product.`
// Names the product, its listed price and its page, so staff see exactly what the customer saw.
export const productEnquiry = (product, store) =>
  `Hi, I'm interested in ${product.name.trim()}${product.model ? ` (${product.model})` : ''}, listed at ${money(priceOf(product))}. Is it available?` +
  (store?.siteUrl ? `\n${store.siteUrl}${productHref(product)}` : '')
export const whatsappLink = (number, text) => `https://wa.me/${number}?text=${encodeURIComponent(text)}`
// No number: WhatsApp asks the customer who to send it to.
export const shareLink = (product, store) => `https://wa.me/?text=${encodeURIComponent(`${product.name.trim()} - ${money(priceOf(product))}\n${store.siteUrl}${productHref(product)}`)}`
