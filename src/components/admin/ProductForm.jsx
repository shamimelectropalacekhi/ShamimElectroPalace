import { Check, FileUp } from 'lucide-react'
import { categories } from '@/data/products'

export default function ProductForm({ editing, onSave, onCancel }) {
  return <form className="product-form" onSubmit={onSave}>
    <h2>{editing.id ? 'Edit product' : 'Add product'}</h2>
    <input name="name" required placeholder="Product name" defaultValue={editing.name} />
    <input name="brand" required placeholder="Brand" defaultValue={editing.brand} />
    <select name="category" defaultValue={editing.category || categories[0]}>{categories.map((category) => <option key={category}>{category}</option>)}</select>
    <div className="form-row">
      <input name="price" required type="number" placeholder="Price" defaultValue={editing.price} />
      <input name="discountedPrice" type="number" placeholder="Discounted price" defaultValue={editing.discountedPrice} />
      <input name="stock" required type="number" placeholder="Stock quantity" defaultValue={editing.stock} />
    </div>
    <textarea name="description" required placeholder="Description" defaultValue={editing.description} />
    <label className="upload-field"><FileUp size={17} /> Product images <input type="file" accept="image/*" multiple /></label>
    <div>
      <button className="primary-button" type="submit">Save product <Check size={16} /></button>
      <button className="cancel-button" type="button" onClick={onCancel}>Cancel</button>
    </div>
  </form>
}
