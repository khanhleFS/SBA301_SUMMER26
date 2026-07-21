import { api } from '@/lib/api'

export interface AdminDashboardData {
  totalUsers: number
  totalAuthors: number
  totalNovels: number
  totalRevenueVnd: number
  platformRevenueVnd: number
  monthlyRevenueVnd: number[]
  recentOrders: {
    orderId: string
    userEmail: string
    username: string
    amountVnd: number
    status: string
    createdAt: string
  }[]
}

/**
 * Fetches admin dashboard statistics.
 * Endpoint: GET /api/admin/dashboard (ADMIN only)
 */
export async function fetchDashboardData(): Promise<AdminDashboardData> {
  const response = await api.get('/admin/dashboard')
  if (response.data && response.data.code === 200) {
    return response.data.result as AdminDashboardData
  }
  throw new Error(response.data?.message || 'Không thể tải thống kê dashboard')
}

export type { AdminDashboardData as DashboardData }
