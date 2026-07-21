import { api } from '@/lib/api'

export interface UserItem {
  id: string
  username: string
  fullName: string
  email: string
  role: 'USER' | 'AUTHOR' | 'ADMIN'
  isAuthor: boolean
  isActive: boolean
  coinBalance: number
  joinedAt: string
  // Fields kept for backward-compat with user-table.tsx (set defaults if missing)
  avatarUrl: string
  novelCount: number
  totalReads: number
  walletBalance: number
  status: 'active' | 'banned' | 'pending'
}

export interface UserManagementData {
  stats: {
    totalUsers: number
    activeUsers: number
    bannedUsers: number
    newThisMonth: number
    totalAuthors: number
    pendingRequests: number
  }
  users: UserItem[]
}

export type UserRole = 'USER' | 'AUTHOR' | 'ADMIN'
export type UserStatus = 'active' | 'banned' | 'pending'

/**
 * Fetch all users for admin management.
 * GET /api/admin/users  (Admin only)
 */
export async function fetchUserManagementData(): Promise<UserManagementData> {
  const response = await api.get('/admin/users')
  if (response.data && response.data.code === 200) {
    const users: UserItem[] = (response.data.result as any[]).map((u: any) => ({
      id: u.id,
      username: u.username ?? '',
      fullName: u.username ?? '',   // backend chưa có displayName riêng
      email: u.email ?? '',
      role: u.isAuthor ? 'AUTHOR' : (u.role as UserRole),
      isAuthor: !!u.isAuthor,
      isActive: u.isActive !== false,
      coinBalance: u.coinBalance ?? 0,
      joinedAt: u.createdAt ?? '',
      avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(u.username ?? 'U')}&background=random`,
      novelCount: 0,
      totalReads: 0,
      walletBalance: u.coinBalance ?? 0,
      status: u.isActive === false ? 'banned' : 'active',
    }))

    const active = users.filter((u) => u.status === 'active').length
    const banned = users.filter((u) => u.status === 'banned').length
    const authors = users.filter((u) => u.isAuthor).length

    return {
      stats: {
        totalUsers: users.length,
        activeUsers: active,
        bannedUsers: banned,
        newThisMonth: 0,
        totalAuthors: authors,
        pendingRequests: 0,
      },
      users,
    }
  }
  throw new Error(response.data?.message || 'Không thể tải danh sách người dùng')
}

/**
 * Promote user to author (set isAuthor = true).
 * PUT /api/auth/admin/users/{userId}/author-status?isAuthor=true  (Admin only)
 */
export async function promoteToAuthor(userId: string): Promise<UserItem> {
  await api.put(`/auth/admin/users/${userId}/author-status`, null, {
    params: { isAuthor: true },
  })
  // Re-fetch updated user list and return the updated user
  const data = await fetchUserManagementData()
  return data.users.find((u) => u.id === userId) ?? ({ id: userId } as UserItem)
}

/**
 * Revoke author status.
 * PUT /api/auth/admin/users/{userId}/author-status?isAuthor=false  (Admin only)
 */
export async function revokeAuthorStatus(userId: string): Promise<UserItem> {
  await api.put(`/auth/admin/users/${userId}/author-status`, null, {
    params: { isAuthor: false },
  })
  const data = await fetchUserManagementData()
  return data.users.find((u) => u.id === userId) ?? ({ id: userId } as UserItem)
}

/**
 * Toggle ban/unban user.
 * PUT /api/admin/users/{userId}/ban  (Admin only) — API cần thêm vào backend
 * Tạm thời: placeholder function
 */
export async function toggleBanUser(userId: string): Promise<UserItem> {
  await api.put(`/admin/users/${userId}/toggle-ban`)
  const data = await fetchUserManagementData()
  return data.users.find((u) => u.id === userId) ?? ({ id: userId } as UserItem)
}

/**
 * Approve pending user.
 * Hiện tại backend không có trạng thái pending riêng — placeholder.
 */
export async function approvePendingUser(userId: string): Promise<UserItem> {
  const data = await fetchUserManagementData()
  return data.users.find((u) => u.id === userId) ?? ({ id: userId } as UserItem)
}
