import Link from 'next/link'
import { ArrowRight, CookingPot, Refrigerator, Snowflake, WashingMachine } from 'lucide-react'
import { categories } from '@/data/products'

const icons = { 'Air Conditioner': Snowflake, Refrigerator, 'Washing Machine': WashingMachine, 'Small Kitchen Appliances': CookingPot }

export default function CategoryLinks() {
  return <section className="quick-links">
    <div className="section-heading"><div><p className="eyebrow">FIND YOUR FIT</p><h2>Shop by category</h2></div></div>
    <div className="quick-grid">{categories.map((category) => {
      const Icon = icons[category]
      return <Link key={category} href={`/category/${encodeURIComponent(category)}`}><span><Icon /></span><b>{category}</b><ArrowRight size={16} /></Link>
    })}</div>
  </section>
}
