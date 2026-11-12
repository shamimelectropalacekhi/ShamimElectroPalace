'use client'
import { useEffect, useLayoutEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SlidersHorizontal, X } from 'lucide-react'
import { useStore } from '@/context/StoreContext'
import { countIn, emptyFilters, filterProducts, fromQuery, inBucket, PAGE, priceBuckets, sizeOrder, sortOptions, toQuery } from '@/lib/filterProducts'
import { generalEnquiry, whatsappLink } from '@/lib/whatsapp'
import WhatsAppIcon from '@/components/layout/WhatsAppIcon'
import ProductCard from './ProductCard'

const Check = ({ on }) => <span className={on ? 'check on' : 'check'}>{on && '✓'}</span>
const Radio = ({ on }) => <span className={on ? 'radio on' : 'radio'}><span /></span>
const uniq = (values) => [...new Set(values.filter(Boolean))]
const SCROLL_KEY = 'listing-scroll'
const Facet = ({ label, children }) => <div className="facet"><span className="facet-label">{label}</span>{children}</div>

// Back/forward is the only time the old scroll position should come back.
let poppedAt = 0
if (typeof window !== 'undefined') window.addEventListener('popstate', () => { poppedAt = Date.now() })

// Catalog page body. `products` is everything this page can show (a category, a brand, search results or the whole catalog);
// the filters, sort and "Show more" count live in the address (?brand=Orient&sort=low&n=48) so Back and shared links keep them.
// `initial` is the address as the server saw it (search page only); other pages read it in the browser.
export default function ProductListing({ title, crumb, products, category, brand, query = '', initial }) {
  const { store, categories } = useStore()
  const router = useRouter()
  const [state, setState] = useState(() => fromQuery(initial || {}))
  const [ready, setReady] = useState(Boolean(initial))
  const [filtersOpen, setFiltersOpen] = useState(false)
  const { f, sort, shown } = state

  // Pick the filters up from the address before the first paint, and put the page back where it was after Back.
  useLayoutEffect(() => {
    const here = location.pathname + location.search
    // oxlint-disable-next-line react/set-state-in-effect -- the address only exists in the browser
    setState(fromQuery(new URLSearchParams(location.search)))
    setReady(true)
    if (Date.now() - poppedAt > 3000) return
    try {
      const saved = JSON.parse(sessionStorage.getItem(SCROLL_KEY) || 'null')
      if (saved?.url === here) requestAnimationFrame(() => requestAnimationFrame(() => window.scrollTo(0, saved.y)))
    } catch { /* private mode: no saved position */ }
  }, [])

  // Keep the address in step with the filters (replace, so Back leaves the list instead of undoing one filter).
  useEffect(() => {
    if (!ready) return
    const qs = toQuery(state, { q: query })
    const url = location.pathname + (qs ? `?${qs}` : '')
    if (url !== location.pathname + location.search) window.history.replaceState(null, '', url)
  }, [state, ready, query])

  // The filter sheet covers the screen on phones; stop the page behind it from scrolling.
  useEffect(() => {
    document.body.classList.toggle('sheet-open', filtersOpen)
    return () => document.body.classList.remove('sheet-open')
  }, [filtersOpen])

  const rememberScroll = (event) => {
    if (!event.target.closest('a[href^="/product/"]')) return
    try { sessionStorage.setItem(SCROLL_KEY, JSON.stringify({ url: location.pathname + location.search, y: window.scrollY })) } catch { /* ignore */ }
  }

  const base = products
  const buckets = priceBuckets(base)
  const all = filterProducts(base, f, buckets, sort)
  const visible = all.slice(0, shown)
  const setF = (next) => setState({ f: { ...f, ...next }, sort, shown: PAGE })
  // Changing category drops the type, size and inverter picks: they belonged to the old category.
  const toggle = (key, value) => setF({
    [key]: f[key].includes(value) ? f[key].filter((x) => x !== value) : [...f[key], value],
    ...(key === 'cats' && { types: [], sizes: [], inv: null }),
  })
  const clear = () => setState({ f: emptyFilters(), sort, shown: PAGE })

  // One category in view (the page's own, or the only one ticked) unlocks its size and inverter filters.
  const cats = uniq(base.map((p) => p.category))
  const oneCat = category || (f.cats.length === 1 ? f.cats[0] : cats.length === 1 ? cats[0] : null)
  const info = categories.find((c) => c.name === oneCat)
  const inCat = oneCat ? base.filter((p) => p.category === oneCat) : []

  const count = (skip, test) => countIn(base, f, buckets, skip, test)
  // Options that would give nothing are hidden, unless already ticked.
  const options = (values, skip, key, field) => values
    .map((value) => ({ value, n: count(skip, (p) => p[key] === value), on: f[field].includes(value) }))
    .filter((option) => option.n || option.on)

  const catOptions = category ? [] : options(cats.sort(), 'cat', 'category', 'cats')
  const brandOptions = brand ? [] : options(uniq(base.map((p) => p.brand)).sort(), 'brand', 'brand', 'brands')
  const typeOptions = options(uniq(inCat.map((p) => p.type)).sort(), 'type', 'type', 'types')
  const sizeOptions = options(uniq(inCat.map((p) => p.size)).sort((a, b) => sizeOrder(a) - sizeOrder(b)), 'size', 'size', 'sizes')
  const priceOptions = buckets.map((bucket, i) => ({ i, label: bucket[2], n: count('price', (p) => inBucket(p, bucket)), on: f.price === i })).filter((option) => option.n || option.on)
  const techOptions = [[null, 'All'], ['inv', 'Inverter'], ['non', 'Non-Inverter']].map(([value, label]) => ({ value, label, n: count('inv', (p) => value == null || Boolean(p.inv) === (value === 'inv')) }))
  const showInv = oneCat && info?.inverterFilter && techOptions[1].n > 0 && techOptions[2].n > 0
  const sorts = sortOptions.filter((option) => option.value !== 'off' || base.some((p) => p.discountedPrice && p.discountedPrice < p.price))

  const active = f.cats.length + f.brands.length + f.types.length + f.sizes.length + (f.price != null) + (f.inv != null)
  const heading = title || (query ? `Results for “${query}”` : 'All Products')
  const plural = (n) => `${n} product${n === 1 ? '' : 's'}`

  const checks = (list, field) => list.map(({ value, n, on }) => <button key={value} className="facet-opt" onClick={() => toggle(field, value)} aria-pressed={on}>
    <Check on={on} /><span>{value}</span><small>{n}</small>
  </button>)

  return <main className="page listing">
    <div className="crumbs"><Link href="/">Home</Link><span>›</span><span>{crumb || heading}</span></div>
    <div className="listing-head">
      <div><h1>{heading}</h1><span>{plural(all.length)}</span></div>
      <div className="listing-tools">
        <button className="filter-toggle" onClick={() => setFiltersOpen(true)}><SlidersHorizontal size={16} />{active ? `Filters (${active})` : 'Filters'}</button>
        <select value={sort} onChange={(event) => setState({ f, sort: event.target.value, shown: PAGE })} aria-label="Sort products">{sorts.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}</select>
      </div>
    </div>
    <div className="listing-body">
      <aside className={filtersOpen ? 'filters open' : 'filters'} aria-label="Filters">
        <div className="filters-head">
          <b>Filters</b>
          {active > 0 && <button onClick={clear}>Clear all</button>}
          <button className="filters-close" onClick={() => setFiltersOpen(false)} aria-label="Close filters"><X size={20} /></button>
        </div>
        <div className="filters-body">
          {catOptions.length > 1 && <Facet label="Category">{checks(catOptions, 'cats')}</Facet>}
          {brandOptions.length > 1 && <Facet label="Brand">{checks(brandOptions, 'brands')}</Facet>}
          {typeOptions.length > 1 && <Facet label="Type">{checks(typeOptions, 'types')}</Facet>}
          {priceOptions.length > 1 && <Facet label="Price Range">
            {priceOptions.map(({ i, label, n, on }) => <button key={label} className="facet-opt" onClick={() => setF({ price: on ? null : i })} aria-pressed={on}>
              <Radio on={on} /><span>{label}</span><small>{n}</small>
            </button>)}
          </Facet>}
          {sizeOptions.length > 1 && <Facet label={info?.capacityLabel || 'Size'}>
            <div className="pills">{sizeOptions.map(({ value, on }) => <button key={value} className={on ? 'pill on' : 'pill'} onClick={() => toggle('sizes', value)} aria-pressed={on}>{value}</button>)}</div>
          </Facet>}
          {showInv && <Facet label="Technology">
            {techOptions.map(({ value, label, n }) => <button key={label} className="facet-opt" onClick={() => setF({ inv: value })} aria-pressed={f.inv === value}>
              <Radio on={f.inv === value} /><span>{label}</span><small>{n}</small>
            </button>)}
          </Facet>}
        </div>
        <div className="filters-foot"><button className="wa-btn" onClick={() => setFiltersOpen(false)}>Show {plural(all.length)}</button></div>
      </aside>
      <div className="listing-results" onClickCapture={rememberScroll}>
        {all.length
          ? <>
            <div className="grid">{visible.map((product) => <ProductCard key={product.id} product={product} />)}</div>
            {all.length > visible.length && <div className="more">
              <span>Showing {visible.length} of {all.length}</span>
              <button className="outline-btn" onClick={() => setState({ f, sort, shown: shown + PAGE })}>Show more</button>
            </div>}
          </>
          : <div className="no-results">
            <b>{query && !active ? `Nothing found for “${query}”` : 'No products match these filters'}</b>
            <span>Not everything is listed online — message us and we&apos;ll check stock at the store.</span>
            <div>
              {query && !active
                ? <button className="outline-btn" onClick={() => router.push('/products')}>Browse all products</button>
                : <button className="outline-btn" onClick={clear}>Clear filters</button>}
              <a className="wa-btn" href={whatsappLink(store.whatsapp, generalEnquiry(store))} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={17} />Ask on WhatsApp</a>
            </div>
          </div>}
      </div>
    </div>
  </main>
}
