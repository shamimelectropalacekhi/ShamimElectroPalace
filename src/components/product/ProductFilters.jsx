import { brands } from '@/data/products'
import { priceRanges, sortOptions } from '@/lib/filterProducts'

export default function ProductFilters({ filters, onChange }) {
  const set = (key) => (event) => onChange({ ...filters, [key]: event.target.value })
  return <div className="filter-bar">
    <select value={filters.brand} onChange={set('brand')}><option value="">All brands</option>{brands.map((brand) => <option key={brand}>{brand}</option>)}</select>
    <select value={filters.priceRange} onChange={set('priceRange')}><option value="">All prices</option>{priceRanges.map(({ label }) => <option key={label}>{label}</option>)}</select>
    <select value={filters.sort} onChange={set('sort')}>{sortOptions.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}</select>
  </div>
}
