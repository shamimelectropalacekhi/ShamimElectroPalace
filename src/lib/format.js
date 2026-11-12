export const money = (value) => `Rs. ${Number(value).toLocaleString('en-PK')}`
export const priceOf = (product) => product.discountedPrice || product.price
export const offOf = (product) => `${Math.round((1 - priceOf(product) / product.price) * 100)}%`
export const categoryHref = (category) => `/category/${encodeURIComponent(category)}`
export const brandHref = (brand) => `/brand/${encodeURIComponent(brand)}`
export const productHref = (product) => `/product/${product.slug}`
