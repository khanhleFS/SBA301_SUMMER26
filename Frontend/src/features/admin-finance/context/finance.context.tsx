import {
  createContext,
  useContext,
  type ReactNode
} from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchFinanceData, type FinanceData } from '../services/finance.service'

interface FinanceContextValue {
  data: FinanceData | null
  isLoading: boolean
  error: string | null
  refresh: () => void
}

const FinanceContext = createContext<FinanceContextValue | null>(null)

export function FinanceProvider({ children }: { children: ReactNode }) {
  const query = useQuery({
    queryKey: ['admin-finance'],
    queryFn: fetchFinanceData,
  })

  const data = query.data ?? null
  const isLoading = query.isPending
  const error = query.error instanceof Error ? query.error.message : null
  const refresh = () => {
    void query.refetch()
  }

  return (
    <FinanceContext.Provider value={{ data, isLoading, error, refresh }}>
      {children}
    </FinanceContext.Provider>
  )
}

export function useFinance(): FinanceContextValue {
  const ctx = useContext(FinanceContext)
  if (!ctx) {
    throw new Error('useFinance must be used inside <FinanceProvider>')
  }
  return ctx
}
