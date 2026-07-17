import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  fetchUserManagementData,
  promoteToAuthor,
  toggleBanUser,
  approvePendingUser,
  type UserManagementData,
  type UserItem,
} from '../services/user.service'

interface UserManagementContextValue {
  data: UserManagementData | null
  isLoading: boolean
  error: string | null
  refresh: () => void
  promote: (userId: string) => Promise<void>
  toggleBan: (userId: string) => Promise<void>
  approve: (userId: string) => Promise<void>
  isMutating: boolean
}

export function useUserManagement(): UserManagementContextValue {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['admin-users'],
    queryFn: fetchUserManagementData,
  })

  const promoteMutation = useMutation({
    mutationFn: promoteToAuthor,
    onSuccess: () => { void queryClient.invalidateQueries({ queryKey: ['admin-users'] }) },
  })

  const banMutation = useMutation({
    mutationFn: toggleBanUser,
    onSuccess: () => { void queryClient.invalidateQueries({ queryKey: ['admin-users'] }) },
  })

  const approveMutation = useMutation({
    mutationFn: approvePendingUser,
    onSuccess: () => { void queryClient.invalidateQueries({ queryKey: ['admin-users'] }) },
  })

  const data: UserManagementData | null = query.data ?? null
  const isLoading = query.isPending
  const error = query.error instanceof Error ? query.error.message : null
  const refresh = () => { void query.refetch() }
  const isMutating = promoteMutation.isPending || banMutation.isPending || approveMutation.isPending

  const promote = async (userId: string) => { await promoteMutation.mutateAsync(userId) }
  const toggleBan = async (userId: string) => { await banMutation.mutateAsync(userId) }
  const approve = async (userId: string) => { await approveMutation.mutateAsync(userId) }

  return { data, isLoading, error, refresh, promote, toggleBan, approve, isMutating }
}
