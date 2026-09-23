import { AirVent, Coffee, CookingPot, GlassWater, Microwave, Package, Refrigerator, Shirt, WashingMachine } from 'lucide-react'

const byType = { Microwave, 'Air Fryer': CookingPot, Blender: GlassWater, Kettle: Coffee, Iron: Shirt }
const byCategory = { 'Washing Machines': WashingMachine, 'Air Conditioners': AirVent, Refrigerators: Refrigerator, 'Small Kitchen Appliances': Microwave }

// Stand-in artwork until a product has a real photo.
export default function ProductIcon({ category, type, ...props }) {
  const Icon = byType[type] || byCategory[category] || Package
  return <Icon aria-hidden="true" {...props} />
}

// Real photo when the admin added one, icon placeholder otherwise.
export function ProductVisual({ product, caption = 'product photo', className = 'pv-icon' }) {
  if (product.image) return <img className="pv-photo" src={product.image} alt={product.name} loading="lazy" />
  return <><ProductIcon className={className} category={product.category} type={product.type} /><span className="pv-caption">{caption}</span></>
}
