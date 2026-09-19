export const money = (value) => `Rs. ${Number(value).toLocaleString('en-PK')}`
export const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-')
export const priceOf = (product) => product.discountedPrice || product.price
