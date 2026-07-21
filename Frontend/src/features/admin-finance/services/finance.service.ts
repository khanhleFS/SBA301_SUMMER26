import { api } from '@/lib/api'
import { Banknote, ReceiptText, TrendingUp } from 'lucide-react'

export interface CashFlowItem {
  label: string
  value: number
}

export interface DepositItem {
  user: string
  method: string
  amount: number
  status: 'success' | 'pending'
  time: string
}

export interface KpiData {
  id: number
  title: string
  subtitle: string
  amount: string
  growth: string
  actionText: string
  isPrimary: boolean
  icon: any
}

export interface TransactionItem {
  id: string
  user: string
  fullName: string
  method: string
  amount: number
  coins: number
  status: 'success' | 'pending' | 'failed'
  time: string
}

export interface FinanceData {
  kpiData: KpiData[]
  cashFlow: CashFlowItem[]
  cashFlowMonth: CashFlowItem[]
  recentDeposits: DepositItem[]
  transactions: TransactionItem[]
}

function formatVND(amount: number): string {
  if (amount >= 1_000_000_000) return `${(amount / 1_000_000_000).toFixed(1)}B đ`
  if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(1)}M đ`
  return `${amount.toLocaleString('vi-VN')} đ`
}

/**
 * Fetches admin finance data by combining:
 *   - GET /api/admin/dashboard  — for KPI totals, monthly revenue, recent orders
 *   - GET /api/admin/orders     — for full transaction list (needs backend, falls back gracefully)
 */
export async function fetchFinanceData(): Promise<FinanceData> {
  // --- 1. Dashboard stats (already exists) ---
  const dashRes = await api.get('/admin/dashboard')
  if (!dashRes.data || dashRes.data.code !== 200) {
    throw new Error(dashRes.data?.message || 'Không thể tải thống kê tài chính')
  }
  const dash = dashRes.data.result

  const totalRevenueVnd: number = dash.totalRevenueVnd ?? 0
  const platformRevenueVnd: number = dash.platformRevenueVnd ?? 0
  const authorPayoutVnd = totalRevenueVnd - platformRevenueVnd

  // --- KPI cards ---
  const kpiData: KpiData[] = [
    {
      id: 1,
      title: 'Tổng doanh thu',
      subtitle: 'Tổng VND nạp của user (COMPLETED)',
      amount: formatVND(totalRevenueVnd),
      growth: '',
      actionText: 'Xem dòng tiền',
      isPrimary: true,
      icon: Banknote,
    },
    {
      id: 2,
      title: 'Chi trả tác giả (75%)',
      subtitle: 'Ước tính royalty cho tác giả',
      amount: formatVND(authorPayoutVnd),
      growth: '',
      actionText: 'Báo cáo chi phí',
      isPrimary: false,
      icon: ReceiptText,
    },
    {
      id: 3,
      title: 'Doanh thu ròng (25%)',
      subtitle: 'Lợi nhuận nền tảng',
      amount: formatVND(platformRevenueVnd),
      growth: '',
      actionText: 'Phân tích lợi nhuận',
      isPrimary: false,
      icon: TrendingUp,
    },
  ]

  // --- Monthly chart (index 0 = Tháng 1) ---
  const monthly: number[] = dash.monthlyRevenueVnd ?? []
  const cashFlowMonth: CashFlowItem[] = monthly.map((v: number, i: number) => ({
    label: `Tháng ${i + 1}`,
    value: v,
  }))

  // --- Weekly placeholder (7 days) from last 7 entries in monthly or zeros ---
  const DAY_LABELS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']
  const cashFlow: CashFlowItem[] = DAY_LABELS.map((label) => ({ label, value: 0 }))

  // --- Recent deposits from dashboard recentOrders ---
  const recentOrders: any[] = dash.recentOrders ?? []
  const recentDeposits: DepositItem[] = recentOrders.map((o: any) => ({
    user: o.username ?? o.userEmail ?? 'User',
    method: 'MoMo / Bank',
    amount: o.amountVnd ?? 0,
    status: o.status === 'COMPLETED' ? 'success' : 'pending',
    time: o.createdAt
      ? new Date(o.createdAt).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' })
      : '',
  }))

  // --- Transactions list (GET /api/admin/orders — cần thêm backend) ---
  let transactions: TransactionItem[] = []
  try {
    const txRes = await api.get('/admin/orders')
    if (txRes.data && txRes.data.code === 200) {
      transactions = (txRes.data.result as any[]).map((o: any) => ({
        id: o.id?.toString().slice(0, 8).toUpperCase() ?? '',
        user: `@${o.username ?? ''}`,
        fullName: o.username ?? '',
        method: o.paymentMethod ?? 'MoMo / Bank',
        amount: o.amountVnd ?? 0,
        coins: o.coins ?? 0,
        status: o.status === 'COMPLETED' ? 'success' : o.status === 'FAILED' ? 'failed' : 'pending',
        time: o.createdAt
          ? new Date(o.createdAt).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
          : '',
      }))
    }
  } catch {
    // /api/admin/orders chưa có — dùng recentOrders từ dashboard làm fallback
    transactions = recentOrders.map((o: any) => ({
      id: o.orderId?.toString().slice(0, 8).toUpperCase() ?? '',
      user: `@${o.username ?? ''}`,
      fullName: o.username ?? '',
      method: 'MoMo / Bank',
      amount: o.amountVnd ?? 0,
      coins: 0,
      status: o.status === 'COMPLETED' ? 'success' : 'pending',
      time: o.createdAt
        ? new Date(o.createdAt).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
        : '',
    }))
  }

  return {
    kpiData,
    cashFlow,
    cashFlowMonth,
    recentDeposits,
    transactions,
  }
}
