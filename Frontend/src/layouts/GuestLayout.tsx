import { Navigate, Outlet } from 'react-router-dom'
import AuthGalleryPlaceholder from '@/components/custom/auth-gallery-placeholder/AuthGalleryPlaceholder'

interface GuestLayoutProps {
  isAuthenticated?: boolean
}

export default function GuestLayout({ isAuthenticated = false }: GuestLayoutProps) {
  // If user is already authenticated, redirect to home
  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="dark relative isolate min-h-screen overflow-hidden bg-background text-foreground transition-colors duration-500">
      <section className="pointer-events-none absolute inset-0 hidden lg:block">
          <AuthGalleryPlaceholder />
      </section>

      <div className="relative z-20 flex min-h-screen justify-end">
        <aside className="flex w-full items-start justify-center overflow-y-auto bg-[#141317] px-3 py-5 text-[#e6e1e7] shadow-[-24px_0_60px_rgba(0,0,0,0.35)] sm:px-4 lg:w-[400px] lg:min-w-[400px] lg:max-w-[400px] lg:items-center lg:px-6 lg:py-6">
          <div className="w-full max-w-[400px]">
            <Outlet />
          </div>
        </aside>
      </div>
    </div>
  )
}