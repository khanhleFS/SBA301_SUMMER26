import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from 'recharts'
import { Users, ArrowRight, CreditCard, UserPlus, BookOpen, CheckCircle2, Clock } from 'lucide-react'
import type { PackageTier } from '../services/dashboard.service'

function formatFullVND(value: number) {
  return `${value.toLocaleString('vi-VN')} đ`
}

function formatShortVND(value: number) {
  const abs = Math.abs(value)
  if (abs >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`
  if (abs >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`
  if (abs >= 1_000) return `${(value / 1_000).toFixed(0)}K`
  return `${value}`
}

export function DashboardChartSection({ chartData, platformNet }: { chartData: number[]; platformNet: number }) {
  // Chuyển mảng number[] thành mảng object để Recharts có thể đọc
  const formattedChartData = chartData.map((val, idx) => ({
    name: `Tháng ${idx + 1}`,
    value: val,
  }))

  return (
    <section className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-12">
      <div className="rounded-lg border border-gray-300 bg-surface p-4 shadow-sm lg:col-span-9 sm:p-5">
        <div className="flex items-center justify-between gap-3 border-b border-gray-200 dark:border-zinc-800 pb-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Biểu đồ gì đó?</div>
          </div>
        </div>

        <div className="mt-4 h-[120px] w-full min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={formattedChartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.06)" />
              <XAxis
                dataKey="name"
                tickLine={false}
                tickFormatter={(v) => v.replace('Tháng ', '')}
                style={{ fontSize: 10, fontWeight: 500, fill: 'var(--muted-foreground)' }}
              />
              <YAxis
                tickLine={false}
                style={{ fontSize: 9, fontWeight: 500, fill: 'var(--muted-foreground)' }}
              />
              <Tooltip
                contentStyle={{
                  background: 'var(--surface-container-lowest, #fff)',
                  border: '1px solid var(--outline-variant, #e5e7eb)',
                  borderRadius: '6px',
                  fontSize: '11px',
                }}
                formatter={(value: any) => [`${value}%`, 'Chỉ số']}
              />
              <Bar dataKey="value" name="Chỉ số" fill="var(--primary)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex min-h-[6rem] flex-col items-start justify-center rounded-xl border border-primary bg-primary p-5 text-white shadow-sm lg:col-span-3">
        <div className="w-full">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-on-primary">Thống kê quan trọng</div>
          <div className="mt-4 text-4xl font-bold leading-none sm:text-5xl text-on-primary">{formatFullVND(Math.round(platformNet))}</div>
        </div>
      </div>
    </section >
  )
}

export function DashboardUserPulseSection({
  totalUsers,
  totalAuthors,
  pendingRequests,
}: {
  totalUsers: number
  totalAuthors: number
  pendingRequests: number
}) {
  return (
    <section className="flex flex-col justify-between rounded-xl border border-outline-variant bg-surface-container-low p-4 shadow-sm lg:col-span-5 sm:p-5">
      <div>
        <div className="flex items-center justify-between gap-3 border-b border-outline-variant pb-3">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Tình hình người dùng</div>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* Thẻ chính: Chiếm 2 cột trên màn hình sm trở lên */}
          <div className="sm:col-span-2">
            <PulseCard
              label="Tổng user"
              value={totalUsers}
              icon={<Users className="h-5 w-5 text-primary" />}
              iconBg="bg-primary/10"
            />
          </div>

          {/* Các thẻ thứ cấp */}
          <PulseCard
            label="Tác giả"
            value={totalAuthors}
            icon={<BookOpen className="h-5 w-5 text-violet-600" />}
            iconBg="bg-violet-500/10"
          />
          <PulseCard
            label="Chờ duyệt"
            value={pendingRequests}
            icon={<UserPlus className="h-5 w-5 text-amber-600" />}
            iconBg="bg-amber-500/10"
          />
        </div>
      </div>

    </section>
  )
}

