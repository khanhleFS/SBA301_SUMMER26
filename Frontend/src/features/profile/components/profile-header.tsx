import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { useProfile } from '../context/profile.context'
import { useAuth } from '@/lib/auth'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'


export function ProfileHeader() {
  const { data } = useProfile()
  const { logout } = useAuth()
  const navigate = useNavigate()
  const user = data?.user

  const handleLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <section className="mb-8 flex items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-4">
        <Avatar className="h-14 w-14">
          <AvatarImage src={null} alt={user.username} />
          <AvatarFallback className="bg-primary text-on-primary font-bold text-md">
            {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-2xl font-bold text-on-surface lg:text-4xl">
              {user?.displayName ?? '—'}
            </h2>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="hover:bg-destructive/10 text-error hover:text-destructive flex items-center justify-center gap-3 transition-colors bg-transparent border-0 outline-none cursor-pointer flex-shrink-0"
        title="Đăng xuất"
      >
        <p className='text-error text-sm font-medium'>Đăng xuất</p>
        <LogOut className="h-5 w-5" />
      </button>
    </section>
  )
}
