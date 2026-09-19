import Link from 'next/link'
import { store } from '@/data/store'

export default function Brand({ className = '' }) {
  return <Link href="/" className={`brand ${className}`.trim()}>
    <img className="brand-mark" src={store.logo} alt={`${store.name} logo`} width="46" height="46" />
    <span>SHAMIM <b>ELECTRO PALACE</b><small>HOME APPLIANCES</small></span>
  </Link>
}
