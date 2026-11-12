import { AirVent, Coffee, CookingPot, GlassWater, House, Microwave, Package, Refrigerator, Shirt, Snowflake, Sparkles, Tv, WashingMachine } from 'lucide-react'

const byType = { Microwave, 'Air Fryer': CookingPot, Blender: GlassWater, Kettle: Coffee, Iron: Shirt }
// Keys match the category "Icon" choices in the Studio (and the name-based guesses in lib/sanity.js).
const byIcon = {
  'air-conditioner': AirVent, 'washing-machine': WashingMachine, refrigerator: Refrigerator, microwave: Microwave,
  tv: Tv, 'water-dispenser': GlassWater, freezer: Snowflake, 'personal-care': Sparkles, home: House,
}

// Stand-in artwork until a product has a real photo.
export default function ProductIcon({ icon, type, ...props }) {
  const Icon = byType[type] || byIcon[icon] || Package
  return <Icon aria-hidden="true" {...props} />
}

// Photo when there is one, icon placeholder otherwise. `image` is { url, alt }.
export function ProductVisual({ product, image, caption = 'Photo coming soon', className = 'pv-icon', eager = false }) {
  if (image?.url) return <img className="pv-photo" src={image.url} alt={image.alt || product.name} loading={eager ? 'eager' : 'lazy'} decoding="async" />
  return <><ProductIcon className={className} icon={product.icon} type={product.type} /><span className="pv-caption">{caption}</span></>
}
