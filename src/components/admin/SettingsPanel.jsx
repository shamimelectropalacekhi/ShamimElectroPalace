import { Plus } from 'lucide-react'
import { brands, categories } from '@/data/products'

export default function SettingsPanel() {
  return <div className="settings-panel">
    <p className="eyebrow">STORE CONFIGURATION</p>
    <h1>Categories &amp; brands</h1>
    <p>These seeded values will become MongoDB-backed CRUD once the database is connected.</p>
    <div className="tag-list"><b>Categories</b>{categories.map((item) => <span key={item}>{item}</span>)}</div>
    <div className="tag-list"><b>Brands</b>{brands.map((item) => <span key={item}>{item}</span>)}</div>
    <button className="outline-button"><Plus size={16} /> Add category or brand</button>
  </div>
}
