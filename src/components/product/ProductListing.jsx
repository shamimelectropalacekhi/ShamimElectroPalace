'use client'
import { useState } from 'react'
import { useStore } from '@/context/StoreContext'
import { filterProducts } from '@/lib/filterProducts'
import ProductFilters from './ProductFilters'
import ProductGrid from './ProductGrid'

// Catalog page body. `category` narrows the list, `query` carries the header search (?q=).
// Both arrive as props so the page still renders on the server, which is what Google reads.
export default function ProductListing({ title, category, query = '' }) {
  const { products } = useStore()
  const [filters, setFilters] = useState({ brand: '', priceRange: '', sort: 'newest' })
  const shown = filterProducts(products, { category, query, ...filters })

  return <main className="listing-page">
    <div className="listing-head">
      <div>
        <p className="eyebrow">SHAMIM ELECTRO PALACE CATALOG</p>
        <h1>{query ? `Results for "${query}"` : title}</h1>
        <p>{shown.length} products available</p>
      </div>
      <ProductFilters filters={filters} onChange={setFilters} />
    </div>
    <ProductGrid products={shown} />
    {!shown.length && <div className="empty-state">No matching appliances found. Try another filter.</div>}
  </main>
}
