import './globals.css'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { StoreProvider } from '@/context/StoreContext'
import { getShell } from '@/lib/sanity'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import Analytics from '@/components/layout/Analytics'

const display = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-display', display: 'swap' })

// Pages are rebuilt from Sanity at most once a minute, so published edits go live within a minute or two.
export const revalidate = 60

export async function generateMetadata() {
  const { store } = await getShell()
  return {
    metadataBase: new URL(store.siteUrl),
    title: { default: `${store.name} | Home Appliances in ${store.city}`, template: `%s | ${store.name}` },
    description: store.description,
    alternates: { canonical: './' }, // each page's own address, without ?filters
  }
}

export default async function RootLayout({ children }) {
  const shell = await getShell()
  return <html lang="en" className={display.variable}><body><StoreProvider shell={shell}>
    <div className="site-shell">
      <Header />
      {children}
      <Footer />
    </div>
    <WhatsAppButton />
    <Analytics />
  </StoreProvider></body></html>
}
