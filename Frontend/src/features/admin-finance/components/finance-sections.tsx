import { useState } from 'react'
import { Tag } from 'lucide-react'
import type { CashFlowItem, PackageTier } from '../services/finance.service'

function formatVND(value: number) {
  return `${value.toLocaleString('vi-VN')} đ`
}

function CashFlowChart({ cashFlow }: { cashFlow: CashFlowItem[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const peak = Math.max(...cashFlow.map((item) => item.value))
  const scaleTicks = [0, 0.25, 0.5, 0.75, 1]

  const formatMoney = (amount: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)

  return (
    <div className="flex h-full flex-col rounded-xl border border-outline-variant bg-surface-container-low p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-outline-variant pb-3">
        <div>
          <h2 className="mt-1 text-lg font-bold text-foreground">Biểu đồ nạp ví theo tuần</h2>
        </div>
        <button className="rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-surface-container">
          Xuất báo cáo
        </button>
      </div>

      <div className="mt-5 grid min-h-0 flex-1 grid-cols-[4.5rem_minmax(0,1fr)] gap-3">
        <div className="relative h-full">
          {scaleTicks.map((tick) => {
            const tickValue = Math.round(peak * tick)

            return (
              <div
                key={tick}
                className="absolute left-0 right-0 flex items-center gap-2 text-[10px] font-bold text-muted-foreground"
                style={{ bottom: `${tick * 100}%`, transform: 'translateY(50%)' }}
              >
                <span className="w-14 truncate text-right">{formatMoney(tickValue)}</span>
                <span className="h-px flex-1 bg-outline-variant/50" />
              </div>
            )
          })}
        </div>

        <div className="grid h-full grid-cols-7 items-end gap-3">
          {cashFlow.map((item, index) => {
            const isMax = item.value === peak
            const isHovered = hoveredIndex === index
            const hasAnyHover = hoveredIndex !== null

            const barColor = hasAnyHover
              ? isHovered ? 'bg-primary' : 'bg-secondary-container'
              : isMax ? 'bg-primary' : 'bg-secondary-container'

            return (
              <div
                key={item.label}
                className="flex h-full flex-col items-center justify-end gap-2"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative flex h-full w-full items-end">
                  <div
                    className={`w-full rounded-t-md ${barColor}`}
                    style={{ height: `${(item.value / peak) * 100}%` }}
                  />
                </div>
                <div className="mt-2 text-xs">{item.label}</div>
              </div>
            )})}
          </div>
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
          <Tag className="h-4 w-4" strokeWidth={3} />
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

function PackageManagement({ packageTiers }: { packageTiers: PackageTier[] }) {
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

function KpiGrid({ kpiData }: { kpiData: { id: number; title: string; subtitle: string; amount: string; growth: string; actionText: string; isPrimary: boolean; icon: any }[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {kpiData.map((d) => (
        <KpiCard key={d.id} data={d} />
      ))}
    </div>
  )
}

function KpiCard({ data }: { data: any }) {
  const { title, subtitle, amount, growth, actionText, isPrimary, icon: Icon } = data
  return (
    <div className={`rounded-xl border p-4 shadow-sm ${isPrimary ? 'border-primary bg-primary/5' : 'border-outline-variant bg-surface-container-low'}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <div className={`rounded-lg p-2 ${isPrimary ? 'bg-primary text-on-primary' : 'bg-surface-container'}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-4">
        <div className="text-2xl font-black text-foreground">{amount}</div>
        <div className="mt-1 text-xs font-semibold text-emerald-600">{growth}</div>
      </div>

      <button className="mt-4 text-xs font-bold text-primary hover:underline">{actionText}</button>
    </div>
  )
}

export function FinanceKpiSection({ kpiData }: { kpiData: { id: number; title: string; subtitle: string; amount: string; growth: string; actionText: string; isPrimary: boolean; icon: any }[] }) {
  return <KpiGrid kpiData={kpiData} />
}

export function FinanceChartsAndDepositsSection({ cashFlow, recentDeposits }: { cashFlow: CashFlowItem[]; recentDeposits: { user: string; method: string; amount: number; status: 'success' | 'pending'; time: string }[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <CashFlowChart cashFlow={cashFlow} />
      </div>

      <aside className="lg:col-span-1">
        <div className="flex flex-col gap-3">
          {recentDeposits.map((deposit) => (
            <div
              key={`${deposit.user}-${deposit.time}`}
              className="flex items-center justify-between gap-4 rounded-md border border-[var(--outline-variant)]/40 bg-surface-container-lowest p-3.5 transition-colors hover:bg-surface-container"
            >
              <div className="flex min-w-0 flex-col gap-1.5">
                <p className="truncate text-[15px] font-bold text-foreground">{deposit.user}</p>
                <div className="flex items-center gap-2">
                  <span className={`shrink-0 rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${deposit.status === 'success'
                    ? 'bg-[#e6f4ea] text-[#137333] dark:bg-[#137333]/20 dark:text-[#81c995]'
                    : 'bg-[#fef7e0] text-[#b06000] dark:bg-[#b06000]/20 dark:text-[#fde293]'
                  }`}>
                    {deposit.status === 'success' ? 'Thành công' : 'Đang xử lý'}
                  </span>
                  <p className="truncate text-xs text-muted-foreground">{deposit.method} • {deposit.time}</p>
                </div>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-[15px] font-black text-emerald-600">+{formatVND(deposit.amount)}</p>
                <p className="mt-0.5 text-[11px] font-medium text-muted-foreground">{deposit.amount.toLocaleString('vi-VN')}</p>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  )
}

export function FinancePackagesSection({ packageTiers }: { packageTiers: PackageTier[] }) {
  return <PackageManagement packageTiers={packageTiers} />
}