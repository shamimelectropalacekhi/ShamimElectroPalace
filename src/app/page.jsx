import Hero from '@/components/home/Hero'
import CategoryLinks from '@/components/home/CategoryLinks'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import TopBrands from '@/components/home/TopBrands'
import Trust from '@/components/home/Trust'
import { getShell } from '@/lib/sanity'

export default async function HomePage() {
  const { store } = await getShell()
  return <main className="home">
    <h1 className="sr-only">{store.name}: home appliances in {store.city}</h1>
    <Hero /><Trust /><CategoryLinks /><FeaturedProducts /><TopBrands />
  </main>
}
