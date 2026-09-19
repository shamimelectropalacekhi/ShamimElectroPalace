import { ArrowRight } from 'lucide-react'
import { store } from '@/data/store'

export default function AdminLogin({ onLogin }) {
  return <main className="admin-login"><div className="login-panel">
    <img className="brand-mark" src={store.logo} alt={`${store.name} logo`} width="64" height="64" />
    <p className="eyebrow">STAFF ACCESS</p>
    <h1>Admin workspace</h1>
    <p>Mock login for the v1 frontend. NextAuth will replace this gate.</p>
    <form onSubmit={(event) => { event.preventDefault(); onLogin() }}>
      <input required placeholder="Email" type="email" defaultValue="admin@shamimelectropalace.pk" />
      <input required placeholder="Password" type="password" defaultValue="password" />
      <button className="primary-button" type="submit">Sign in <ArrowRight size={17} /></button>
    </form>
  </div></main>
}
