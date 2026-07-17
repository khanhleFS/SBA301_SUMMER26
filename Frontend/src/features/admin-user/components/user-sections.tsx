import { useState } from 'react'
import type { UserItem, UserManagementData } from '../services/user.service'
import { UserStatsSection } from './user-stats'
import { UserTableSection } from './user-table'
import { PromoteModal } from './promote-modal'
import { BanModal } from './ban-modal'

type UserManagementSectionsProps = {
  data: UserManagementData
  onPromote: (userId: string) => Promise<void>
  onToggleBan: (userId: string) => Promise<void>
  onApprove: (userId: string) => Promise<void>
  isMutating: boolean
}

export function UserManagementSections({
  data,
  onPromote,
  onToggleBan,
  onApprove,
  isMutating,
}: UserManagementSectionsProps) {
  const [promoteTarget, setPromoteTarget] = useState<UserItem | null>(null)
  const [banTarget, setBanTarget] = useState<UserItem | null>(null)

  async function handleConfirmPromote() {
    if (!promoteTarget) return
    await onPromote(promoteTarget.id)
    setPromoteTarget(null)
  }

  async function handleConfirmBan() {
    if (!banTarget) return
    await onToggleBan(banTarget.id)
    setBanTarget(null)
  }

  async function handleApprove(user: UserItem) {
    await onApprove(user.id)
  }

  return (
    <>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-foreground">Quản lý người dùng</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Xem, lọc, thăng cấp và quản lý tài khoản người dùng
            </p>
          </div>
        </div>

        <UserStatsSection stats={data.stats} />

        <UserTableSection
          users={data.users}
          onPromote={setPromoteTarget}
          onToggleBan={setBanTarget}
          onApprove={handleApprove}
          isMutating={isMutating}
        />
      </div>

      {/* Modals */}
      {promoteTarget && (
        <PromoteModal
          user={promoteTarget}
          onConfirm={handleConfirmPromote}
          onClose={() => setPromoteTarget(null)}
          isLoading={isMutating}
        />
      )}
      {banTarget && (
        <BanModal
          user={banTarget}
          onConfirm={handleConfirmBan}
          onClose={() => setBanTarget(null)}
          isLoading={isMutating}
        />
      )}
    </>
  )
}
