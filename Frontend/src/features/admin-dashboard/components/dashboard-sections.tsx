import { Activity, ArrowRight, CreditCard, UserPlus } from 'lucide-react'
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
  return (
    <section className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-12">
      <div className="rounded-xl border border-gray-300 bg-white p-4 shadow-sm lg:col-span-9 sm:p-5">
        <div className="flex items-center justify-between gap-3 border-b border-gray-200 pb-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Biểu đồ</div>
          </div>
        </div>

        <div className="mt-4 flex h-28 items-end gap-2 sm:h-24">
          {chartData.map((value, index) => (
            <div key={`${value}-${index}`} className="flex flex-1 flex-col items-center justify-end gap-2">
              <div className="w-full rounded-t-md bg-primary" style={{ height: `${value}%`, minHeight: '0.75rem' }} />
              <div className="text-[10px] text-gray-500">{index + 1}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex min-h-[6rem] flex-col items-start justify-center rounded-xl border border-primary bg-primary p-5 text-white shadow-sm lg:col-span-3">
        <div className="w-full">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-on-primary">Thống kê quan trọng</div>
          <div className="mt-4 text-4xl font-bold leading-none sm:text-5xl">{formatFullVND(Math.round(platformNet))}</div>
        </div>
      </div>
    </section>
  )
}

export function DashboardUserPulseSection({
  readersOnline,
  newSignupsToday,
  totalNovels,
  totalCategories,
}: {
  readersOnline: number
  newSignupsToday: number
  totalNovels: number
  totalCategories: number
}) {
  return (
    <section className="flex flex-col justify-between rounded-xl border border-outline-variant bg-surface-container-low p-4 shadow-sm lg:col-span-5 sm:p-5">
      <div>
        <div className="flex items-center justify-between gap-3 border-b border-outline-variant pb-3">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Tình hình người dùng</div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <PulseCard label="Đang online" value={readersOnline} icon={<Activity className="h-5 w-5 text-green-600" />} iconBg="bg-green-500/10" />
          <PulseCard label="Đăng ký mới" value={newSignupsToday} icon={<UserPlus className="h-5 w-5 text-blue-600" />} iconBg="bg-blue-500/10" />
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <PulseCard label="Tổng số truyện" value={totalNovels} icon={<Activity className="h-5 w-5 text-purple-600" />} iconBg="bg-purple-500/10" />
          <PulseCard label="Thể loại truyện" value={totalCategories} icon={<UserPlus className="h-5 w-5 text-amber-600" />} iconBg="bg-amber-500/10" />
        </div>
      </div>

      <div className="mt-4 space-y-2 border-t border-outline-variant pt-3.5">
        <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Hoạt động gần đây</div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex min-w-0 items-center gap-2">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
            <p className="truncate text-foreground">Người dùng <span className="font-medium">@hoangnv</span> vừa đăng ký</p>
          </div>
          <span className="ml-2 shrink-0 text-[10px] text-muted-foreground">2 phút trước</span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex min-w-0 items-center gap-2">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
            <p className="truncate text-foreground">Sách <span className="font-medium">"Lumina Scroll"</span> có thêm 12 readers</p>
          </div>
          <span className="ml-2 shrink-0 text-[10px] text-muted-foreground">5 phút trước</span>
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
        <div className="flex h-[40px] items-center justify-between gap-3 border-b border-outline-variant pb-3">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Giao dịch gần đây</div>

          <button
            onClick={() => {}}
            className="inline-flex items-center gap-1 rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-1.5 text-[11px] font-bold text-primary transition-colors hover:bg-surface-container"
          >
            Xem tất cả <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="mt-1 space-y-2.5">
          {recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-md border border-outline-variant/40 bg-surface-container-lowest p-3 transition-colors hover:bg-surface-container"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-bold text-foreground">{transaction.user}</p>
                  <span className="rounded border border-green-500/20 bg-green-500/10 px-1.5 py-0.5 text-[9px] font-bold uppercase text-green-600">
                    {transaction.status === 'success' ? 'Thành công' : 'Đang xử lý'}
                  </span>
                </div>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {transaction.method} • <span className="font-mono text-[11px]">{transaction.time}</span>
                </p>
              </div>

              <div className="whitespace-nowrap text-right">
                <div className="text-sm font-black text-green-600">+{formatFullVND(Math.round(transaction.amount))}</div>
                <div className="mt-0.5 text-[10px] font-medium text-muted-foreground">{formatShortVND(Math.round(transaction.amount))}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-dashed border-outline-variant/60 bg-surface-container-lowest px-3 py-2 text-xs text-muted-foreground">
        Gợi ý: nên thêm bộ lọc theo ngày, phương thức thanh toán và trạng thái xử lý ở phần này.
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