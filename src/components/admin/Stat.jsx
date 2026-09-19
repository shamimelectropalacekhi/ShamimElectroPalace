export default function Stat({ icon: Icon, label, value }) {
  return <div className="stat-card"><Icon size={19} /><span>{label}</span><strong>{value}</strong></div>
}
