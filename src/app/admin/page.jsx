import AdminGate from '@/components/admin/AdminGate'

export const metadata = { title: 'Admin', robots: { index: false, follow: false } }

export default function AdminPage() {
  return <AdminGate />
}
