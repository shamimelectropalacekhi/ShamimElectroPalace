import { getShell } from '@/lib/sanity'

export default async function robots() {
  const { store } = await getShell()
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${store.siteUrl}/sitemap.xml` }
}
