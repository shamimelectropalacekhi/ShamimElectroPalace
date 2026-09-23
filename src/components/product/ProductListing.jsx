'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SlidersHorizontal } from 'lucide-react'
import { useStore } from '@/context/StoreContext'
import { baseProducts, countIn, emptyFilters, filterProducts, inBucket, priceBuckets, sortOptions } from '@/lib/filterProducts'
import { generalEnquiry, whatsappLink } from '@/lib/whatsapp'
import WhatsAppIcon from '@/components/layout/WhatsAppIcon'
import ProductCard from './ProductCard'

const Check = ({ on }) => <span className={on ? 'check on' : 'check'}>{on && '✓'}</span>
const Radio = ({ on }) => <span className={on ? 'radio on' : 'radio'}><span /></span>

// Catalog page body. `category` narrows the list; `query` and `brand` come from the URL (?q=, ?brand=).
export default function ProductListing({ title, category, query = '', brand }) {
  const { products } = useStore()
  const router = useRouter()
  const [f, setF] = useState(() => ({ ...emptyFilters(), brands: brand ? [brand] : [] }))
  const [sort, setSort] = useState('pop')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const buckets = priceBuckets(category)
  const base = baseProducts(products, { category, query })
  const shown = filterProducts(base, f, buckets, sort)
  const patch = (next) => setF({ ...f, ...next })
  const toggle = (key, value) => patch({ [key]: f[key].includes(value) ? f[key].filter((x) => x !== value) : [...f[key], value] })
  const clear = () => { setF(emptyFilters()); if (query || brand) router.push('/products') }

  const brandNames = [...new Set(base.map((p) => p.brand))].sort()
  const caps = [...new Set(base.map((p) => p.cap).filter(Boolean))].sort((a, b) => parseFloat(a) - parseFloat(b))
  const showCaps = category && caps.length > 1
  const showInv = category && category !== 'Small Kitchen Appliances'
  const active = f.brands.length + f.caps.length + (f.price != null) + (f.inv != null)
  const heading = category ? title : query ? `Results for “${query}”` : 'All Products'

  return <main className="page listing">
    <div className="crumbs"><Link href="/">Home</Link><span>›</span><span>{heading}</span></div>
    <div className="listing-head">
      <div><h1>{heading}</h1><span>{shown.length} product{shown.length === 1 ? '' : 's'}</span></div>
      <div className="listing-tools">
        <button className="filter-toggle" onClick={() => setFiltersOpen(!filtersOpen)}><SlidersHorizontal size={16} />{filtersOpen ? 'Hide filters' : active ? `Filters (${active})` : 'Filters'}</button>
        <select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort products">{sortOptions.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}</select>
      </div>
    </div>
    <div className="listing-body">
      <aside className={filtersOpen ? 'filters open' : 'filters'}>
        <div className="filters-head"><b>Filters</b><button onClick={clear}>Clear all</button></div>
        <div className="facet">
          <span className="facet-label">Brand</span>
          {brandNames.map((name) => <button key={name} className="facet-opt" onClick={() => toggle('brands', name)}>
            <Check on={f.brands.includes(name)} /><span>{name}</span><small>{countIn(base, f, buckets, 'brand', (p) => p.brand === name)}</small>
          </button>)}
        </div>
        <div className="facet">
          <span className="facet-label">Price Range</span>
          {buckets.map((bucket, i) => <button key={bucket[2]} className="facet-opt" onClick={() => patch({ price: f.price === i ? null : i })}>
            <Radio on={f.price === i} /><span>{bucket[2]}</span><small>{countIn(base, f, buckets, 'price', (p) => inBucket(p, bucket))}</small>
          </button>)}
        </div>
        {showCaps && <div className="facet">
          <span className="facet-label">{category === 'Air Conditioners' ? 'Tonnage' : 'Capacity'}</span>
          <div className="pills">{caps.map((cap) => <button key={cap} className={f.caps.includes(cap) ? 'pill on' : 'pill'} onClick={() => toggle('caps', cap)}>{cap}</button>)}</div>
        </div>}
        {showInv && <div className="facet">
          <span className="facet-label">Technology</span>
          {[[null, 'All'], ['inv', 'Inverter'], ['non', 'Non-Inverter']].map(([value, label]) => <button key={label} className="facet-opt" onClick={() => patch({ inv: value })}>
            <Radio on={f.inv === value} /><span>{label}</span><small>{countIn(base, f, buckets, 'inv', (p) => value == null || Boolean(p.inv) === (value === 'inv'))}</small>
          </button>)}
        </div>}
      </aside>
      <div className="listing-results">
        {shown.length
          ? <div className="grid">{shown.map((product) => <ProductCard key={product.id} product={product} />)}</div>
          : <div className="no-results">
            <b>No products match these filters</b>
            <span>Not everything is listed online — message us and we&apos;ll check stock at the store.</span>
            <div>
              <button className="outline-btn" onClick={clear}>Clear filters</button>
              <a className="wa-btn" href={whatsappLink(generalEnquiry)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={17} />Ask on WhatsApp</a>
            </div>
          </div>}
      </div>
    </div>
  </main>
}
