# Shamim Electro Palace

Next.js (App Router) storefront for the Rawalpindi showroom. Customers browse the
catalog and order over WhatsApp - there is no cart or online payment.

`npm run dev` to develop, `npm run build` to ship (Netlify).

```
src/app/          routes (one page.jsx per URL), globals.css, icon.png, opengraph-image.jpg
src/components/   layout/ home/ product/ admin/ - one component per file
src/context/      StoreContext (the catalog; localStorage until the database is connected)
src/data/         products.js (seed catalog), store.js (phone, address, WhatsApp, hours)
src/lib/          format, filterProducts, whatsapp, storage helpers
public/           logo-small.jpg
```

Brand colours live at the top of `src/app/globals.css` and come from the logo:
blue `#011ab4`, gold `#e9bf1b`.
