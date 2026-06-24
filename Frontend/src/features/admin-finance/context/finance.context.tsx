import { useQuery } from '@tanstack/react-query'
import { fetchFinanceData, type FinanceData } from '../services/finance.service'

interface FinanceContextValue {
  data: FinanceData | null
  isLoading: boolean
  error: string | null
  refresh: () => void
}

export function useFinance(): FinanceContextValue {
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

  return { data, isLoading, error, refresh }
}
