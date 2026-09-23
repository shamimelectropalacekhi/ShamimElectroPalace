import { AirVent, Coffee, CookingPot, GlassWater, Microwave, Package, Refrigerator, Shirt, WashingMachine } from 'lucide-react'

const byType = { Microwave, 'Air Fryer': CookingPot, Blender: GlassWater, Kettle: Coffee, Iron: Shirt }
// Keys match the category "Icon" choices in the Studio.
const byIcon = { 'air-conditioner': AirVent, 'washing-machine': WashingMachine, refrigerator: Refrigerator, microwave: Microwave }

// Stand-in artwork until a product has a real photo.
export default function ProductIcon({ icon, type, ...props }) {
  const Icon = byType[type] || byIcon[icon] || Package
  return <Icon aria-hidden="true" {...props} />
}

// Photo when there is one, icon placeholder otherwise.
export function ProductVisual({ product, image = product.images?.[0], caption = 'product photo', className = 'pv-icon' }) {
  if (image) return <img className="pv-photo" src={image.url} alt={image.alt} loading="lazy" />
  return <><ProductIcon className={className} icon={product.icon} type={product.type} /><span className="pv-caption">{caption}</span></>
}
