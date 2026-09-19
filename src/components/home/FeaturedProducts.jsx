'use client'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useStore } from '@/context/StoreContext'
import ProductGrid from '@/components/product/ProductGrid'

export default function FeaturedProducts() {
  const { products } = useStore()
  return <section className="catalog" id="featured">
    <div className="section-heading">
      <div><p className="eyebrow">CURATED FOR YOUR HOME</p><h2>Featured products</h2></div>
      <Link className="text-button" href="/products">View all products <ArrowRight size={16} /></Link>
    </div>
    <ProductGrid products={products.slice(0, 6)} />
  </section>
}
