import { useQuery } from '@tanstack/react-query'
import { fetchLeaderboardData, type LeaderboardData } from '../services/leaderboard.service'

interface LeaderboardContextValue {
  data: LeaderboardData | null
  isLoading: boolean
  error: string | null
  refresh: () => void
}

export function useLeaderboard(): LeaderboardContextValue {
  const query = useQuery({
    queryKey: ['admin-leaderboard'],
    queryFn: fetchLeaderboardData,
  })

  const data = query.data ?? null
  const isLoading = query.isPending
  const error = query.error instanceof Error ? query.error.message : null
  const refresh = () => {
    void query.refetch()
  }

  return { data, isLoading, error, refresh }
}
