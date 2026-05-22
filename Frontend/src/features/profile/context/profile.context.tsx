import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from 'react'
import type { ProfileData } from '../types/profile.types'
import { fetchProfileData } from '../services/profile.service'

interface ProfileContextValue {
  data: ProfileData | null
  isLoading: boolean
  error: string | null
  refresh: () => void
}

const ProfileContext = createContext<ProfileContextValue | null>(null)

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ProfileData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    let cancelled = false

    setIsLoading(true)
    setError(null)

    fetchProfileData()
      .then((result) => {
        if (!cancelled) {
          setData(result)
          setIsLoading(false)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError('Không thể tải dữ liệu hồ sơ. Vui lòng thử lại.')
          setIsLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [refreshKey])

  function refresh() {
    setRefreshKey((k) => k + 1)
  }

  return (
    <ProfileContext.Provider value={{ data, isLoading, error, refresh }}>
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile(): ProfileContextValue {
  const ctx = useContext(ProfileContext)
  if (!ctx) {
    throw new Error('useProfile must be used inside <ProfileProvider>')
  }
  return ctx
}
