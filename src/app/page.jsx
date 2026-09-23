import Hero from '@/components/home/Hero'
import CategoryLinks from '@/components/home/CategoryLinks'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import TopBrands from '@/components/home/TopBrands'
import Trust from '@/components/home/Trust'

export default function HomePage() {
  return <main className="home"><Hero /><CategoryLinks /><FeaturedProducts /><TopBrands /><Trust /></main>
}
