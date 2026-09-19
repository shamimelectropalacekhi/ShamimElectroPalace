import './globals.css'
import { StoreProvider } from '@/context/StoreContext'
import { store } from '@/data/store'
import Announcement from '@/components/layout/Announcement'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'

export const metadata = {
  title: { default: `${store.name} | Home Appliances in Rawalpindi & Islamabad`, template: `%s | ${store.name}` },
  description: store.description,
}

export default function RootLayout({ children }) {
  return <html lang="en"><body><StoreProvider><div className="site-shell">
    <Announcement />
    <Header />
    {children}
    <Footer />
    <WhatsAppButton />
  </div></StoreProvider></body></html>
}
