import {
  createContext,
  useContext,
  type ReactNode
} from 'react'
import { useQuery } from '@tanstack/react-query'
import type { ProfileData } from '../types/profile.types'
import { fetchProfileData } from '../services/profile.service'

interface ProfileContextValue {
  data: ProfileData | null
  isLoading: boolean
  error: string | null
  refresh: () => void
}

const ProfileContext = createContext<ProfileContextValue | null>(null)

export function ProfileProvider({ children }: { children: ReactNode }) {
  const query = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfileData,
  })

  const data = query.data ?? null
  const isLoading = query.isPending
  const error = query.error instanceof Error ? query.error.message : null
  const refresh = () => {
    void query.refetch()
  }

  return (
    <ProfileContext.Provider value={{ data, isLoading, error, refresh }}>
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile(): ProfileContextValue {
  const ctx = useContext(ProfileContext)
  if (!ctx) {
    throw new Error('useProfile must be used inside <ProfileProvider>')
  }
  return ctx
}
