import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata = { title: 'Page not found' }

export default function NotFound() {
  return <main className="listing-page">
    <p className="eyebrow">404</p>
    <h1 className="notfound-title">We could not find that page.</h1>
    <p className="about-lead">The link may be old or mistyped. Browse the catalog instead.</p>
    <Link className="primary-button" href="/">Back to home <ArrowRight size={17} /></Link>
  </main>
}
