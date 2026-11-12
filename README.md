# Shamim Electro Palace

Next.js (App Router) storefront for the Karachi (Saddar) showroom. Customers browse the
catalog and order over WhatsApp - there is no cart or online payment.

`npm run dev` to develop, `npm run build` to ship (Netlify builds `main`).
Content (products, brands, categories, store details) is edited in the Sanity Studio in `studio/`
and reaches the site within a minute or two.

```
src/app/          routes (one page.jsx per URL), globals.css, sitemap.js, robots.js
  /               home: banner, promises, categories, five product rows, brands
  /category/[name]  one category          /brand/[name]   one brand
  /products       everything, and search (?q=)            /product/[slug]  one product
  /help           delivery, warranty, installments        /about           contact and map
src/components/   layout/ home/ product/ - one component per file
src/context/      StoreContext: store details, categories and brands for the header, footer and WhatsApp links
src/data/         store.js - fallback phone, address, hours when Sanity has none
src/lib/          sanity (the one catalog query), search, filterProducts, picks, whatsapp, format
studio/           Sanity Studio and its schemas; `npx sanity deploy` publishes it
public/           logo-small.jpg
```

How the pages stay light: `getCatalog()` in `src/lib/sanity.js` loads the catalog once a minute on the
server. Each page sends the browser only what it shows (`slim()` products for cards; the full product
only on its own page). Listing filters, sort and "Show more" live in the page address, e.g.
`/category/Refrigerators?brand=Orient&sort=low`.

Checks: `npm run lint`, then `node src/lib/search.check.mjs`, `node src/lib/filterProducts.check.mjs`
and `node src/lib/parseDetails.check.mjs`.

Optional settings (Netlify environment variables):
- `SITE_URL` - the site's own address once it has a domain (used for the sitemap, canonical links and the link in WhatsApp messages). Without it Netlify's address is used.
- `NEXT_PUBLIC_GA_ID` - a Google Analytics ID (G-...). Turns on visitor statistics and counts WhatsApp and call taps.

Brand colours live at the top of `src/app/globals.css`.
