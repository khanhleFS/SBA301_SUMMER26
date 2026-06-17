import { api } from '@/lib/api'
import type { ProfileData } from '../types/profile.types'

export interface ProfileDTO {
  fullName: string
  email: string
  phone: string
  address: string
}

export interface ResetPasswordRequestDTO {
  email: string
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

/**
 * Fetches the current user's profile data from the Backend.
 */
export async function fetchProfileData(): Promise<ProfileData> {
  const response = await api.get('/auth/profile')
  if (response.data && response.data.code === 200) {
    const profile = response.data.result
    return {
      user: {
        id: profile.id || 'usr-001',
        displayName: profile.fullName || '',
        username: profile.username || profile.email || '',
        email: profile.email || '',
        avatarUrl: profile.avatarUrl || 'https://placehold.co/300x300/E6E1E5/4F378A?text=Avatar',
        memberSince: profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'Thành viên mới',
        isVerified: true,
      },
      wallet: {
        balance: profile.balance || 0,
        currency: 'Lumi Coins',
      },
      transactions: [],
      collections: [],
    }
  }
  throw new Error(response.data?.message || 'Không thể tải thông tin cá nhân')
}

/**
 * Updates the current authenticated user's profile info.
 */
export async function updateProfile(request: ProfileDTO): Promise<void> {
  const response = await api.put('/auth/profile', request)
  if (response.data && response.data.code === 200) {
    return
  }
  throw new Error(response.data?.message || 'Cập nhật thông tin thất bại')
}

/**
 * Resets the password using old and new password.
 */
export async function resetPassword(request: ResetPasswordRequestDTO): Promise<void> {
  const response = await api.post('/auth/reset-password', request)
  if (response.data && response.data.code === 200) {
    return
  }
  throw new Error(response.data?.message || 'Đổi mật khẩu thất bại')
}
