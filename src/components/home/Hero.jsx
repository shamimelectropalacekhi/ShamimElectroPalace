import { ArrowRight, BadgeCheck, Headphones } from 'lucide-react'

export default function Hero() {
  return <section className="hero-section">
    <div className="hero-copy">
      <p className="eyebrow">THE SMARTER HOME STARTS HERE</p>
      <h1>Good appliances.<br /><em>Better living.</em></h1>
      <p className="hero-intro">Thoughtfully selected essentials from the world&apos;s most trusted brands, delivered to your doorstep.</p>
      <a className="primary-button" href="#featured">Shop the collection <ArrowRight size={17} /></a>
      <div className="hero-notes"><span><BadgeCheck size={14} /> Genuine warranty</span><span><Headphones size={14} /> Installation support</span></div>
    </div>
    <div className="hero-art">
      <img src="https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=90" alt="Modern kitchen with premium appliances" />
      <div className="floating-note"><strong>01</strong><span>Make home<br />feel better.</span></div>
    </div>
  </section>
}
