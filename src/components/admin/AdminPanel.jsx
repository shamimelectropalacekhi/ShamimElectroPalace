'use client'
import { useState } from 'react'
import { BarChart3, LayoutDashboard, Package, PackageX, Plus, Settings, Upload } from 'lucide-react'
import { useStore } from '@/context/StoreContext'
import { slugify } from '@/lib/format'
import Stat from './Stat'
import ProductForm from './ProductForm'
import ProductsTable from './ProductsTable'
import BulkImport from './BulkImport'
import SettingsPanel from './SettingsPanel'

const sections = [
  ['dashboard', BarChart3, 'Dashboard'],
  ['products', Package, 'Products'],
  ['import', Upload, 'Bulk import'],
  ['settings', Settings, 'Categories & brands'],
]

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80'

const Heading = ({ eyebrow, title, children }) => <div className="admin-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1></div>{children}</div>

export default function AdminPanel() {
  const { products, setProducts } = useStore()
  const [section, setSection] = useState('dashboard')
  const [editing, setEditing] = useState(null)

  const outOfStock = products.filter((product) => !product.stock)
  const removeProduct = (product) => setProducts(products.filter((item) => item.id !== product.id))

  const saveProduct = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const product = {
      id: editing.id || Date.now(), slug: slugify(data.get('name')), name: data.get('name'), brand: data.get('brand'), category: data.get('category'),
      price: Number(data.get('price')), discountedPrice: Number(data.get('discountedPrice') || data.get('price')), stock: Number(data.get('stock')),
      description: data.get('description'), image: editing.image || DEFAULT_IMAGE, badge: 'New stock', specs: { Warranty: '1 year' },
    }
    setProducts(editing.id ? products.map((item) => item.id === editing.id ? product : item) : [...products, product])
    setEditing(null)
  }

  return <main className="admin-page">
    <aside className="admin-sidebar">
      <div className="admin-title"><LayoutDashboard size={18} /> Admin</div>
      {sections.map(([id, Icon, label]) => <button className={section === id ? 'active' : ''} key={id} onClick={() => setSection(id)}><Icon size={17} />{label}</button>)}
    </aside>
    <section className="admin-content">
      {section === 'dashboard' && <>
        <Heading eyebrow="STORE OVERVIEW" title="Good morning, admin." />
        <div className="stat-grid">
          <Stat icon={Package} label="Products" value={products.length} />
          <Stat icon={BarChart3} label="In stock" value={products.length - outOfStock.length} />
          <Stat icon={PackageX} label="Out of stock" value={outOfStock.length} />
        </div>
        <h2 className="admin-subheading">Needs restocking</h2>
        {outOfStock.length
          ? <ProductsTable products={outOfStock} onEdit={(product) => { setEditing(product); setSection('products') }} onDelete={removeProduct} />
          : <div className="empty-state">Everything is in stock.</div>}
      </>}
      {section === 'products' && <>
        <Heading eyebrow="CATALOG" title="Products"><button className="primary-button" onClick={() => setEditing({})}><Plus size={16} /> Add product</button></Heading>
        {editing
          ? <ProductForm editing={editing} onSave={saveProduct} onCancel={() => setEditing(null)} />
          : <ProductsTable products={products} onEdit={setEditing} onDelete={removeProduct} />}
      </>}
      {section === 'import' && <BulkImport onImport={(items) => { setProducts([...products, ...items]); setSection('products') }} />}
      {section === 'settings' && <SettingsPanel />}
    </section>
  </main>
}
