import {
  createContext,
  useContext,
  type ReactNode
} from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchLeaderboardData, type LeaderboardData } from '../services/leaderboard.service'

interface LeaderboardContextValue {
  data: LeaderboardData | null
  isLoading: boolean
  error: string | null
  refresh: () => void
}

const LeaderboardContext = createContext<LeaderboardContextValue | null>(null)

export function LeaderboardProvider({ children }: { children: ReactNode }) {
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

  return (
    <LeaderboardContext.Provider value={{ data, isLoading, error, refresh }}>
      {children}
    </LeaderboardContext.Provider>
  )
}

export function useLeaderboard(): LeaderboardContextValue {
  const ctx = useContext(LeaderboardContext)
  if (!ctx) {
    throw new Error('useLeaderboard must be used inside <LeaderboardProvider>')
  }
  return ctx
}
