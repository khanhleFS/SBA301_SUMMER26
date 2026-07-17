import {
  MOCK_USER_DATA,
  type UserItem,
  type UserManagementData,
  type UserRole,
  type UserStatus,
} from '../../../services/mock-data'

export type { UserItem, UserManagementData, UserRole, UserStatus }

const SIMULATED_DELAY_MS = 700

// In-memory state for mock CRUD
let _mockUsers: UserItem[] = [...MOCK_USER_DATA.users]

export async function fetchUserManagementData(): Promise<UserManagementData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const active = _mockUsers.filter((u) => u.status === 'active').length
      const banned = _mockUsers.filter((u) => u.status === 'banned').length
      const pending = _mockUsers.filter((u) => u.status === 'pending').length
      const authors = _mockUsers.filter((u) => u.role === 'AUTHOR').length

      resolve({
        stats: {
          ...MOCK_USER_DATA.stats,
          activeUsers: active,
          bannedUsers: banned,
          pendingRequests: pending,
          totalAuthors: authors,
        },
        users: [..._mockUsers],
      })
    }, SIMULATED_DELAY_MS)
  })
}

export async function promoteToAuthor(userId: string): Promise<UserItem> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const idx = _mockUsers.findIndex((u) => u.id === userId)
      if (idx === -1) { reject(new Error('User not found')); return }
      _mockUsers[idx] = { ..._mockUsers[idx], role: 'AUTHOR' }
      resolve(_mockUsers[idx])
    }, 500)
  })
}

export async function toggleBanUser(userId: string): Promise<UserItem> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const idx = _mockUsers.findIndex((u) => u.id === userId)
      if (idx === -1) { reject(new Error('User not found')); return }
      const current = _mockUsers[idx]
      const newStatus: UserStatus = current.status === 'banned' ? 'active' : 'banned'
      _mockUsers[idx] = { ...current, status: newStatus }
      resolve(_mockUsers[idx])
    }, 400)
  })
}

export async function approvePendingUser(userId: string): Promise<UserItem> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const idx = _mockUsers.findIndex((u) => u.id === userId)
      if (idx === -1) { reject(new Error('User not found')); return }
      _mockUsers[idx] = { ..._mockUsers[idx], status: 'active' }
      resolve(_mockUsers[idx])
    }, 400)
  })
}
