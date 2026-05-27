import { useMemo, useState } from 'react'
import { Activity, ArrowRight, CreditCard, UserPlus } from 'lucide-react'

type Payout = {
    id: string
    author: string
    amount: number
    bank: string
    status: 'pending' | 'paid'
}

type RecentTransaction = {
    id: string
    user: string
    method: string
    amount: number
    time: string
    status: 'success' | 'pending'
}

const initialPayouts: Payout[] = [
    { id: 'p1', author: 'Elena Sterling', amount: 124.5, bank: 'Bank A • ****1234', status: 'pending' },
    { id: 'p2', author: 'Julian Thorne', amount: 542.0, bank: 'Bank B • ****5678', status: 'pending' },
    { id: 'p3', author: 'S. J. Moon', amount: 86.75, bank: 'Bank C • ****9012', status: 'pending' },
]

const recentTransactions: RecentTransaction[] = [
    { id: 't1', user: '@docgia_01', method: 'Chuyển khoản Ngân hàng', amount: 100000, time: 'Vừa xong', status: 'success' },
    { id: 't2', user: '@nguyenvanA', method: 'Ví MoMo', amount: 50000, time: '3 phút trước', status: 'success' },
    { id: 't3', user: '@bookworm99', method: 'Chuyển khoản Ngân hàng', amount: 200000, time: '12 phút trước', status: 'success' },
]

