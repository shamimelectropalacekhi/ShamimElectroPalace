import { getCatalog } from '@/lib/sanity'
import { brandHref, categoryHref, productHref } from '@/lib/format'

// /sitemap.xml: every page Google should know about.
export const revalidate = 3600

export default async function sitemap() {
  const { store, categories, brands, products } = await getCatalog()
  const at = (path, extra) => ({ url: store.siteUrl + path, ...extra })
  return [
    at('/', { changeFrequency: 'daily', priority: 1 }),
    at('/products', { changeFrequency: 'daily', priority: 0.8 }),
    ...categories.map((c) => at(categoryHref(c.name), { changeFrequency: 'daily', priority: 0.8 })),
    ...brands.map((b) => at(brandHref(b.name), { changeFrequency: 'weekly', priority: 0.6 })),
    at('/help', { changeFrequency: 'monthly', priority: 0.4 }),
    at('/about', { changeFrequency: 'monthly', priority: 0.4 }),
    ...products.map((p) => at(productHref(p), { lastModified: p.updatedAt, changeFrequency: 'weekly', priority: 0.7 })),
  ]
}
