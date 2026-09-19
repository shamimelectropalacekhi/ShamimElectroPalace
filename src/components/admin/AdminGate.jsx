'use client'
import { useState } from 'react'
import AdminLogin from './AdminLogin'
import AdminPanel from './AdminPanel'

export default function AdminGate() {
  const [authed, setAuthed] = useState(false)
  return authed ? <AdminPanel /> : <AdminLogin onLogin={() => setAuthed(true)} />
}
