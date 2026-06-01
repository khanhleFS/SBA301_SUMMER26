import {
  createContext,
  useContext,
  type ReactNode
} from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchDashboardData, type DashboardData } from '../services/dashboard.service'

interface DashboardContextValue {
  data: DashboardData | null
  isLoading: boolean
  error: string | null
  refresh: () => void
}

const DashboardContext = createContext<DashboardContextValue | null>(null)

export function DashboardProvider({ children }: { children: ReactNode }) {
  const query = useQuery({
    queryKey: ['admin-dashboard'],
    queryFn: fetchDashboardData,
  })

  const data = query.data ?? null
  const isLoading = query.isPending
  const error = query.error instanceof Error ? query.error.message : null
  const refresh = () => {
    void query.refetch()
  }

  return (
    <DashboardContext.Provider value={{ data, isLoading, error, refresh }}>
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard(): DashboardContextValue {
  const ctx = useContext(DashboardContext)
  if (!ctx) {
    throw new Error('useDashboard must be used inside <DashboardProvider>')
  }
  return ctx
}
