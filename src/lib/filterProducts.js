export const priceRanges = [
  { label: 'Under Rs. 50,000', test: (price) => price < 50000 },
  { label: 'Rs. 50,000-150,000', test: (price) => price >= 50000 && price <= 150000 },
  { label: 'Over Rs. 150,000', test: (price) => price > 150000 },
]

export const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
]

export function filterProducts(products, { category, query = '', brand = '', priceRange = '', sort = 'newest' }) {
  const range = priceRanges.find((item) => item.label === priceRange)
  const result = products.filter((product) =>
    (!category || product.category === category) &&
    (!brand || product.brand === brand) &&
    (!range || range.test(product.discountedPrice)) &&
    `${product.name} ${product.brand} ${product.category}`.toLowerCase().includes(query.toLowerCase()))
  if (sort === 'price-asc') result.sort((a, b) => a.discountedPrice - b.discountedPrice)
  if (sort === 'price-desc') result.sort((a, b) => b.discountedPrice - a.discountedPrice)
  return result
}
