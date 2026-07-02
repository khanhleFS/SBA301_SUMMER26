import { AtSign, Mail, UserRound, Cookie } from 'lucide-react'
import { SectionTitle } from './section-title'
import { surfaceCardClass } from './profile-styles'
import { useProfile } from '../context/profile.context'
import type { LucideIcon } from 'lucide-react'
import { useState, useEffect } from 'react'

interface InfoRow {
  label: string
  value: string
  icon: LucideIcon
}

export function PersonalInfoSection() {
  const { data } = useProfile()
  const user = data?.user

  const [cookieConsent, setCookieConsent] = useState<'granted' | 'denied'>(() => {
    return (typeof window !== 'undefined' ? localStorage.getItem('cookieConsent') as 'granted' | 'denied' : null) || 'granted'
  })

  useEffect(() => {
    const handleConsentChange = () => {
      const val = (localStorage.getItem('cookieConsent') as 'granted' | 'denied') || 'granted'
      setCookieConsent(val)
    }
    window.addEventListener('cookie-consent-changed', handleConsentChange)
    return () => window.removeEventListener('cookie-consent-changed', handleConsentChange)
  }, [])

  const handleCookieChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newConsent = e.target.checked ? 'granted' : 'denied'
    localStorage.setItem('cookieConsent', newConsent)
    setCookieConsent(newConsent)
    window.dispatchEvent(new Event('cookie-consent-changed'))
  }

  const personalInfo: InfoRow[] = [
    { label: 'Tên người dùng', value: user?.displayName ?? '—', icon: AtSign },
    { label: 'Địa chỉ Email', value: user?.email ?? '—', icon: Mail }
  ]

  return (
    <section>
      <div className={`overflow-hidden rounded-lg ${surfaceCardClass}`}>
        <div className="border-b border-outline/5 px-5 py-4">
          <SectionTitle icon={UserRound}>Thông tin cá nhân</SectionTitle>
        </div>
        <div className="p-5 sm:p-6 space-y-6">
          {/* Grid thông tin chính */}
          <div className="grid gap-6 md:grid-cols-2 pb-5">
            {personalInfo.map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex min-w-0 items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-5 w-5 text-primary/70" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-on-surface-variant/60">
                    {label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-on-surface">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Cookie Consent Container làm nổi bật trên dòng mới */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-md border border-dashed border-primary/30 bg-primary/5 transition-all hover:bg-primary/[0.08]">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                <Cookie className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-on-surface flex items-center gap-1.5">
                  Quyền riêng tư & Cookie
                </h4>
                <p className="mt-1 text-xs text-on-surface-variant/80 max-w-xl">
                  Cho phép hệ thống sử dụng Cookie để tự động duy trì và khôi phục phiên đăng nhập của bạn (Silent Refresh) khi làm mới hoặc tải lại trang web.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
              <span className={`text-[10px] font-bold uppercase tracking-wider ${cookieConsent === 'granted' ? 'text-primary' : 'text-on-surface-variant/50'}`}>
                {cookieConsent === 'granted' ? 'Đang bật' : 'Đang tắt'}
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={cookieConsent === 'granted'}
                  onChange={handleCookieChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:after:border-zinc-700 peer-checked:bg-primary shadow-inner"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
