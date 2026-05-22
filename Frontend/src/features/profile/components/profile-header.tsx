import type React from 'react'
import { LogOut, User } from 'lucide-react'
import { useProfile } from '../context/profile.context'

function IconButton({
  icon: Icon,
  onClick
}: {
  icon: React.ComponentType<{ className?: string }>
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="flex h-12 w-12 items-center justify-center rounded-lg bg-surface-container text-on-surface transition-colors hover:bg-surface-variant"
    >
      <Icon className="h-5 w-5" />
    </button>
  )
}

export function ProfileHeader() {
  const { data } = useProfile()
  const user = data?.user

  return (
    <section className="mb-8 flex items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-primary/20 bg-surface-container-high lg:h-16 lg:w-16">
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.displayName}
              className="h-full w-full object-cover"
            />
          ) : (
            <User className="h-8 w-8 text-primary/40" />
          )}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="truncate font-serif text-2xl font-bold text-on-surface lg:text-4xl">
              {user?.displayName ?? '—'}
            </h2>
          </div>
        </div>
      </div>

      <IconButton icon={LogOut} />
    </section>
  )
}
