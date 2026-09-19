'use client'
import { useState } from 'react'
import { Check, Upload } from 'lucide-react'
import { slugify } from '@/lib/format'

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80'

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/)
  const headers = lines.shift().split(',').map((value) => value.trim().toLowerCase())
  return lines.map((line, index) => {
    const values = line.split(',')
    const row = Object.fromEntries(headers.map((header, i) => [header, values[i]?.trim()]))
    return {
      id: Date.now() + index, slug: slugify(row.name), name: row.name, brand: row.brand, category: row.category,
      price: Number(row.price), discountedPrice: Number(row['discounted price'] || row.price), stock: Number(row.stock),
      description: row.description, badge: 'Imported', image: DEFAULT_IMAGE, specs: { Warranty: '1 year' },
    }
  })
}

export default function BulkImport({ onImport }) {
  const [message, setMessage] = useState('')
  const parse = (event) => {
    const file = event.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const imported = parseCsv(String(reader.result))
      onImport(imported)
      setMessage(`${imported.length} products imported`)
    }
    reader.readAsText(file)
  }
  return <div className="bulk-panel">
    <p className="eyebrow">CATALOG OPERATIONS</p>
    <h1>Bulk import</h1>
    <p>Upload a CSV with columns: name, brand, category, price, discounted price, stock, description.</p>
    <label className="dropzone"><Upload size={25} /><b>Choose CSV file</b><small>Products will be added to the local catalog for now.</small><input type="file" accept=".csv,text/csv" onChange={parse} /></label>
    {message && <div className="import-success"><Check size={17} /> {message}</div>}
  </div>
}