export default function AdminDashboardV2() {

    const chartData = [18, 24, 16, 29, 31, 28, 40, 36, 45, 38, 52, 49]

    // --- VND formatting helpers ---
    const formatFullVND = (value: number) => {
        return value.toLocaleString('vi-VN') + ' đ'
    }

    const formatShortVND = (value: number) => {
        const abs = Math.abs(value)
        if (abs >= 1_000_000_000) {
            const v = value / 1_000_000_000
            return `${v.toFixed(1)}B` // e.g. 2.3B (or 2,3 Tỷ)
        }
        if (abs >= 1_000_000) {
            const v = value / 1_000_000
            return `${v.toFixed(1)}M` // e.g. 78.2M (or 78,2 Tr)
        }
        if (abs >= 1_000) {
            const v = value / 1_000
            return `${v.toFixed(0)}K`
        }
        return `${value}`
    }

    const platformNet = useMemo(() => 12543.5 * 0.25, [])

    const userPulse = {
        readersOnline: 84,
        newSignupsToday: 128,
        totalNovels: 342,
        totalCategories: 18,
    }

    const userPulseChartData = [30, 20, 65, 84, 75, 90]
    const chartWidth = 320
    const chartHeight = 140
    const chartMax = Math.max(...userPulseChartData)
    const chartPoints = userPulseChartData.map((value, index) => {
        const x = (index / (userPulseChartData.length - 1)) * chartWidth
        const y = chartHeight - (value / chartMax) * (chartHeight - 12)
        return `${x},${y}`
    })
    const chartLinePath = `M ${chartPoints.join(' L ')}`
    // chartAreaPath removed (not used)

    return (
        <div className="w-full space-y-4 sm:space-y-6">
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
                {/* chart */}
                <div className="lg:col-span-9 rounded-xl border border-gray-300 bg-white p-4 sm:p-5 shadow-sm">
                    <div className="flex items-center justify-between gap-3 border-b border-gray-200 pb-3">
                        <div>
                            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Biểu đồ</div>
                        </div>
                    </div>

                    <div className="mt-4 flex h-28 items-end gap-2 sm:h-24">
                        {chartData.map((value, index) => (
                            <div key={`${value}-${index}`} className="flex-1 flex flex-col items-center justify-end gap-2">
                                <div className="w-full rounded-t-md bg-primary" style={{ height: `${value}%`, minHeight: '0.75rem' }} />
                                <div className="text-[10px] text-gray-500">{index + 1}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* important statistic (flattened) */}
                <div className="lg:col-span-3 rounded-xl border border-primary bg-primary p-5 shadow-sm text-white flex flex-col justify-center items-start min-h-[6rem]">
                    <div className="w-full">
                        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-on-primary">Thống kê quan trọng</div>

                        <div className="mt-4 text-4xl font-bold leading-none sm:text-5xl">{formatFullVND(Math.round(platformNet))}</div>

                    </div>
                </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
                {/* user pulse */}
                {/* user pulse */}
                <div className="lg:col-span-5 rounded-xl border border-outline-variant bg-surface-container-low p-4 sm:p-5 shadow-sm flex flex-col justify-between">
                    <div>
                        {/* Header */}
                        <div className="flex items-center justify-between gap-3 border-b border-outline-variant pb-3">
                            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Tình hình người dùng</div>
                        </div>

                        {/* ROW 1: Đang online & Đăng ký mới */}
                        <div className="mt-3 grid grid-cols-2 gap-3">
                            {/* Container 1: Đang online */}
                            <div className="p-4 flex items-center justify-between rounded-md bg-surface-container-lowest border border-outline-variant transition-all duration-200 hover:bg-surface-container">
                                <div className="space-y-1">
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
                                        Đang online
                                    </span>
                                    <span className="text-2xl font-black text-foreground block">
                                        {userPulse.readersOnline}
                                    </span>
                                </div>
                                <div className="rounded-xl bg-green-500/10 p-2.5 shrink-0 flex items-center justify-center">
                                    <Activity className="h-5 w-5 text-green-600" />
                                </div>
                            </div>

                            {/* Container 2: Đăng ký mới */}
                            <div className="p-4 flex items-center justify-between rounded-md bg-surface-container-lowest border border-outline-variant transition-all duration-200 hover:bg-surface-container">
                                <div className="space-y-1">
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
                                        Đăng ký mới
                                    </span>
                                    <span className="text-2xl font-black text-foreground block">
                                        {userPulse.newSignupsToday}
                                    </span>
                                </div>
                                <div className="rounded-xl bg-blue-500/10 p-2.5 shrink-0 flex items-center justify-center">
                                    <UserPlus className="h-5 w-5 text-blue-600" />
                                </div>
                            </div>
                        </div>

                        {/* ROW 2: Thiết kế y chang Row 1 (Novel & Category) */}
                        <div className="mt-3 grid grid-cols-2 gap-3">
                            {/* Container 3: Tổng số Novel */}
                            <div className="p-4 flex items-center justify-between rounded-md bg-surface-container-lowest border border-outline-variant transition-all duration-200 hover:bg-surface-container">
                                <div className="space-y-1">
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
                                        Tổng số truyện
                                    </span>
                                    <span className="text-2xl font-black text-foreground block">
                                        {userPulse.totalNovels || 0}
                                    </span>
                                </div>
                                <div className="rounded-xl bg-purple-500/10 p-2.5 shrink-0 flex items-center justify-center">
                                    {/* Bạn có thể đổi sang icon BookOpen hoặc icon tùy chọn */}
                                    <Activity className="h-5 w-5 text-purple-600" />
                                </div>
                            </div>

                            {/* Container 4: Thể loại */}
                            <div className="p-4 flex items-center justify-between rounded-md bg-surface-container-lowest border border-outline-variant transition-all duration-200 hover:bg-surface-container">
                                <div className="space-y-1">
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
                                        Thể loại truyện
                                    </span>
                                    <span className="text-2xl font-black text-foreground block">
                                        {userPulse.totalCategories || 0}
                                    </span>
                                </div>
                                <div className="rounded-xl bg-amber-500/10 p-2.5 shrink-0 flex items-center justify-center">
                                    {/* Bạn có thể đổi sang icon Layers hoặc icon tùy chọn */}
                                    <UserPlus className="h-5 w-5 text-amber-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* LIVE FEED nằm ở dưới cùng */}
                    <div className="mt-4 space-y-2 border-t border-outline-variant pt-3.5">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                            Hoạt động gần đây
                        </div>

                        <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2 min-w-0">
                                <span className="h-1.5 w-1.5 rounded-full bg-green-500 shrink-0" />
                                <p className="text-foreground truncate">Người dùng <span className="font-medium">@hoangnv</span> vừa đăng ký</p>
                            </div>
                            <span className="text-muted-foreground text-[10px] shrink-0 ml-2">2 phút trước</span>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2 min-w-0">
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                                <p className="text-foreground truncate">Sách <span className="font-medium">"Lumina Scroll"</span> có thêm 12 readers</p>
                            </div>
                            <span className="text-muted-foreground text-[10px] shrink-0 ml-2">5 phút trước</span>
                        </div>
                    </div>
                </div>

                {/* recent transactions */}
                <div className="lg:col-span-7 rounded-xl border border-outline-variant bg-surface-container-low p-4 sm:p-5 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between gap-3 border-b border-outline-variant pb-3 h-[40px]">
                            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                                Giao dịch gần đây
                            </div>

                            <button
                                onClick={() => {}}
                                className="inline-flex items-center gap-1 rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-1.5 text-[11px] font-bold text-primary transition-colors hover:bg-surface-container"
                            >
                                Xem tất cả <ArrowRight className="h-3.5 w-3.5" />
                            </button>
                        </div>

                        <div className="mt-1 space-y-2.5">
                            {recentTransactions.map(transaction => (
                                <div
                                    key={transaction.id}
                                    className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-md border border-outline-variant/40 bg-surface-container-lowest p-3 transition-colors hover:bg-surface-container"
                                >
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-bold text-foreground truncate">{transaction.user}</p>
                                            <span className="rounded bg-green-500/10 px-1.5 py-0.5 text-[9px] font-bold uppercase text-green-600 border border-green-500/20">
                                                {transaction.status === 'success' ? 'Thành công' : 'Đang xử lý'}
                                            </span>
                                        </div>
                                        <p className="truncate text-xs text-muted-foreground mt-0.5">
                                            {transaction.method} • <span className="font-mono text-[11px]">{transaction.time}</span>
                                        </p>
                                    </div>

                                    <div className="text-right whitespace-nowrap">
                                        <div className="text-sm font-black text-green-600">+{formatFullVND(Math.round(transaction.amount))}</div>
                                        <div className="text-[10px] font-medium text-muted-foreground mt-0.5">
                                            {formatShortVND(Math.round(transaction.amount))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4 rounded-lg border border-dashed border-outline-variant/60 bg-surface-container-lowest px-3 py-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4 text-primary" />
                            <span>Luồng giao dịch này được cập nhật theo thời gian thực từ nguồn nạp ví.</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
