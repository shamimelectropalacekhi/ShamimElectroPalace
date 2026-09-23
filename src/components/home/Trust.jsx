import { BadgeCheck, CreditCard, ShieldCheck, Truck } from 'lucide-react'
import { store } from '@/data/store'

const promises = [
  { Icon: BadgeCheck, title: 'Genuine Products', text: '100% original stock from authorized distributors' },
  { Icon: ShieldCheck, title: 'Official Warranty', text: 'Full brand warranty on every appliance' },
  { Icon: Truck, title: 'Free Delivery & Installation', text: `Across ${store.city} on ACs & large appliances` },
  { Icon: CreditCard, title: 'Easy Installments', text: 'Flexible plans on bank credit cards' },
]

export default function Trust() {
  return <section className="trust">
    {promises.map(({ Icon, title, text }) => <div key={title}>
      <span className="trust-icon"><Icon size={24} /></span>
      <span className="trust-copy"><b>{title}</b><small>{text}</small></span>
    </div>)}
  </section>
}
