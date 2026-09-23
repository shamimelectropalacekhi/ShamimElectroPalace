export const generalEnquiry = (store) => `Hi ${store.name}, I'd like to ask about a product.`
export const productEnquiry = (product) => `Hi, I'm interested in ${product.name}${product.model ? ` (${product.model})` : ''}. Is it available?`
export const whatsappLink = (number, text) => `https://wa.me/${number}?text=${encodeURIComponent(text)}`