export function DashboardTransactionsSection({
  recentTransactions,
}: {
  recentTransactions: {
    id: string
    user: string
    method: string
    amount: number
    time: string
    status: 'success' | 'pending'
  }[]
}) {
  return (
    <aside className="flex h-full w-full flex-col justify-between rounded-xl border border-outline-variant bg-surface-container-low p-4 shadow-sm lg:col-span-7 sm:p-5">
      <div>
        {/* HEADER: Giữ nguyên y hệt của bạn */}
        <div className="flex h-[40px] items-center justify-between gap-3 border-b border-outline-variant pb-3">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Giao dịch gần đây</div>

          <button
            onClick={() => { }}
            className="inline-flex items-center gap-1 rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-1.5 text-[11px] font-bold text-primary transition-colors hover:bg-surface-container"
          >
            Xem tất cả <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* DANH SÁCH: Đã ốp style icon bo tròn và flex layout của TransactionSection */}
        <div className="mt-2 flex flex-col">
          {recentTransactions.map((transaction) => {
            const isCompleted = transaction.status === 'success'

            return (
              <div
                key={transaction.id}
                className="group flex w-full items-center gap-3 rounded-md px-2 py-3 text-left transition-colors hover:bg-surface-container-lowest"
              >
                {/* ICON BÊN TRÁI */}
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${isCompleted
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                  }`}>
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <Clock className="h-5 w-5" />
                  )}
                </div>

                {/* THÔNG TIN CHÍNH */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-foreground">{transaction.user}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    <span className="font-mono">{transaction.time}</span>
                  </p>
                </div>

                {/* SỐ TIỀN BÊN PHẢI (Giữ nguyên hàm format của bạn) */}
                <div className="shrink-0 text-right">
                  <p className="text-sm font-black text-green-600">
                    +{formatFullVND(Math.round(transaction.amount))}
                  </p>
                  <p className="mt-0.5 text-[10px] font-medium text-muted-foreground">
                    {formatShortVND(Math.round(transaction.amount))}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </aside>
  )
}

export function DashboardPackagesSection({ packageTiers }: { packageTiers: PackageTier[] }) {
  return (
    <section className="rounded-xl border border-[var(--outline-variant)] bg-surface-container-low p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-[var(--outline-variant)] pb-3">
        <div>
          <h2 className="mt-1 text-lg font-bold text-foreground">Danh sách gói nạp (Packages)</h2>
        </div>
        <button className="rounded-lg bg-primary px-4 py-2 text-xs font-bold text-on-primary shadow-sm transition-all hover:opacity-90 active:scale-95">
          + Thêm gói mới
        </button>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {packageTiers.map((pkg) => (
          <PackageCard key={pkg.id} data={pkg} />
        ))}
      </div>
    </section>
  )
}

function PulseCard({
  label,
  value,
  icon,
  iconBg,
}: {
  label: string
  value: number
  icon: React.ReactNode
  iconBg: string
}) {
  return (
    <div className="flex items-center justify-between rounded-md border border-outline-variant bg-surface-container-lowest p-4 transition-all duration-200 hover:bg-surface-container">
      <div className="space-y-1">
        <span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{label}</span>
        <span className="block text-2xl font-black text-foreground">{value || 0}</span>
      </div>
      <div className={`shrink-0 flex items-center justify-center rounded-xl ${iconBg} p-2.5`}>
        {icon}
      </div>
    </div>
  )
}

function PackageCard({ data }: { data: PackageTier }) {
  const { name, price, coin, bonus, isPopular } = data
  const cardBorder = isPopular ? 'border-primary ring-1 ring-primary-opaque' : 'border-[var(--outline-variant)]'
  const cardBg = isPopular ? 'bg-primary/5' : 'bg-surface-container-lowest'

  return (
    <div className={`relative flex flex-col justify-between overflow-hidden rounded-md border p-4 transition-transform hover:-translate-y-1 ${cardBorder} ${cardBg}`}>
      {isPopular && (
        <div className="absolute right-0 top-0 rounded-bl-md bg-primary px-3 py-2 text-[9px] font-bold uppercase tracking-wider text-on-primary shadow-sm">
          <CreditCard className="h-4 w-4" strokeWidth={3} />
        </div>
      )}

      <div className="mt-2 text-center">
        <h3 className="truncate text-sm font-bold text-foreground">{name}</h3>
        <div className="mt-1 flex items-baseline justify-center">
          <span className="text-4xl font-black tracking-tight text-primary">{price}K</span>
        </div>
        <p className="mt-0.5 text-xs font-medium text-muted-foreground">{price * 1000} VNĐ</p>
      </div>

      <div className="mt-5 rounded-lg bg-surface-container p-2.5 text-center transition-colors hover:bg-surface-container-high">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Nhận được</p>
        <p className="mt-0.5 text-lg font-bold text-emerald-600">
          {coin} <span className="text-xs">Coin</span>
        </p>
        {bonus > 0 ? (
          <p className="mt-0.5 text-[10px] font-bold text-amber-600">+ Tặng {bonus} Coin</p>
        ) : (
          <p className="mt-0.5 select-none text-[10px] text-transparent">No bonus</p>
        )}
      </div>
    </div>
  )
}