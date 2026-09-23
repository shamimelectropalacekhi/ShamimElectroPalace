import './globals.css'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { StoreProvider } from '@/context/StoreContext'
import { getCatalog } from '@/lib/sanity'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'

const display = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-display', display: 'swap' })

// Pages are rebuilt from Sanity at most once a minute, so published edits go live within ~60s.
// ponytail: time-based refresh; add a Sanity webhook + revalidatePath if edits must appear instantly.
export const revalidate = 60

export async function generateMetadata() {
  const { store } = await getCatalog()
  return {
    title: { default: `${store.name} | Home Appliances in ${store.city}`, template: `%s | ${store.name}` },
    description: store.description,
  }
}

export default async function RootLayout({ children }) {
  const catalog = await getCatalog()
  return <html lang="en" className={display.variable}><body><StoreProvider catalog={catalog}>
    <div className="site-shell">
      <Header />
      {children}
      <Footer />
    </div>
    <WhatsAppButton />
  </StoreProvider></body></html>
}
