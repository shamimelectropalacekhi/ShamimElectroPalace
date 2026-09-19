import { BadgeCheck, Headphones, Truck } from 'lucide-react'

const promises = [
  { Icon: BadgeCheck, title: 'Authentic products', text: 'Official brand warranty included' },
  { Icon: Truck, title: 'Delivery you can trust', text: 'Careful delivery, right on time' },
  { Icon: Headphones, title: 'Here to help', text: 'Real people, real product advice' },
]

export default function Trust() {
  return <section className="promise-row">{promises.map(({ Icon, title, text }) => <div key={title}><Icon className="promise-icon" /><div><strong>{title}</strong><p>{text}</p></div></div>)}</section>
}
