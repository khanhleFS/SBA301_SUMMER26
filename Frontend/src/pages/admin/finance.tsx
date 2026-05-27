import { ArrowDownRight, ArrowUpRight, Banknote, CircleCheckBig, Clock3, CreditCard, Landmark, Wallet } from 'lucide-react'

const financeCards = [
  {
    label: 'Tổng nạp ví',
    value: 248560000,
    icon: ArrowDownRight,
    tone: 'text-emerald-600',
    bg: 'bg-emerald-500/10',
  },
  {
    label: 'Chi trả chờ duyệt',
    value: 42150000,
    icon: Clock3,
    tone: 'text-amber-600',
    bg: 'bg-amber-500/10',
  },
  {
    label: 'Đã đối soát hôm nay',
    value: 97500000,
    icon: CircleCheckBig,
    tone: 'text-blue-600',
    bg: 'bg-blue-500/10',
  },
  {
    label: 'Tỷ lệ thành công',
    value: 984,
    suffix: '‰',
    icon: Wallet,
    tone: 'text-violet-600',
    bg: 'bg-violet-500/10',
  },
] as const

const cashFlow = [
  { label: 'T2', value: 36 },
  { label: 'T3', value: 42 },
  { label: 'T4', value: 31 },
  { label: 'T5', value: 55 },
  { label: 'T6', value: 61 },
  { label: 'T7', value: 47 },
  { label: 'CN', value: 68 },
]

const recentDeposits = [
  { user: '@docgia_01', method: 'Bank transfer', amount: 100000, status: 'success', time: 'Vừa xong' },
  { user: '@nguyenvanA', method: 'MoMo', amount: 50000, status: 'success', time: '3 phút trước' },
  { user: '@bookworm99', method: 'Bank transfer', amount: 200000, status: 'pending', time: '12 phút trước' },
  { user: '@hannahreads', method: 'ZaloPay', amount: 75000, status: 'success', time: '18 phút trước' },
]

const payoutStatus = [
  { label: 'Số dư khả dụng', value: 182400000, icon: Banknote },
  { label: 'Ví tạm giữ', value: 27450000, icon: CreditCard },
  { label: 'Đã giải ngân', value: 92000000, icon: Landmark },
]

function formatVND(value: number) {
  return `${value.toLocaleString('vi-VN')} đ`
}

export default function FinancePage() {
  const peak = Math.max(...cashFlow.map(item => item.value))

  return (
    <div className="space-y-5">
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {financeCards.map(card => {
          const Icon = card.icon
          const displayValue = 'suffix' in card ? `${card.value}${card.suffix}` : formatVND(card.value)

          return (
            <article key={card.label} className="rounded-xl border border-outline-variant bg-surface-container-low p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{card.label}</p>
                  <p className="mt-3 text-2xl font-black text-foreground">{displayValue}</p>
                </div>
                <div className={`rounded-xl p-2.5 ${card.bg}`}>
                  <Icon className={`h-5 w-5 ${card.tone}`} />
                </div>
              </div>
            </article>
          )
        })}
      </section>

      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex-1 space-y-4">
          <div className="rounded-xl border border-outline-variant bg-surface-container-low p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3 border-b border-outline-variant pb-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Dòng tiền</p>
                <h2 className="mt-1 text-lg font-bold text-foreground">Biểu đồ nạp ví theo tuần</h2>
              </div>
              <button className="rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-surface-container">
                Xuất báo cáo
              </button>
            </div>

            <div className="mt-5 grid h-72 grid-cols-7 items-end gap-3">
              {cashFlow.map(item => (
                <div key={item.label} className="flex h-full flex-col items-center justify-end gap-2">
                  <div className="flex w-full flex-1 items-end">
                    <div
                      className="w-full rounded-t-lg bg-primary shadow-sm"
                      style={{ height: `${Math.max((item.value / peak) * 100, 14)}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-outline-variant bg-surface-container-low p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3 border-b border-outline-variant pb-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Trạng thái quỹ</p>
                <h2 className="mt-1 text-lg font-bold text-foreground">Tổng quan tài chính</h2>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {payoutStatus.map(item => {
                const Icon = item.icon

                return (
                  <div key={item.label} className="flex items-center justify-between rounded-lg border border-outline-variant/50 bg-surface-container-lowest p-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="rounded-lg bg-primary/10 p-2 text-primary">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-foreground">{item.label}</p>
                        <p className="text-xs text-muted-foreground">Cập nhật theo phiên hiện tại</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-foreground">{formatVND(item.value)}</p>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">đang theo dõi</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-4 rounded-lg border border-dashed border-outline-variant/60 bg-surface-container-lowest px-3 py-2 text-xs text-muted-foreground">
              Các khoản nạp gần đây sẽ được đối soát trước khi đẩy sang hàng chi trả.
            </div>
          </div>
        </div>

        <aside className="w-full lg:w-96">
          <div className="rounded-xl border border-outline-variant bg-surface-container-low p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3 border-b border-outline-variant pb-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Giao dịch gần đây</p>
                <h2 className="mt-1 text-lg font-bold text-foreground">Dòng tiền mới nhất</h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1 text-xs font-bold text-green-700">
                <ArrowUpRight className="h-4 w-4" />
                Tỷ lệ thành công cao
              </div>
            </div>

            <div className="mt-4 space-y-2.5">
              {recentDeposits.map(deposit => (
                <div key={`${deposit.user}-${deposit.time}`} className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-lg border border-outline-variant/40 bg-surface-container-lowest p-3 transition-colors hover:bg-surface-container">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-bold text-foreground">{deposit.user}</p>
                      <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide ${deposit.status === 'success' ? 'border border-green-500/20 bg-green-500/10 text-green-700' : 'border border-amber-500/20 bg-amber-500/10 text-amber-700'}`}>
                        {deposit.status === 'success' ? 'Thành công' : 'Đang xử lý'}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">{deposit.method} • {deposit.time}</p>
                  </div>

                  <div className="text-right whitespace-nowrap">
                    <p className="text-sm font-black text-emerald-600">+{formatVND(deposit.amount)}</p>
                    <p className="text-[10px] font-medium text-muted-foreground">{deposit.amount.toLocaleString('vi-VN')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}