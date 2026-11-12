'use client'
import { useEffect } from 'react'
import Script from 'next/script'

// Google Analytics, switched on by setting NEXT_PUBLIC_GA_ID (e.g. G-XXXXXXX) in Netlify. Without it nothing loads.
// Also counts taps on any WhatsApp or call link, which is this site's "order" button.
const ID = process.env.NEXT_PUBLIC_GA_ID

export default function Analytics() {
  useEffect(() => {
    if (!ID) return
    const onClick = (event) => {
      const link = event.target.closest?.('a[href*="wa.me"], a[href^="tel:"]')
      if (link) window.gtag?.('event', link.href.startsWith('tel:') ? 'call_click' : 'whatsapp_click', { page_path: location.pathname })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
  if (!ID) return null
  return <>
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${ID}`} strategy="afterInteractive" />
    <Script id="ga" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${ID}')`}</Script>
  </>
}
