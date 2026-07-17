import { Users, BookOpen, UserPlus } from 'lucide-react'

type StatCardProps = {
  label: string
  value: number
  icon: React.ReactNode
  iconBg: string
  highlight?: boolean
}

function StatCard({ label, value, icon, iconBg, highlight }: StatCardProps) {
  return (
    <div className={`flex flex-col justify-between rounded-lg border p-4 shadow-sm transition-all hover:-translate-y-0.5 ${highlight ? 'border-primary bg-primary text-primary-foreground' : 'border-outline-variant bg-surface-container-low'}`}>
      <div className="flex items-start justify-between gap-2">
        <p className={`text-[11px] font-bold uppercase tracking-wider leading-tight ${highlight ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
          {label}
        </p>
        <div className={`shrink-0 rounded-lg p-2 ${iconBg}`}>{icon}</div>
      </div>
      <p className={`mt-3 text-2xl font-black ${highlight ? 'text-primary-foreground' : 'text-foreground'}`}>
        {value.toLocaleString('vi-VN')}
      </p>
    </div>
  )
}

interface UserStatsSectionProps {
  stats: {
    totalUsers: number
    totalAuthors: number
    pendingRequests: number
  }
}

export function UserStatsSection({ stats }: UserStatsSectionProps) {
  const cards: StatCardProps[] = [
    {
      label: 'Tổng người dùng',
      value: stats.totalUsers,
      icon: <Users className="h-4 w-4 text-primary" />,
      iconBg: 'bg-surface/90',
      highlight: true
    },
    {
      label: 'Tác giả',
      value: stats.totalAuthors,
      icon: <BookOpen className="h-4 w-4 text-violet-600" />,
      iconBg: 'bg-violet-500/10'
    },
    {
      label: 'Chờ duyệt',
      value: stats.pendingRequests,
      icon: <UserPlus className="h-4 w-4 text-amber-600" />,
      iconBg: 'bg-amber-500/10'
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {cards.map((c) => (
        <StatCard key={c.label} {...c} />
      ))}
    </div>
  )
}