import { useQuery } from '@tanstack/react-query'
import type { ProfileData } from '../types/profile.types'
import { fetchProfileData } from '../services/profile.service'

interface ProfileContextValue {
  data: ProfileData | null
  isLoading: boolean
  error: string | null
  refresh: () => void
}

export function useProfile(): ProfileContextValue {
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

  return { data, isLoading, error, refresh }
}
