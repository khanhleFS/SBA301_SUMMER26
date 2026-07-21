import type React from 'react'

// ─── Domain Models & Enums ───────────────────────────────────────────────────

export type UserRole = 'USER' | 'AUTHOR' | 'ADMIN'
export type UserStatus = 'active' | 'banned' | 'pending'

export interface UserItem {
  id: string
  username: string
  fullName: string
  email: string
  role: UserRole
  isAuthor: boolean
  isActive: boolean
  coinBalance: number
  joinedAt: string
  avatarUrl: string
  novelCount: number
  totalReads: number
  walletBalance: number
  status: UserStatus
}

export interface UserManagementStats {
  totalUsers: number
  activeUsers: number
  bannedUsers: number
  newThisMonth: number
  totalAuthors: number
  pendingRequests: number
}

export interface UserManagementData {
  stats: UserManagementStats
  users: UserItem[]
}

// ─── Context Type ────────────────────────────────────────────────────────────

export interface UserManagementContextValue {
  data: UserManagementData | null
  isLoading: boolean
  error: string | null
  refresh: () => void
  promote: (userId: string) => Promise<void>
  toggleBan: (userId: string) => Promise<void>
  approve: (userId: string) => Promise<void>
  isMutating: boolean
}

// ─── Filters & Sorting Types ─────────────────────────────────────────────────

export type FilterRole = UserRole | 'ALL'
export type FilterStatus = UserStatus | 'ALL'
export type StatType = 'total' | 'author' | 'pending'
export type SortKey = 'fullName' | 'joinedAt' | 'totalReads' | 'walletBalance'
export type SortDir = 'asc' | 'desc'

// ─── Component Props Interfaces ──────────────────────────────────────────────

export interface UserManagementSectionsProps {
  data: UserManagementData
  onPromote: (userId: string) => Promise<void>
  onToggleBan: (userId: string) => Promise<void>
  onApprove: (userId: string) => Promise<void>
  isMutating: boolean
}

export interface StatCardProps {
  label: string
  value: number
  icon: React.ReactNode
  iconBg: string
  isActive: boolean
  onClick: () => void
}

export interface UserStatsSectionProps {
  stats: {
    totalUsers: number
    totalAuthors: number
    pendingRequests: number
  }
  activeStat: StatType
  onStatClick: (type: StatType) => void
}

export interface UserTableSectionProps {
  users: UserItem[]
  onPromote: (user: UserItem) => void
  onToggleBan: (user: UserItem) => void
  onApprove: (user: UserItem) => void
  isMutating: boolean
  roleFilter: FilterRole
  setRoleFilter: (role: FilterRole) => void
  statusFilter: FilterStatus
  setStatusFilter: (status: FilterStatus) => void
}

export interface PromoteModalProps {
  user: UserItem
  onConfirm: () => void
  onClose: () => void
  isLoading: boolean
}

export interface BanModalProps {
  user: UserItem
  onConfirm: () => void
  onClose: () => void
  isLoading: boolean
}
