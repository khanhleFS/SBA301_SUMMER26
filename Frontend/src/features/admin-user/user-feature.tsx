import { useUserManagement } from './context/user.context'
import { UserManagementSkeleton } from './components/user-skeleton'
import { UserManagementSections } from './components/user-sections'

export default function UserManagementFeature() {
  const { data, isLoading, promote, toggleBan, approve, isMutating } = useUserManagement()

  if (isLoading || !data) {
    return <UserManagementSkeleton />
  }

  return (
    <UserManagementSections
      data={data}
      onPromote={promote}
      onToggleBan={toggleBan}
      onApprove={approve}
      isMutating={isMutating}
    />
  )
}

