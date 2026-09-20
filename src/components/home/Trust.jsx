import { BadgeCheck, Headphones, Truck } from 'lucide-react'

const promises = [
  { Icon: BadgeCheck, title: 'Authentic products', text: 'Every unit carries its official brand warranty, straight from the distributor.' },
  { Icon: Truck, title: 'Delivery you can trust', text: 'Careful delivery and installation across Rawalpindi and Islamabad, on time.' },
  { Icon: Headphones, title: 'Here to help', text: 'Real people who know the products and will tell you which one actually fits.' },
]

export default function Trust() {
  return <section className="promise-row">
    <div className="promise-title">
      <p className="eyebrow">WHY CHOOSE US</p>
      <h2>Ten years of getting it right</h2>
      <p>A showroom on Murree Road, and the same advice we would give our own family.</p>
    </div>
    {promises.map(({ Icon, title, text }) => <div key={title}><Icon className="promise-icon" /><strong>{title}</strong><p>{text}</p></div>)}
  </section>
}
