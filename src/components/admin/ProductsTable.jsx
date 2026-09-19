import { Pencil, Trash2 } from 'lucide-react'
import { money } from '@/lib/format'

export default function ProductsTable({ products, onEdit, onDelete }) {
  return <div className="admin-table">
    <div className="table-row table-head"><span>Product</span><span>Category</span><span>Price</span><span>Stock</span><span /></div>
    {products.map((product) => <div className="table-row" key={product.id}>
      <span><b>{product.name}</b><small>{product.brand}</small></span>
      <span>{product.category}</span>
      <span>{money(product.discountedPrice)}</span>
      <span>{product.stock}</span>
      <span className="row-actions">
        <button onClick={() => onEdit(product)} aria-label="Edit product"><Pencil size={15} /></button>
        <button onClick={() => onDelete(product)} aria-label="Delete product"><Trash2 size={15} /></button>
      </span>
    </div>)}
  </div>
}
